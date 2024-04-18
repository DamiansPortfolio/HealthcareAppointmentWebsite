const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/api");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", userRoutes); // All routes in 'api.js' will be prefixed with '/api'

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
