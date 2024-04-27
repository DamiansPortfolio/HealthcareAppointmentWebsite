const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Middleware to validate the session
async function validateSession(req, res, next) {
  const { username } = req.session;
  if (!username) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: No session found" });
  }

  try {
    const sessionID = await req.redisClient.get(`session_${username}`);
    if (sessionID !== req.sessionID) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: Session is invalid" });
    }
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error during session validation");
  }
}

// Add CORS and cache control for API responses
router.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

// User Registration Endpoint
router.post("/register", async (req, res) => {
  const {
    username,
    password,
    first_name,
    middle_name,
    last_name,
    sex,
    date_of_birth,
    phone_number,
    street,
    city,
    state,
    zip_code,
    email,
    facility_number,
    ssn,
    user_type_id,
  } = req.body;

  try {
    const newUser = await pool.query(
      "INSERT INTO users (username, password, first_name, middle_name, last_name, sex, date_of_birth, phone_number, street, city, state, zip_code, email, facility_number, ssn, user_type_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *",
      [
        username,
        password, // Directly using the unhashed password for simplicity during tests
        first_name,
        middle_name,
        last_name,
        sex,
        date_of_birth,
        phone_number,
        street,
        city,
        state,
        zip_code,
        email,
        facility_number,
        ssn,
        user_type_id,
      ]
    );
    res.json({
      success: true,
      message: "Registration successful",
      user: newUser.rows[0],
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// User Login Endpoint
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Username and password are required" });
  }
  try {
    const userQueryResult = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (userQueryResult.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });
    }
    const user = userQueryResult.rows[0];

    console.log("User found:", user.username, "Attempting password match...");
    console.log(
      "Submitted password:",
      password,
      "Stored password:",
      user.password
    );

    if (password === user.password) {
      const existingSessionID = await req.redisClient.get(
        `session_${user.username}`
      );
      console.log(
        `Existing session ID from Redis for ${user.username}: ${existingSessionID}`
      );

      if (existingSessionID) {
        console.log(
          `Login blocked for ${user.username} due to active session.`
        );
        return res.status(403).json({
          success: false,
          message:
            "Another session is already active. Multiple logins are not allowed.",
        });
      }

      await req.redisClient.set(
        `session_${user.username}`,
        req.sessionID,
        "EX",
        1800
      );
      console.log(`New session set for ${user.username}: ${req.sessionID}`);

      req.session.userID = user.id;
      req.session.username = user.username;
      req.session.user_type_id = user.user_type_id;
      req.session.ssn = user.ssn;

      // Including SSN in the response here
      res.json({
        success: true,
        message: "Login successful",
        username: user.username,
        user_type_id: user.user_type_id,
        ssn: user.ssn, // Make sure this line is exactly like this
      });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// User Profile Endpoint
router.get("/profile", validateSession, (req, res) => {
  if (!req.session.ssn) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  res.json({
    success: true,
    message: "Profile data retrieved successfully",
    user: {
      ssn: req.session.ssn,
      username: req.session.username,
    },
  });
});

router.post("/logout", async (req, res) => {
  const { username } = req.session;
  if (username) {
    try {
      const deleteResponse = await req.redisClient.del(`session_${username}`);
      console.log(`Session deleted for ${username}: ${deleteResponse}`);
      req.session.destroy((error) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: "Failed to destroy session",
          });
        }
        res.clearCookie("connect.sid");
        res.json({ success: true, message: "Logout successful" });
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete session in Redis",
      });
    }
  } else {
    res.status(400).json({ success: false, message: "Not logged in" });
  }
});

