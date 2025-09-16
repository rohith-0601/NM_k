import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Q1.css"; // reuse Q1 terminal-style CSS

function Q2() {
  const [outputLines, setOutputLines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(0);

  const [startInput, setStartInput] = useState("");
  const [endInput, setEndInput] = useState("");
  const [step, setStep] = useState(0);

  useEffect(() => {
    let timer;
    if (loading) {
      timer = setInterval(() => setTime((t) => t + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [loading]);

  const handleRunCodeClick = () => {
    setStep(1);
    setOutputLines([
      "Welcome to Q2 interactive session. Enter inputs below as prompted.",
    ]);
    setTime(0);
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
    setTime(0);

    const start = parseInt(startInput);
    const end = parseInt(endInput);

    axios
      .get(`http://127.0.0.1:8000/q2?start=${start}&end=${end}`)
      .then((res) => {
        const outputArr = res.data.output || [];

        // Create map for fast lookup
        const repunitMap = {};
        outputArr.forEach((item) => {
          repunitMap[item.N] = item.repunit;
        });

        // Iterate whole range, print repunit if found, else "No repunit found"
        const lines = [];
        for (let n = start; n <= end; n++) {
          if (repunitMap[n]) {
            lines.push(
              `✅ N = ${n}: ${repunitMap[n]}` // bold + dark
            );
          } else {
            lines.push(`N = ${n}: No repunit found`);
          }
        }

        setOutputLines((prev) => [...prev, ...lines]);
        setLoading(false);
        setStep(0);
      })
      .catch(() => {
        setOutputLines((prev) => [...prev, "❌ Error fetching output"]);
        setLoading(false);
        setStep(0);
      });
  };

  const questionText = `11 is prime, 111 is not prime. We use the notation 1N for N ones. 
If N is prime, 1N might be prime. Determine the primes between N = 2 and N = 1040.`;

  return (
    <div className="q1-container">
      <h2 className="q1-title">Question 2</h2>
      <p className="q1-text">{questionText}</p>

      {/* Run Code button always visible */}
      <button className="run-btn" onClick={handleRunCodeClick}>
        Run Code
      </button>

      {/* Terminal input */}
      {step === 1 && (
        <div className="terminal-input">
          <span>Start N:</span>
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
          <span>End N:</span>
          <input
            type="number"
            value={endInput}
            onChange={(e) => setEndInput(e.target.value)}
          />
          <button onClick={handleEndSubmit}>Submit</button>
        </div>
      )}

      {/* Terminal output */}
      <div className="terminal-output">
        {outputLines.map((line, idx) => {
          const isFound = line.includes("✅");
          return (
            <div
              key={idx}
              className={isFound ? "found-prime" : "not-prime"}
              style={isFound ? { fontWeight: "bold", color: "#222" } : {}}
            >
              {line}
            </div>
          );
        })}
        {loading && <div className="loading">⏳ Running... ({time}s)</div>}
      </div>
    </div>
  );
}

export default Q2;
