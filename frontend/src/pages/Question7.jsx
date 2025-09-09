import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Question7 = () => {
  const [num, setNum] = useState(
    "1000000000000000000000000000000000000000000000000000" // 52-digit number
  );
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(0);

  // Timer
  useEffect(() => {
    let timer;
    if (loading) {
      setTime(0);
      timer = setInterval(() => setTime((t) => t + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [loading]);

  // Run Code handler
  const handleRunCode = async () => {
    setLoading(true);
    setOutput(null);
    try {
      const res = await axios.get(`http://127.0.0.1:8000/q7?num=${num}`);
      setOutput(res.data.output);
    } catch (err) {
      setOutput({ error: "Error fetching output" });
    } finally {
      setLoading(false);
    }
  };

  const pythonCode = `
def is_sum_of_two_primes(n):
    if n < 4:
        return False, None
    for i in range(2, n//2 + 1):
        if is_prime(i) and is_prime(n - i):
            return True, (i, n - i)
    return False, None

number = int("1000000000000000000000000000000000000000000000000000")
can_sum, pair = is_sum_of_two_primes(number)
result = {
    "number": number,
    "is_sum_of_two_primes": can_sum,
    "pair": pair
}
`;

  const questionText =
    "Determine if a number can be expressed as the sum of two prime numbers.";

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
              {[1, 2, 3, 4, 5, 6, 7].map((q) => (
                <NavLink
                  key={q}
                  to={`/q${q}`}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "fw-bold text-warning" : "text-white"}`
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
        <h2 className="fw-bold text-center text-primary mb-4">Question 7</h2>
        <p className="lead text-muted text-center mb-5">{questionText}</p>

        <div className="row g-4">
          {/* Question Box (Left) */}
          <div className="col-12 col-lg-6">
            <div className="card shadow-lg border-0 h-100 rounded-4">
              <div className="card-header bg-primary text-white fw-bold">
                Question
              </div>
              <div className="card-body">
                <p>{questionText}</p>
                <input
                  type="text"
                  value={num}
                  onChange={(e) => setNum(e.target.value.replace(/\D/g, ""))}
                  className="form-control mt-3"
                  style={{ maxWidth: "400px" }}
                  placeholder="Enter a number"
                />
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
                ) : output ? (
                  output.error ? (
                    <p>{output.error}</p>
                  ) : (
                    <div style={{ fontFamily: "monospace" }}>
                      <p>
                        Number: <strong>{output.number}</strong>
                      </p>
                      <p>
                        Can be expressed as sum of two primes?{" "}
                        <strong>
                          {output.is_sum_of_two_primes ? "Yes" : "No"}
                        </strong>
                      </p>
                      {output.pair && (
                        <p>
                          Pair:{" "}
                          <strong>
                            {output.pair[0]} + {output.pair[1]}
                          </strong>
                        </p>
                      )}
                    </div>
                  )
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
};

export default Question7;
