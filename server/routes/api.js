// Inside server/routes/api.js or directly in server.js if routes/api.js doesn't exist

const express = require("express");
const router = express.Router();
const pool = require("../config/db"); // Adjust the path according to your project structure

router.get("/users", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users"); // Ensure 'users' is the correct table name
    res.json(rows);
  } catch (err) {
    console.error("Error executing query", err.stack);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
