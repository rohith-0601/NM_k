import React, { useState, useEffect } from "react";
import "./Q1.css"; // reuse Q1.css for terminal-like styling

function Q7() {
  const [outputLines, setOutputLines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0); // 0=ready, 1=ask number, 2=running
  const [num, setNum] = useState("");
  const [elapsedTime, setElapsedTime] = useState(0);

  // Timer for running state
  useEffect(() => {
    let timer;
    if (loading) {
      setElapsedTime(0);
      timer = setInterval(() => setElapsedTime((t) => t + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [loading]);

  const handleRunClick = () => {
    setStep(1);
    setOutputLines([
      "Welcome to Q7 interactive session. Enter a number below.",
    ]);
  };

  const handleNumSubmit = () => {
    if (!num) return;
    setOutputLines((prev) => [...prev, `Number = ${num}`, "Running backend..."]);
    setStep(2);
    setLoading(true);

    fetch(`http://127.0.0.1:8000/q7?num=${num}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.output) {
          const o = data.output;
          setOutputLines((prev) => [
            ...prev,
            `Number: ${o.number}`,
            `Can be expressed as sum of two primes? ${
              o.is_sum_of_two_primes ? "Yes ✅" : "No ❌"
            }`,
            o.pair
              ? `Pair: ${o.pair[0]} + ${o.pair[1]}`
              : "No valid pair found.",
          ]);
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
      <h2 className="q1-title">Question 7</h2>
      <p className="q1-text">
        Determine if a number can be expressed as the sum of two prime numbers.
      </p>

      <button className="run-btn" onClick={handleRunClick}>
        Run Code
      </button>

      {/* Step input */}
      {step === 1 && (
        <div className="terminal-input">
          <span>Enter Number: </span>
          <input
            type="text"
            value={num}
            onChange={(e) => setNum(e.target.value.replace(/\D/g, ""))}
          />
          <button onClick={handleNumSubmit}>Submit</button>
        </div>
      )}

      {/* Terminal-style output */}
      <div className="terminal-output">
        {outputLines.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
        {loading && (
          <div className="loading">⏳ Running... ({elapsedTime}s)</div>
        )}
      </div>
    </div>
  );
}

export default Q7;
