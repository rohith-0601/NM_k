import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Q2() {
  const [output, setOutput] = useState([]);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(0);

  // Timer for elapsed time
  useEffect(() => {
    let timer;
    if (loading) {
      timer = setInterval(() => setTime((t) => t + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [loading]);

  // Run Code button handler
  const runCode = () => {
    setLoading(true);
    setOutput([]);
    setTime(0);

    axios
      .get("http://127.0.0.1:8000/q2")
      .then((res) => {
        setOutput(res.data.output);
        setLoading(false);
      })
      .catch(() => {
        setOutput([]);
        setLoading(false);
      });
  };

  const pythonCode = `
from sympy import isprime

result = []
for i in range(2, 1041):
    n = (10**i - 1) // 9  # 1N (repunit)
    if isprime(i) and isprime(n):
        result.append({"i": i, "repunit": str(n)})
`;

  const questionText = `11 is prime, 111 is not prime. We use the notation 1N for N ones. 
If N is prime, 1N might be prime. Determine the 5 primes between N = 2 and N = 1040.`;

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{ background: "linear-gradient(135deg, #eef6ff, #f9fbff)" }}
    >
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-light shadow-sm"
        style={{ background: "linear-gradient(90deg, #0d6efd, #4ba3ff)" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand fw-bold text-white" href="/">
            Prime Assignment
          </a>
          <button
            className="navbar-toggler bg-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav ms-auto">
              <NavLink to="/" className="nav-link text-white">
                Home
              </NavLink>
              {[1, 2, 3, 4, 5, 6, 7].map((q) => (
                <NavLink
                  key={q}
                  to={`/q${q}`}
                  className={({ isActive }) =>
                    `nav-link ${
                      isActive ? "fw-bold text-warning" : "text-white"
                    }`
                  }
                >
                  Q{q}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main LeetCode Style Container */}
      <div className="container-fluid flex-grow-1 my-4">
        <div className="row h-100">
          {/* Left: Question Box */}
          <div className="col-12 col-lg-6 mb-4 mb-lg-0">
            <div className="card shadow-lg border-0 h-100 rounded-4">
              <div className="card-header bg-primary text-white fw-bold">
                Question
              </div>
              <div className="card-body">
                <h4 className="fw-bold text-primary mb-3">Question 2</h4>
                <p className="lead text-muted">{questionText}</p>
              </div>
            </div>
          </div>

          {/* Right: Code + Output */}
          <div className="col-12 col-lg-6 d-flex flex-column">
            {/* Code Box */}
            <div className="card shadow-lg border-0 flex-fill mb-3 rounded-4">
              <div className="card-header bg-primary text-white fw-bold">
                Code
              </div>
              <div className="card-body d-flex flex-column">
                <pre
                  style={{
                    flexGrow: 1,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    fontSize: "0.9rem",
                    background: "#f8f9fa",
                    padding: "1rem",
                    borderRadius: "8px",
                  }}
                >
                  {pythonCode}
                </pre>
                <button
                  className="btn btn-success mt-3 align-self-end"
                  onClick={runCode}
                  disabled={loading}
                >
                  {loading ? "Running..." : "Run Code"}
                </button>
              </div>
            </div>

            {/* Output Box */}
            <div className="card shadow-lg border-0 flex-fill rounded-4">
              <div className="card-header bg-primary text-white fw-bold">
                Output
              </div>
              <div className="card-body">
                {loading ? (
                  <div className="d-flex align-items-center">
                    <div
                      className="spinner-border text-primary me-3"
                      role="status"
                    ></div>
                    <span>Processing... ({time}s)</span>
                  </div>
                ) : output.length > 0 ? (
                  <div
                    style={{
                      maxHeight: "500px",
                      overflowY: "auto",
                      scrollbarWidth: "none", // Firefox
                      msOverflowStyle: "none", // IE 10+
                    }}
                    className="hide-scrollbar"
                  >
                    {output.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          marginBottom: "0.5rem",
                          padding: "0.5rem",
                          background: "#f1f1f1",
                          borderRadius: "6px",
                          fontFamily: "monospace",
                        }}
                      >
                        <strong>N = {item.i}</strong>: {item.repunit}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted">Click "Run Code" to see output.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Q2;
