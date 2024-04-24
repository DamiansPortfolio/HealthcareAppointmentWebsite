const express = require("express");
const cors = require("cors");
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const { createClient } = require("redis");

// Create and connect a Redis client
const redisClient = createClient({
  url: "redis://:password@localhost:6379", // Ensure your Redis URL and password are correct
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

redisClient
  .connect()
  .then(() => {
    console.log("Connected to Redis");
  })
  .catch((err) => {
    console.error("Failed to connect to Redis:", err);
  });

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"], // Proper array format for multiple origins
    credentials: true,
  })
);

app.use(express.json());

app.use((req, res, next) => {
  req.redisClient = redisClient;
  next();
});

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "thisIsMySecretKey123456",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }, // 1 day
  })
);

app.use("/api", require("./routes/api"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
