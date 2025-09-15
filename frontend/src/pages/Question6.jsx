import React, { useState, useEffect } from "react";
import "./Q1.css"; // Import Q1 CSS

function Q6() {
  const [outputLines, setOutputLines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0); // 0=ready, 1=ask start, 2=ask end, 3=running
  const [startPrime, setStartPrime] = useState("");
  const [endPrime, setEndPrime] = useState("");
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let timer;
    if (loading) {
      timer = setInterval(() => setElapsedTime((t) => t + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [loading]);

  const handleRunClick = () => {
    setStep(1);
    setOutputLines(["Welcome to Q6 interactive session. Enter inputs below."]);
  };

  const handleStartSubmit = () => {
    if (!startPrime) return;
    setOutputLines((prev) => [...prev, `Start Prime = ${startPrime}`]);
    setStep(2);
  };

  const handleEndSubmit = () => {
    if (!endPrime) return;
    setOutputLines((prev) => [
      ...prev,
      `End Prime = ${endPrime}`,
      "Running backend...",
    ]);
    setStep(3);
    setLoading(true);
    setElapsedTime(0);

    fetch(`http://127.0.0.1:8000/q6?start=${startPrime}&end=${endPrime}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.output && data.output.length > 0) {
          data.output.forEach((item) => {
            setOutputLines((prev) => [
              ...prev,
              `p = ${item.p} | Digits: ${item.digits}\n${item.euclid_number}`,
            ]);
          });
        } else {
          setOutputLines((prev) => [...prev, "No output found."]);
        }
        setLoading(false);
        setStep(1); // allow rerun
      })
      .catch((err) => {
        console.error(err);
        setOutputLines((prev) => [...prev, "❌ Error fetching data"]);
        setLoading(false);
        setStep(1);
      });
  };

  return (
    <div className="q1-container">
      <h2 className="q1-title">Question 6</h2>
      <p className="q1-text">
        Compute Euclid numbers for primes in the given range. Show number of digits and the number itself.
      </p>

      <button className="run-btn" onClick={handleRunClick}>
        Run Code
      </button>

      {/* Step-by-step inputs */}
      {step === 1 && (
        <div className="terminal-input">
          <span>Start Prime: </span>
          <input
            type="number"
            value={startPrime}
            onChange={(e) => setStartPrime(e.target.value)}
          />
          <button onClick={handleStartSubmit}>Submit</button>
        </div>
      )}
      {step === 2 && (
        <div className="terminal-input">
          <span>End Prime: </span>
          <input
            type="number"
            value={endPrime}
            onChange={(e) => setEndPrime(e.target.value)}
          />
          <button onClick={handleEndSubmit}>Submit</button>
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
