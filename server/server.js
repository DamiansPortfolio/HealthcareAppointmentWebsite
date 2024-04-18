const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/api"); // Adjust the path according to your project structure

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", userRoutes); // This line connects your '/api/users' endpoint

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
