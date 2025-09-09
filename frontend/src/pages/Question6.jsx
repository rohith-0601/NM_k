import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Question6() {
  const [output, setOutput] = useState([]);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(0);

  // Timer for elapsed time
  useEffect(() => {
    let timer;
    if (loading) {
      setTime(0);
      timer = setInterval(() => setTime((t) => t + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [loading]);

  // Handle Run Code button
  const handleRunCode = () => {
    setLoading(true);
    setOutput([]);
    axios
      .get("http://127.0.0.1:8000/q6")
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
def euclid_number(p):
    return (2**(p-1)) * (2**p - 1)

primes = [2203, 2281]
result = []

for p in primes:
    n = euclid_number(p)
    result.append({
        "p": p,
        "digits": len(str(n)),
        "euclid_number": str(n)
    })
`;

  const questionText = `Compute Euclid numbers for primes 2203 and 2281.
Show the number of digits and the number itself.`;

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

      {/* Question Content */}
      <div className="container my-5">
        <h2 className="fw-bold text-center text-primary mb-4">Question 6</h2>
        <p className="lead text-muted text-center mb-5">{questionText}</p>

        <div className="row g-4">
          {/* Question Box (Left) */}
          <div className="col-12 col-lg-6">
            <div className="card shadow-lg border-0 h-100 rounded-4">
              <div className="card-header bg-primary text-white fw-bold">
                Question
              </div>
              <div className="card-body">
                <p className="mb-0">{questionText}</p>
              </div>
            </div>
          </div>

          {/* Code + Output (Right) */}
          <div className="col-12 col-lg-6 d-flex flex-column gap-4">
            {/* Code Box */}
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-header bg-primary text-white fw-bold">
                Code
              </div>
              <div className="card-body text-start">
                <pre
                  style={{
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    fontSize: "0.9rem",
                  }}
                >
                  {pythonCode}
                </pre>
                <button
                  className="btn btn-success mt-3"
                  onClick={handleRunCode}
                  disabled={loading}
                >
                  {loading ? "Running..." : "Run Code"}
                </button>
              </div>
            </div>

            {/* Output Box */}
            <div className="card shadow-lg border-0 rounded-4">
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
                  <div style={{ maxHeight: "500px", overflowY: "auto" }}>
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
                        <strong>p = {item.p}</strong> | Digits: {item.digits}
                        <br />
                        {item.euclid_number}
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

export default Question6;
