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
  } = req.body;

  try {
    const newUser = await pool.query(
      "INSERT INTO users (username, password, first_name, middle_name, last_name, sex, date_of_birth, phone_number, street, city, state, zip_code, email, facility_number, ssn) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *",
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
        30
      );
      console.log(`New session set for ${user.username}: ${req.sessionID}`);

      req.session.userID = user.id;
      req.session.username = user.username;
      req.session.ssn = user.ssn;

      res.json({
        success: true,
        message: "Login successful",
        user_type_id: user.user_type_id,
        username: user.username,
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
  if (req.session && req.session.username) {
    //Refresh the Redis session expiration time on each access
    req.redisClient.expire(`session_${req.session.username}`, 1800); // Extend session TTL for 30 minutes
    // If theres a session and it has a username, return the user info
    res.json({
      success: true,
      message: "Current user session",
      user: {
        username: req.session.username,
        user_type_id: req.session.user_type_id,
      },
    });
  } else {
    // No user logged in
    res.status(401).json({
      success: false,
      message: "No active session",
    });
  }
});

module.exports = router;
