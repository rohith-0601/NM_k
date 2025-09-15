import React from "react";
import { FaArrowRight } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Homepage.css";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <div className="homepage-content container-fluid">
        {/* Left Side - Question Cards */}
        <div className="left-side">
          {[1, 2, 3, 4, 5, 6, 7].map((num) => (
            <div key={num} className="question-card" onClick={() => navigate(`q${num}`)}>
              <h5 className="card-title">Question {num}</h5>
              <FaArrowRight className="card-icon" />
            </div>
          ))}
        </div>

        {/* Right Side - Assignment Card */}
        <div className="right-side">
          <div className="assignment-card">
            <h1 className="assignment-text">Prime Numbers Assignment</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
