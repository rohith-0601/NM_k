import React, { useState } from "react";
import "./Q3.css"; // Create CSS similar to Q1 for styling
import axios from "axios";

function Q3() {
  const [outputLines, setOutputLines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startInput, setStartInput] = useState("");
  const [endInput, setEndInput] = useState("");
  const [step, setStep] = useState(0); // 0=show Run,1=start input,2=end input,3=running

  const handleRunCodeClick = () => {
    setStep(1);
    setOutputLines(["Welcome to Q3 interactive session. Enter inputs as prompted."]);
  };

  const handleStartSubmit = () => {
    if (!startInput) return;
    setOutputLines((prev) => [...prev, `Start N = ${startInput}`]);
    setStep(2);
  };

  const handleEndSubmit = () => {
    if (!endInput) return;
    setOutputLines((prev) => [...prev, `End N = ${endInput}`, "Running backend..."]);
    setStep(3);
    setLoading(true);

    const start = parseInt(startInput);
    const end = parseInt(endInput);

    axios
      .get(`http://127.0.0.1:8000/q3?start=${start}&end=${end}`)
      .then((res) => {
        const outputArr = res.data.output || [];
        outputArr.forEach((item, idx) => {
          const nValue = item.i ?? idx + start;
          const mersenne = item.mersenne ?? item;
          setOutputLines((prev) => [
            ...prev,
            `N = ${nValue}: ${mersenne}`
          ]);
        });
        setLoading(false);
      })
      .catch(() => {
        setOutputLines((prev) => [...prev, "❌ Error fetching output"]);
        setLoading(false);
      });
  };

  return (
    <div className="q3-container">
      <h2 className="q3-title">Question 3</h2>
      <p className="q3-text">
        Find all Mersenne primes between 2^N - 1, where N ranges from 2201 to 2298 (inclusive).
      </p>

      <button className="run-btn" onClick={handleRunCodeClick}>
        Run Code
      </button>

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

      <div className="terminal-output">
        {outputLines.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
        {loading && <div className="loading">⏳ Running...</div>}
      </div>
    </div>
  );
}

export default Q3;
