// Homepage.jsx
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Homepage.css";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
    const navigate = useNavigate()
  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100" style={{ maxWidth: "1200px" }}>
        
        {/* Left side - Bubbly Buttons */}
        <div className="col-md-6 d-flex flex-column justify-content-center gap-3">
          {[1, 2, 3, 4, 5, 6, 7].map((num) => (
            <div key={num} className="bubble-card">
              <span className="fw-bold">Question {num}</span>
              <button className="btn bubble-btn" onClick={()=>navigate(`q${num}`)}>
                <FaArrowRight />
              </button>
            </div>
          ))}
        </div>

        {/* Right side - Assignment Bubble */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="bubble-big">
            <h2 className="fw-bold text-white">Prime Numbers Assignment</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
