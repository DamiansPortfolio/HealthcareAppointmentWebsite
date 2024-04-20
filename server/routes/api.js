const express = require("express");
const router = express.Router();
const pool = require("../config/db");

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
      res.json({
        success: true,
        message: "Login successful",
        user_type_id: user.user_type_id, // Assuming 'user_type_id' is a column in your 'users' table
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

module.exports = router;
