import React, { useState, useEffect } from "react";
import "./Q1.css"; // Import Q1 CSS

function Q6() {
  const [outputLines, setOutputLines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState("");
  const [elapsedTime, setElapsedTime] = useState(0);

  // Timer for loading
  useEffect(() => {
    let timer;
    if (loading) {
      timer = setInterval(() => setElapsedTime((t) => t + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [loading]);

  // Run session
  const handleRunClick = () => {
    setOutputLines(["Welcome to Q6 interactive session. Enter a number below."]);
    setNumber("");
  };

  const handleSubmit = () => {
    if (!number) return;

    setOutputLines((prev) => [
      ...prev,
      `Checking number = ${number}`,
      "Running backend...",
    ]);

    setLoading(true);
    setElapsedTime(0);

    fetch(`http://127.0.0.1:8000/q6?p=${number}`)
  .then((res) => res.json())
  .then((data) => {
    if (data && data.is_mersenne_prime) {
      setOutputLines((prev) => [
        ...prev,
        `✅ Perfect number found for p=${data.p}`,
        `Digits: ${data.digits}`,
        `Perfect Number: ${data.perfect_number}`
      ]);
    } else {
      setOutputLines((prev) => [
        ...prev,
        `❌ 2^${number} - 1 is not prime → no perfect number`
      ]);
    }
    setLoading(false);
  })
  .catch((err) => {
    console.error(err);
    setOutputLines((prev) => [...prev, "❌ Error fetching data"]);
    setLoading(false);
  });

  };

  return (
    <div className="q1-container">
      <h2 className="q1-title">Question 6</h2>
      <p className="q1-text">
        Enter a number and check whether it is a Perfect Number.
      </p>

      <button className="run-btn" onClick={handleRunClick}>
        Run Code
      </button>

      {/* Input for number */}
      {outputLines.length > 0 && (
        <div className="terminal-input">
          <span>Number: </span>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}

      {/* Terminal-style output */}
      <div className="terminal-output">
        {outputLines.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
        {loading && <div className="loading">⏳ Running... ({elapsedTime}s)</div>}
      </div>
    </div>
  );
}

export default Q6;
