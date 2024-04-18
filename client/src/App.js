import React from "react";
import {
  BrowserRouter as Router,
  Routes, // 'Switch' is replaced by 'Routes' in v6
  Route,
  Link,
} from "react-router-dom";
import HomePage from "./HomePage"; // Ensure this component is properly defined
import AboutPage from "./AboutPage"; // Optional: Example component

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link> // Just an example link
            </li>
          </ul>
        </nav>

        {/* 'Switch' is replaced with 'Routes' which is used to define all the Route components */}
        <Routes>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
