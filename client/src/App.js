import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/api/users") // Endpoint to fetch users; adjust according to your actual API
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.log("Error fetching data", error));
  }, []);

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.user_id}>
            ID: {user.user_id}, Name: {user.first_name} {user.middle_name}{" "}
            {user.last_name}, DOB: {user.date_of_birth}, Sex: {user.sex}, Email:{" "}
            {user.email}, Address: {user.street}, {user.city}, {user.state},{" "}
            {user.zip}, Phone: {user.phone_number}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
