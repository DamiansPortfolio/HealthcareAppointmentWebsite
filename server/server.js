const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/api");
const session = require("express-session");

// Configure connect-redis with express-session
const RedisStore = require("connect-redis").default;

const redis = require("redis");

// Create and connect a Redis client
const redisClient = redis.createClient({
  url: "redis://:password@localhost:6379",
  legacyMode: true,
  retry_strategy: function (options) {
    if (options.error && options.error.code === "ECONNREFUSED") {
      return new Error("The server refused the connection");
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      return new Error("Retry time exhausted");
    }
    if (options.attempt > 10) {
      return undefined;
    }
    return Math.min(options.attempt * 100, 3000);
  },
});

(async () => {
  try {
    await redisClient.connect();
    console.log("Connected to Redis");
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
  }
})();

redisClient.on("error", function (error) {
  console.error("Redis error: ", error);
});

const app = express();
app.use(
  cors({
    origin: ("http://localhost:3000", "http://localhost:3001"), // Adjust this if your front-end is on a different port
    credentials: true, // Allows the server to send cookies to the client
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
    cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 },
  })
);

app.use("/api", userRoutes); // All routes in 'api.js' will be prefixed with '/api'

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
