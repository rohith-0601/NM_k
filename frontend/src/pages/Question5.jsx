import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Q5() {
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

  // Run Code handler
  const runCode = () => {
    setLoading(true);
    setOutput([]);
    setTime(0);

    axios
      .get("http://127.0.0.1:8000/q5")
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
from gmpy2 import mpz, is_prime

def generate_palindrome(length):
    half = (length + 1) // 2
    start = 10 ** (half - 1)
    end = 10 ** half

    for i in range(start, end):
        s = str(i)
        pal = s + s[-2::-1]  
        yield mpz(pal)


def q5(max_digits=50, max_primes=5):

    result = []
    length = max_digits if max_digits % 2 == 1 else max_digits + 1
    prime_count = 0

    while prime_count < max_primes:
        for pal in generate_palindrome(length):
            if is_prime(pal):
                result.append({
                    "palindromic_num": str(pal),
                    "digits": len(str(pal))
                })
                prime_count += 1
                if prime_count >= max_primes:
                    break
        length += 2  # move to next odd-length palindrome

    return result
`;

  const questionText = `Generate palindromic numbers of the form 1^1 2^2 ... n^n ... 2^2 1^1 and check which are prime. Stop once a 50+ digit prime is found.`;

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{ background: "linear-gradient(135deg, #f8f1df, #f0e4c3)" }}
    >
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-light shadow-sm"
        style={{
          background: "linear-gradient(90deg, #d9a066, #f2c97d)",
        }}
      >
        <div className="container-fluid">
          <a className="navbar-brand fw-bold text-dark" href="/">
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
              <NavLink to="/" className="nav-link text-dark">
                Home
              </NavLink>
              {[1, 2, 3, 4, 5, 6, 7].map((q) => (
                <NavLink
                  key={q}
                  to={`/q${q}`}
                  className={({ isActive }) =>
                    `nav-link ${
                      isActive ? "fw-bold text-danger" : "text-dark"
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

      {/* Main Layout */}
      <div className="container-fluid flex-grow-1 my-4">
        <div className="row h-100">
          {/* Left: Question */}
          <div className="col-12 col-lg-6 mb-4 mb-lg-0">
            <div className="card shadow-lg border-0 h-100 rounded-4">
              <div
                className="card-header text-dark fw-bold"
                style={{ backgroundColor: "#f2c97d" }}
              >
                Question
              </div>
              <div className="card-body">
                <h4 className="fw-bold text-dark mb-3">Question 5</h4>
                <p className="lead text-muted">{questionText}</p>
              </div>
            </div>
          </div>

          {/* Right: Code + Output */}
          <div className="col-12 col-lg-6 d-flex flex-column">
            {/* Code */}
            <div className="card shadow-lg border-0 flex-fill mb-3 rounded-4">
              <div
                className="card-header text-dark fw-bold"
                style={{ backgroundColor: "#c9a563" }}
              >
                Code
              </div>
              <div className="card-body d-flex flex-column">
                <pre
                  style={{
                    flexGrow: 1,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    fontSize: "0.9rem",
                    background: "#fffaf0",
                    padding: "1rem",
                    borderRadius: "8px",
                  }}
                >
                  {pythonCode}
                </pre>
                <button
                  className="btn mt-3 align-self-end"
                  onClick={runCode}
                  disabled={loading}
                  style={{
                    background:
                      "linear-gradient(145deg, #cb7d5f, #ae705a)",
                    color: "#fffaf0",
                  }}
                >
                  {loading ? "Running..." : "Run Code"}
                </button>
              </div>
            </div>

            {/* Output */}
            <div className="card shadow-lg border-0 flex-fill rounded-4">
              <div
                className="card-header text-dark fw-bold"
                style={{ backgroundColor: "rgba(176, 137, 66, 1)" }}
              >
                Output
              </div>
              <div className="card-body">
                {loading ? (
                  <div className="d-flex align-items-center">
                    <div
                      className="spinner-border text-danger me-3"
                      role="status"
                    ></div>
                    <span>Processing... ({time}s)</span>
                  </div>
                ) : output.length > 0 ? (
                  <div
                    style={{
                      maxHeight: "500px",
                      overflowY: "auto",
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                    className="hide-scrollbar"
                  >
                    {output.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          marginBottom: "0.5rem",
                          padding: "0.5rem",
                          background: "#fffaf0",
                          borderRadius: "6px",
                          fontFamily: "monospace",
                        }}
                      >
                        <strong>({item.digits} digits)</strong>:{" "}
                        {item.palindromic_num}
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

export default Q5;
