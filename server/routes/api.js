// Import required modules and initialize the router
const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Middleware to validate the session
async function validateSession(req, res, next) {
  // Extract the username from the session
  const { username } = req.session;

  // If no username is found, return an unauthorized error response
  if (!username) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: No session found" });
  }

  try {
    // Check if the session ID stored in Redis matches the current session ID
    const sessionID = await req.redisClient.get(`session_${username}`);
    if (sessionID !== req.sessionID) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: Session is invalid" });
    }
    // Proceed to the next middleware or route handler if the session is valid
    next();
  } catch (err) {
    // Log the error and return a server error response if something goes wrong
    console.error(err.message);
    res.status(500).send("Server error during session validation");
  }
}

// Middleware to add CORS and cache control headers for API responses
router.use((req, res, next) => {
  // Set cache control to prevent storing of sensitive data
  res.set("Cache-Control", "no-store");
  next();
});

// User Registration Endpoint
router.post("/register", async (req, res) => {
  // Extract user data from the request body
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
  } = req.body;

  // Default user type for new registrations
  const user_type_id = 1;

  try {
    // Insert the new user into the users table and return the created user
    const newUser = await pool.query(
      "INSERT INTO users (username, password, first_name, middle_name, last_name, sex, date_of_birth, phone_number, street, city, state, zip_code, email, facility_number, ssn, user_type_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *",
      [
        username,
        password, // TODO: Hash the password before storing it
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

    // Respond with the successfully created user data
    res.json({
      success: true,
      message: "Registration successful",
      user: newUser.rows[0],
    });
  } catch (err) {
    // Log the error and respond with a server error if the registration fails
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// User Login Endpoint
router.post("/login", async (req, res) => {
  // Extract login credentials from the request body
  const { username, password } = req.body;

  // If either username or password is missing, return a bad request error
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Username and password are required" });
  }

  try {
    // Query the database for the user with the given username
    const userQueryResult = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    // If no user is found, return a 404 not found error
    if (userQueryResult.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });
    }

    // Retrieve the user record from the query result
    const user = userQueryResult.rows[0];

    // Log the username and check if the submitted password matches the stored one
    console.log("User found:", user.username, "Attempting password match...");
    console.log(
      "Submitted password:",
      password,
      "Stored password:",
      user.password
    );

    // If the password matches, proceed with session handling
    if (password === user.password) {
      // Check if an active session already exists for this user
      const existingSessionID = await req.redisClient.get(
        `session_${user.username}`
      );

      // If an active session is found, prevent multiple logins
      if (existingSessionID) {
        return res.status(403).json({
          success: false,
          message:
            "Another session is already active. Multiple logins are not allowed.",
        });
      }

      // Store the new session in Redis with a 30-minute expiration
      await req.redisClient.set(
        `session_${user.username}`,
        req.sessionID,
        "EX",
        1800
      );

      // Set the session variables for this user
      req.session.userID = user.id;
      req.session.username = user.username;
      req.session.user_type_id = user.user_type_id;
      req.session.ssn = user.ssn;

      // Respond with the successful login information
      res.json({
        success: true,
        message: "Login successful",
        username: user.username,
        user_type_id: user.user_type_id,
        ssn: user.ssn,
      });
    } else {
      // If the password does not match, return an unauthorized error
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    // Log the error and respond with a server error if something fails
    console.error("Login error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// User Profile Endpoint
router.get("/profile", validateSession, (req, res) => {
  // If no SSN is found in the session, return an unauthorized error
  if (!req.session.ssn) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  // Respond with the successfully retrieved profile data
  res.json({
    success: true,
    message: "Profile data retrieved successfully",
    user: {
      ssn: req.session.ssn,
      username: req.session.username,
    },
  });
});

// Logout Endpoint
router.post("/logout", async (req, res) => {
  // Extract the username from the session
  const { username } = req.session;

  if (username) {
    try {
      // Delete the session from Redis and destroy the session on the server
      const deleteResponse = await req.redisClient.del(`session_${username}`);
      console.log(`Session deleted for ${username}: ${deleteResponse}`);
      req.session.destroy((error) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: "Failed to destroy session",
          });
        }

        // Clear the session cookie and respond with a success message
        res.clearCookie("connect.sid");
        res.json({ success: true, message: "Logout successful" });
      });
    } catch (err) {
      // Log the error and respond with a server error if session deletion fails
      return res.status(500).json({
        success: false,
        message: "Failed to delete session in Redis",
      });
    }
  } else {
    // If no username is found in the session, return a bad request error
    res.status(400).json({ success: false, message: "Not logged in" });
  }
});

// Get current user session
router.get("/current-user", (req, res) => {
  // Check if the session contains the username, user type ID, and SSN
  if (
    req.session &&
    req.session.username &&
    req.session.user_type_id !== undefined &&
    req.session.ssn !== undefined
  ) {
    // Extend the session's TTL in Redis by 30 minutes
    req.redisClient.expire(`session_${req.session.username}`, 1800);

    // Respond with the successfully retrieved current user session information
    res.json({
      success: true,
      message: "Current user session retrieved successfully",
      user: {
        username: req.session.username,
        user_type_id: req.session.user_type_id,
        ssn: req.session.ssn,
      },
    });
  } else {
    // If session data is incomplete or no user is logged in, return an unauthorized error
    console.error("Incomplete session data:", req.session);
    res.status(401).json({
      success: false,
      message: "No active session or incomplete user data",
    });
  }
});

// Route to fetch user's SSN by username
router.get("/users/:username/ssn", validateSession, async (req, res) => {
  // Extract the username from the request parameters
  const { username } = req.params;

  try {
    // Query the database for the user's SSN by username
    const user = await pool.query("SELECT ssn FROM users WHERE username = $1", [
      username,
    ]);

    // If no user is found, return a 404 not found error
    if (user.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Retrieve the SSN from the query result and respond with it
    const ssn = user.rows[0].ssn;
    res.json({ success: true, ssn });
  } catch (error) {
    // Log the error and respond with a server error if something goes wrong
    console.error("Error fetching user's SSN:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Route to list all facilities
router.get("/facilities", async (req, res) => {
  try {
    // Retrieve the facility number and name for all facilities
    const result = await pool.query(
      "SELECT facility_number, facility_name FROM facility"
    );

    // Respond with the list of facilities
    res.json(result.rows);
  } catch (error) {
    // Log the error and respond with a server error if the query fails
    console.error("Failed to retrieve facilities:", error);
    res.status(500).send("Server error");
  }
});

// Route to get departments based on the facility number
router.get("/facilities/:facility_number/departments", async (req, res) => {
  try {
    // Extract the facility number from the request parameters
    const { facility_number } = req.params;

    // Retrieve the departments under the given facility number
    const departments = await pool.query(
      "SELECT department_id, department_name FROM departments WHERE facility_number = $1",
      [facility_number]
    );

    // Respond with the list of departments
    res.json(departments.rows);
  } catch (err) {
    // Log the error and respond with a server error if the query fails
    console.error("Error fetching departments:", err.message);
    res.status(500).send("Server error");
  }
});

// Route to get doctors based on the department ID
router.get("/departments/:department_id/doctors", async (req, res) => {
  try {
    // Extract the department ID from the request parameters
    const { department_id } = req.params;

    // Retrieve the doctors working in the given department
    const doctors = await pool.query(
      "SELECT d.doctor_ssn, u.first_name, u.last_name FROM doctor d JOIN users u ON d.doctor_ssn = u.ssn WHERE d.department_id = $1 AND u.user_type_id = 2",
      [department_id]
    );

    // Respond with the list of doctors
    res.json(
      doctors.rows.map((doc) => ({
        doctor_ssn: doc.doctor_ssn,
        name: `${doc.first_name} ${doc.last_name}`,
      }))
    );
  } catch (err) {
    // Log the error and respond with a server error if the query fails
    console.error("Error fetching doctors:", err.message);
    res.status(500).send("Server error");
  }
});

// Route to get availability of a doctor based on their SSN and a specific date
router.get("/doctor-availability/:doctor_ssn", async (req, res) => {
  // Extract the doctor's SSN and requested date from the request parameters and query
  const { doctor_ssn } = req.params;
  const { date } = req.query;

  try {
    console.log(
      `Fetching availability for doctor SSN: ${doctor_ssn} on date: ${date}`
    );

    // Retrieve all booked appointment slots for the given doctor and date
    const bookedSlots = await pool.query(
      "SELECT start_time, end_time FROM appointment WHERE doctor_ssn = $1 AND date = $2",
      [doctor_ssn, date]
    );
    console.log(`Booked Slots: ${JSON.stringify(bookedSlots.rows)}`);

    // Retrieve available slots for the given doctor and date
    const availability = await pool.query(
      `SELECT * FROM doctor_availability WHERE doctor_ssn = $1 AND NOT EXISTS (
        SELECT 1 FROM appointment a WHERE a.doctor_ssn = doctor_availability.doctor_ssn AND a.date = doctor_availability.date AND a.start_time = doctor_availability.start_time AND a.end_time = doctor_availability.end_time
      ) AND date = $2`,
      [doctor_ssn, date]
    );

    // Log the available slots and respond with them
    console.log(`Availability: ${JSON.stringify(availability.rows)}`);
    res.json(availability.rows);
  } catch (err) {
    // Log the error and respond with a server error if the query fails
    console.error(`Error fetching doctor availability: ${err.message}`);
    res.status(500).send("Server error");
  }
});

// Route to book an appointment with a doctor
router.post("/book-appointment", async (req, res) => {
  // Extract the appointment details from the request body
  const { doctor_ssn, date, start_time, end_time, department_id, patient_ssn } =
    req.body;

  console.log("Received booking request with:", req.body);

  try {
    // Retrieve the facility number corresponding to the department ID
    const departmentQuery = await pool.query(
      "SELECT facility_number FROM departments WHERE department_id = $1",
      [department_id]
    );

    // If no department is found, return a 404 not found error
    if (departmentQuery.rows.length === 0) {
      console.error("No department found for ID:", department_id);
      return res.status(404).json({ message: "Department not found" });
    }

    // Extract the facility number and verify its presence
    const facility_number = departmentQuery.rows[0].facility_number;
    if (!facility_number) {
      console.error(
        "Facility number is undefined for department:",
        department_id
      );
      return res.status(404).json({ message: "Facility number is undefined" });
    }

    // Retrieve the facility name corresponding to the facility number
    const facilityQuery = await pool.query(
      "SELECT facility_name FROM facility WHERE facility_number = $1",
      [facility_number]
    );

    // If no facility is found, return a 404 not found error
    if (facilityQuery.rows.length === 0) {
      console.error("Facility not found for number:", facility_number);
      return res.status(404).json({ message: "Facility not found" });
    }

    // Extract the facility name to be used as the location
    const location = facilityQuery.rows[0].facility_name;
    console.log("Booking at location:", location);

    // Insert the appointment into the database
    await pool.query(
      "INSERT INTO appointment (doctor_ssn, date, start_time, end_time, location, patient_ssn) VALUES ($1, $2, $3, $4, $5, $6)",
      [doctor_ssn, date, start_time, end_time, location, patient_ssn]
    );

    // Respond with the successfully booked appointment details
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
    // Log the error and respond with a server error if the booking fails
    console.error("Error booking appointment:", err);
    res.status(500).send("Server error");
  }
});

// POST /api/appointments: Add a new appointment with given details
router.post("/appointment", async (req, res) => {
  // Extract the appointment details from the request body
  const { date, time, type, location, patient_ssn, doctor_ssn } = req.body;

  try {
    // Insert the new appointment into the database
    const newAppointment = await pool.query(
      "INSERT INTO appointment (date, time, type, location, patient_ssn, doctor_ssn) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [date, time, type, location, patient_ssn, doctor_ssn]
    );

    // Respond with the successfully created appointment
    res.json(newAppointment.rows[0]);
  } catch (err) {
    // Log the error and respond with a server error if the query fails
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Route to get appointments of a specific patient based on their SSN
router.get("/patients/:patient_ssn/appointment", async (req, res) => {
  try {
    // Extract the patient's SSN from the request parameters
    const { patient_ssn } = req.params;

    // Retrieve all appointments of the given patient
    const appointment = await pool.query(
      "SELECT * FROM appointment WHERE patient_ssn = $1",
      [patient_ssn]
    );

    // Respond with the list of appointments for the patient
    res.json(appointment.rows);
  } catch (err) {
    // Log the error and respond with a server error if the query fails
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Route to get appointments of a specific doctor based on their SSN
router.get("/doctors/:doctor_ssn/appointment", async (req, res) => {
  try {
    // Extract the doctor's SSN from the request parameters
    const { doctor_ssn } = req.params;

    // Retrieve all appointments of the given doctor
    const appointment = await pool.query(
      "SELECT * FROM appointment WHERE doctor_ssn = $1",
      [doctor_ssn]
    );

    // Respond with the list of appointments for the doctor
    res.json(appointment.rows);
  } catch (err) {
    // Log the error and respond with a server error if the query fails
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Route to create a new task for a doctor
router.post("/tasks", validateSession, async (req, res) => {
  // Extract the task name and message from the request body
  const { task_name, task_message } = req.body;

  // Extract the doctor's username from the session
  const { username } = req.session;

  try {
    // Retrieve the doctor's SSN using the username
    const doctorQuery = await pool.query(
      "SELECT ssn FROM users WHERE username = $1",
      [username]
    );

    // Extract the doctor's SSN from the query result
    const doctor_ssn = doctorQuery.rows[0].ssn;

    // Insert the new task into the database with the doctor's SSN
    const newTask = await pool.query(
      "INSERT INTO tasks (task_name, task_message, doctor_ssn) VALUES ($1, $2, $3) RETURNING id",
      [task_name, task_message, doctor_ssn]
    );

    // Respond with the successfully created task ID
    res.json(newTask.rows[0]);
  } catch (err) {
    // Log the error and respond with a server error if the query fails
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Route to get tasks assigned to the current doctor
router.get("/tasks", validateSession, async (req, res) => {
  // Extract the doctor's username from the session
  const { username } = req.session;

  try {
    // Retrieve the doctor's SSN using the username
    const doctorQuery = await pool.query(
      "SELECT ssn FROM users WHERE username = $1",
      [username]
    );

    // Extract the doctor's SSN from the query result
    const doctor_ssn = doctorQuery.rows[0].ssn;

    // Retrieve all tasks assigned to the given doctor
    const tasks = await pool.query(
      "SELECT * FROM tasks WHERE doctor_ssn = $1",
      [doctor_ssn]
    );

    // Respond with the list of tasks for the doctor
    res.json(tasks.rows);
  } catch (err) {
    // Log the error and respond with a server error if the query fails
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Route to mark a task as completed by deleting it from the tasks table
router.put("/tasks/:id/complete", validateSession, async (req, res) => {
  // Extract the task ID from the request parameters
  const { id } = req.params;

  try {
    // Delete the task with the given ID and return the deleted task
    const completedTask = await pool.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING *",
      [id]
    );

    // Respond with a success message indicating task completion
    res.json({ success: true, message: "Task completed successfully" });
  } catch (err) {
    // Log the error and respond with a server error if the query fails
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Export the router to be used in the main application
module.exports = router;
