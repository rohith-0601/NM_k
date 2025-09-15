import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="navbar-brand-bubble">Prime Assignment</div>
      <ul className="nav-bubbles">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-bubble ${isActive ? "active" : ""}`
            }
          >
            Home
          </NavLink>
        </li>
        {[1, 2, 3, 4, 5, 6, 7].map((q) => (
          <li key={q}>
            <NavLink
              to={`/q${q}`}
              className={({ isActive }) =>
                `nav-bubble ${isActive ? "active" : ""}`
              }
            >
              Q{q}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
