import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Q1() {
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentCheck, setCurrentCheck] = useState(null);

  const runCode = () => {
    setLoading(true);
    setOutput(null);
    setElapsedTime(0);
    setCurrentCheck(null);

    // Start frontend timer
    let timerId = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    const eventSource = new EventSource("http://127.0.0.1:8000/q1/stream");

    eventSource.onmessage = (e) => {
      const data = JSON.parse(e.data);

      if (data.found) {
        // Final result
        setOutput(data);
        setLoading(false);
        clearInterval(timerId); // stop timer
        eventSource.close();
      } else {
        // Progress update
        setCurrentCheck(data.current_check);
      }
    };

    eventSource.onerror = (err) => {
      console.error("EventSource failed:", err);
      setOutput({ error: "Error streaming output" });
      setLoading(false);
      clearInterval(timerId);
      eventSource.close();
    };
  };

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
                <h4 className="fw-bold text-primary mb-3">Question 1</h4>
                <p className="lead text-muted">
                  A prime number is 12345678910987654321. Here n is 10. Find the
                  next number that follows this pattern. That number n lies
                  between 1000 and 3000.
                </p>
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
{`def build_kaprekar(num_limit: int) -> int:
    num = 0
    for i in range(1, num_limit + 1):
        num = num * (10 ** len(str(i))) + i
    for i in range(num_limit - 1, 0, -1):
        num = num * (10 ** len(str(i))) + i
    return num

def stream_q1():
    start_time = time.time()
    for num_limit in range(1000, 3001):
        kap_number = build_kaprekar(num_limit)
        elapsed_time = round(time.time() - start_time, 2)
        yield f"data: {{'current_check': {num_limit}, 'elapsed_time': {elapsed_time}}}\\n\\n"
        if gmpy2.is_prime(kap_number):
            yield f"data: {{'found': true, 'n': {num_limit}, 'kaprekar_number': '{kap_number}', 'elapsed_time': {elapsed_time}}}\\n\\n"
            break`}
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
                  <div className="d-flex flex-column">
                    <div className="d-flex align-items-center mb-2">
                      <div
                        className="spinner-border text-primary me-3"
                        role="status"
                      ></div>
                      <span>Processing... ({elapsedTime}s)</span>
                    </div>
                    {currentCheck && (
                      <p className="text-muted">
                        Currently checking n = {currentCheck}
                      </p>
                    )}
                  </div>
                ) : output ? (
                  output.error ? (
                    <p className="text-danger">{output.error}</p>
                  ) : (
                    <pre
                      style={{
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        fontSize: "0.95rem",
                      }}
                    >
                      <p>{JSON.stringify(output.n, null, 2)}</p>
                      {JSON.stringify(output.kaprekar_number, null, 2)}
                      <p>Runtime {JSON.stringify(output.runtime_seconds, null, 2)}</p><br/>
                    </pre>
                  )
                ) : (
                  <p className="text-muted">Click "Run Code" to start streaming.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Q1;
