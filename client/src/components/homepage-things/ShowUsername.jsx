// Inside ShowUsername.jsx
import React from "react";
import { useUser } from "../UserContext"; // Adjust the path as needed

const ShowUsername = () => {
  const { user } = useUser();

  return <div className="navbar-text">{user && `User: ${user.username}`}</div>;
};

export default ShowUsername;
