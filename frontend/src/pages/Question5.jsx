import React, { useState, useEffect } from "react";
import "./Q1.css"; // Using Q1 CSS

function Q5() {
  const [outputLines, setOutputLines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0); // 0=ready, 1=ask min digits, 2=ask max primes, 3=running
  const [minDigits, setMinDigits] = useState("");
  const [maxPrimes, setMaxPrimes] = useState("");
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
    setOutputLines(["Welcome to Q5 interactive session. Enter inputs below."]);
  };

  const handleMinDigitsSubmit = () => {
    if (!minDigits) return;
    setOutputLines((prev) => [...prev, `Minimum Digits = ${minDigits}`]);
    setStep(2);
  };

  const handleMaxPrimesSubmit = () => {
    if (!maxPrimes) return;
    setOutputLines((prev) => [
      ...prev,
      `Number of Primes = ${maxPrimes}`,
      "Running backend...",
    ]);
    setStep(3);
    setLoading(true);
    setElapsedTime(0);

    fetch(
      `http://127.0.0.1:8000/q5?start_digits=${minDigits}&max_primes=${maxPrimes}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.output && data.output.length > 0) {
          data.output.forEach((item) => {
            setOutputLines((prev) => [
              ...prev,
              `(${item.digits} digits): ${item.palindromic_num}`,
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
      <h2 className="q1-title">Question 5</h2>
      <p className="q1-text">
        Generate palindromic numbers and check which are prime. Stop once enough primes are found.
      </p>

      {/* Run Code Button */}
      <button className="run-btn" onClick={handleRunClick}>
        Run Code
      </button>

      {/* Interactive Inputs */}
      {step === 1 && (
        <div className="terminal-input">
          <span>Minimum Digits: </span>
          <input
            type="number"
            value={minDigits}
            onChange={(e) => setMinDigits(e.target.value)}
          />
          <button onClick={handleMinDigitsSubmit}>Submit</button>
        </div>
      )}

      {step === 2 && (
        <div className="terminal-input">
          <span>Number of Primes: </span>
          <input
            type="number"
            value={maxPrimes}
            onChange={(e) => setMaxPrimes(e.target.value)}
          />
          <button onClick={handleMaxPrimesSubmit}>Submit</button>
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

export default Q5;
