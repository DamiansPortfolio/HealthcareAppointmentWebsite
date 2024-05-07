// Necessary modules for server functionality and session management
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const { createClient } = require("redis");

// Create and configure a Redis client
const redisClient = createClient({
  // Redis server URL and credentials
  url: "redis://:password@localhost:6379",
});

// Handle any errors that occur with the Redis client
redisClient.on("error", (err) => console.error("Redis Client Error", err));

// Connect the Redis client and log the connection status
redisClient
  .connect()
  .then(() => {
    console.log("Connected to Redis");
  })
  .catch((err) => {
    console.error("Failed to connect to Redis:", err);
  });

// Initialize the Express application
const app = express();

// Enable CORS (Cross-Origin Resource Sharing) with specific configurations
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"], // Allow requests from these front-end origins
    credentials: true, // Support credentials for cross-origin requests
  })
);

// Enable the application to parse JSON requests
app.use(express.json());

// Attach the Redis client to each incoming request for use in other middleware and routes
app.use((req, res, next) => {
  req.redisClient = redisClient;
  next(); // Proceed to the next middleware or route handler
});

// Configure session management using Redis for session storage
app.use(
  session({
    store: new RedisStore({ client: redisClient }), // Use Redis store for session data
    secret: "thisIsMySecretKey123456", // A secret key to sign the session ID cookie TODO: Change this to a more secure value
    resave: false, // Don't save session if it hasn't been modified
    saveUninitialized: false, // Don't create a session if it hasn't been initialized
    cookie: {
      secure: false, // Allow cookies over HTTP (not HTTPS)
      httpOnly: true, // Make cookies inaccessible to client-side scripts
      maxAge: 24 * 60 * 60 * 1000, // Session expiration: 1 day in milliseconds
    },
  })
);

// Use the API routes defined in the external routes file
app.use("/api", require("./routes/api"));

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
