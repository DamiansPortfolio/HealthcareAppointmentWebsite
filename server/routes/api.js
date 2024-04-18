const express = require("express");
const router = express.Router();
const pool = require("../config/db"); // Ensure this is correctly configured to point to your database

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
    console.log("User found:", user.username, "Attempting password match..."); // Log to verify user data
    console.log(
      "Submitted password:",
      password,
      "Stored password:",
      user.password
    ); // Log to check passwords

    if (password === user.password) {
      res.json({ success: true, message: "Login successful" });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error.message); // Log any server errors
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
