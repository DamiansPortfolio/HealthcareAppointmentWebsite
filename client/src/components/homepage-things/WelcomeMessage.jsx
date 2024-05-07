// Inside WelcomeMessage.jsx
import React from "react";
import { useUser } from "../UserContext"; // Adjust the import path as necessary

const WelcomeMessage = () => {
  const { user } = useUser(); // Extract user from context

  return (
    <div>
      {user ? (
        <h1>Welcome, {user.username}!</h1> // Display username from user context
      ) : (
        <h1>Welcome!</h1> // Fallback message if no user is logged in
      )}
    </div>
  );
};

export default WelcomeMessage;
