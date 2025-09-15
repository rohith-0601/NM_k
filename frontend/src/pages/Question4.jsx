import React, { useState, useEffect } from "react";
import "./Q1.css"; // using Q1 CSS

function Q4() {
  const [outputLines, setOutputLines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startInput, setStartInput] = useState("");
  const [endInput, setEndInput] = useState("");
  const [step, setStep] = useState(0); // 0 = show Run Code, 1 = ask start, 2 = ask end, 3 = running
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
    setOutputLines([
      "Welcome to Q4 interactive session. Enter inputs below as prompted.",
    ]);
  };

  const handleStartSubmit = () => {
    if (!startInput) return;
    setOutputLines((prev) => [...prev, `Start N = ${startInput}`]);
    setStep(2);
  };

  const handleEndSubmit = () => {
    if (!endInput) return;
    setOutputLines((prev) => [
      ...prev,
      `End N = ${endInput}`,
      "Running backend...",
    ]);
    setStep(3);
    setLoading(true);
    setElapsedTime(0);

    const s = Number(startInput);
    const e = Number(endInput);

    fetch(`http://127.0.0.1:8000/q4?start=${s}&end=${e}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.output && data.output.length > 0) {
          data.output.forEach((item) => {
            if (item.prime) {
              setOutputLines((prev) => [...prev, item.prime]);
            } else if (item.message) {
              setOutputLines((prev) => [...prev, item.message]);
            }
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
      <h2 className="q1-title">Question 4</h2>
      <p className="q1-text">
        Find at least 4 prime numbers between (2^N1 - 1)^2 and (2^N2 - 1)^2.
      </p>

      {/* Run Code Button */}
      <button className="run-btn" onClick={handleRunClick}>
        Run Code
      </button>

      {/* Terminal-like input */}
      {step === 1 && (
        <div className="terminal-input">
          <span>Start N: </span>
          <input
            type="number"
            value={startInput}
            onChange={(e) => setStartInput(e.target.value)}
          />
          <button onClick={handleStartSubmit}>Submit</button>
        </div>
      )}

      {step === 2 && (
        <div className="terminal-input">
          <span>End N: </span>
          <input
            type="number"
            value={endInput}
            onChange={(e) => setEndInput(e.target.value)}
          />
          <button onClick={handleEndSubmit}>Submit</button>
        </div>
      )}

      {/* Terminal Output */}
      <div className="terminal-output">
        {outputLines.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
        {loading && <div className="loading">⏳ Running... ({elapsedTime}s)</div>}
      </div>
    </div>
  );
}

export default Q4;