// Get current user session
router.get("/current-user", (req, res) => {
  if (
    req.session &&
    req.session.username &&
    req.session.user_type_id !== undefined &&
    req.session.ssn !== undefined // Ensure SSN is also part of the session check
  ) {
    // Confirm the session contains all necessary data including SSN
    req.redisClient.expire(`session_${req.session.username}`, 1800); // Extend session TTL for 30 minutes
    res.json({
      success: true,
      message: "Current user session retrieved successfully",
      user: {
        username: req.session.username,
        user_type_id: req.session.user_type_id,
        ssn: req.session.ssn, // Include SSN in the response
      },
    });
  } else {
    // Incomplete session data or no user logged in
    console.error("Incomplete session data:", req.session);
    res.status(401).json({
      success: false,
      message: "No active session or incomplete user data",
    });
  }
});

// Route to fetch user's SSN by username
router.get("/users/:username/ssn", validateSession, async (req, res) => {
  const { username } = req.params;
  try {
    const user = await pool.query("SELECT ssn FROM users WHERE username = $1", [
      username,
    ]);
    if (user.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const ssn = user.rows[0].ssn;
    res.json({ success: true, ssn });
  } catch (error) {
    console.error("Error fetching user's SSN:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET /api/facilities
router.get("/facilities", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT facility_number, facility_name FROM facility"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Failed to retrieve facilities:", error);
    res.status(500).send("Server error");
  }
});

// GET departments based on facility number
router.get("/facilities/:facility_number/departments", async (req, res) => {
  try {
    const { facility_number } = req.params;
    const departments = await pool.query(
      "SELECT department_id, department_name FROM departments WHERE facility_number = $1",
      [facility_number]
    );
    res.json(departments.rows);
  } catch (err) {
    console.error("Error fetching departments:", err.message);
    res.status(500).send("Server error");
  }
});

// GET doctors based on department ID
router.get("/departments/:department_id/doctors", async (req, res) => {
  try {
    const { department_id } = req.params;
    const doctors = await pool.query(
      "SELECT d.doctor_ssn, u.first_name, u.last_name FROM doctor d JOIN users u ON d.doctor_ssn = u.ssn WHERE d.department_id = $1 AND u.user_type_id = 2",
      [department_id]
    );
    res.json(
      doctors.rows.map((doc) => ({
        doctor_ssn: doc.doctor_ssn,
        name: `${doc.first_name} ${doc.last_name}`,
      }))
    );
  } catch (err) {
    console.error("Error fetching doctors:", err.message);
    res.status(500).send("Server error");
  }
});

// GET /api/doctor-availability/:doctor_ssn
router.get("/doctor-availability/:doctor_ssn", async (req, res) => {
  const { doctor_ssn } = req.params;
  const { date } = req.query;
  try {
    console.log(
      `Fetching availability for doctor SSN: ${doctor_ssn} on date: ${date}`
    );
    const bookedSlots = await pool.query(
      "SELECT start_time, end_time FROM appointment WHERE doctor_ssn = $1 AND date = $2",
      [doctor_ssn, date]
    );
    console.log(`Booked Slots: ${JSON.stringify(bookedSlots.rows)}`);
    const availability = await pool.query(
      `SELECT * FROM doctor_availability WHERE doctor_ssn = $1 AND NOT EXISTS (
        SELECT 1 FROM appointment a WHERE a.doctor_ssn = doctor_availability.doctor_ssn AND a.date = doctor_availability.date AND a.start_time = doctor_availability.start_time AND a.end_time = doctor_availability.end_time
      ) AND date = $2`,
      [doctor_ssn, date]
    );
    console.log(`Availability: ${JSON.stringify(availability.rows)}`);
    res.json(availability.rows);
  } catch (err) {
    console.error(`Error fetching doctor availability: ${err.message}`);
    res.status(500).send("Server error");
  }
});

router.post("/book-appointment", async (req, res) => {
  const { doctor_ssn, date, start_time, end_time, department_id, patient_ssn } =
    req.body;

  console.log("Received booking request with:", req.body);

  try {
    const departmentQuery = await pool.query(
      "SELECT facility_number FROM departments WHERE department_id = $1",
      [department_id]
    );

    if (departmentQuery.rows.length === 0) {
      console.error("No department found for ID:", department_id);
      return res.status(404).json({ message: "Department not found" });
    }

    const facility_number = departmentQuery.rows[0].facility_number;
    if (!facility_number) {
      console.error(
        "Facility number is undefined for department:",
        department_id
      );
      return res.status(404).json({ message: "Facility number is undefined" });
    }

    console.log("Facility number fetched:", facility_number);

    const facilityQuery = await pool.query(
      "SELECT facility_name FROM facility WHERE facility_number = $1",
      [facility_number]
    );

    if (facilityQuery.rows.length === 0) {
      console.error("Facility not found for number:", facility_number);
      return res.status(404).json({ message: "Facility not found" });
    }

    const location = facilityQuery.rows[0].facility_name;
    console.log("Booking at location:", location);

    await pool.query(
      "INSERT INTO appointment (doctor_ssn, date, start_time, end_time, location, patient_ssn) VALUES ($1, $2, $3, $4, $5, $6)",
      [doctor_ssn, date, start_time, end_time, location, patient_ssn]
    );

    res.json({
      success: true,
      message: "Appointment booked",
      location,
      date,
      start_time,
      end_time,
      patient_ssn,
      doctor_ssn,
    });
  } catch (err) {
    console.error("Error booking appointment:", err);
    res.status(500).send("Server error");
  }
});

// POST /api/appointments
router.post("/appointment", async (req, res) => {
  const { date, time, type, location, patient_ssn, doctor_ssn } = req.body;
  try {
    const newAppointment = await pool.query(
      "INSERT INTO appointment (date, time, type, location, patient_ssn, doctor_ssn) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [date, time, type, location, patient_ssn, doctor_ssn]
    );
    res.json(newAppointment.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
// GET /api/patients/:patient_ssn/appointments
router.get("/patients/:patient_ssn/appointment", async (req, res) => {
  try {
    const { patient_ssn } = req.params;
    const appointment = await pool.query(
      "SELECT * FROM appointment WHERE patient_ssn = $1",
      [patient_ssn]
    );
    res.json(appointment.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
// GET /api/doctors/:doctor_ssn/appointments
router.get("/doctors/:doctor_ssn/appointment", async (req, res) => {
  try {
    const { doctor_ssn } = req.params;
    const appointment = await pool.query(
      "SELECT * FROM appointment WHERE doctor_ssn = $1",
      [doctor_ssn]
    );
    res.json(appointment.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Route to create a new task
router.post("/tasks", validateSession, async (req, res) => {
  const { task_name, task_message } = req.body;
  const { username } = req.session;
  try {
    // Fetch doctor's SSN using the username
    const doctorQuery = await pool.query(
      "SELECT ssn FROM users WHERE username = $1",
      [username]
    );
    const doctor_ssn = doctorQuery.rows[0].ssn;

    const newTask = await pool.query(
      "INSERT INTO tasks (task_name, task_message, doctor_ssn) VALUES ($1, $2, $3) RETURNING id",
      [task_name, task_message, doctor_ssn]
    );
    res.json(newTask.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Route to get tasks for the current doctor
router.get("/tasks", validateSession, async (req, res) => {
  const { username } = req.session;
  try {
    // Fetch doctor's SSN using the username
    const doctorQuery = await pool.query(
      "SELECT ssn FROM users WHERE username = $1",
      [username]
    );
    const doctor_ssn = doctorQuery.rows[0].ssn;

    const tasks = await pool.query(
      "SELECT * FROM tasks WHERE doctor_ssn = $1",
      [doctor_ssn]
    );
    res.json(tasks.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Route to mark a task as completed
router.put("/tasks/:id/complete", validateSession, async (req, res) => {
  const { id } = req.params;
  try {
    const completedTask = await pool.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING *",
      [id]
    );
    res.json({ success: true, message: "Task completed successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
