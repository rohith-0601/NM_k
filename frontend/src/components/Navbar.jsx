import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
      <NavLink className="navbar-brand fw-bold text-primary" to="/">
        Prime Assignment
      </NavLink>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/">Home</NavLink>
          </li>
          {[1, 2, 3, 4, 5, 6, 7].map((q) => (
            <li className="nav-item" key={q}>
              <NavLink 
                className="nav-link" 
                activeClassName="active-link" 
                to={`/q${q}`}
              >
                Q{q}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
