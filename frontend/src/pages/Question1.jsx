import React, { useState } from "react";
import "./Q1.css";

function Q1() {
  const [outputLines, setOutputLines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startInput, setStartInput] = useState("");
  const [endInput, setEndInput] = useState("");
  const [step, setStep] = useState(0); // 0 = show Run Code, 1 = ask start, 2 = ask end, 3 = running

  const handleRunCodeClick = () => {
    setStep(1);
    setOutputLines([
      "Welcome to Q1 interactive session. Enter inputs below as prompted."
    ]);
    setStartInput("");
    setEndInput("");
  };

  const handleStartSubmit = () => {
    if (!startInput) return;
    setOutputLines((prev) => [...prev, `Start = ${startInput}`]);
    setStep(2);
  };

  const handleEndSubmit = () => {
    if (!endInput) return;
    setOutputLines((prev) => [...prev, `End = ${endInput}`, "Running backend..."]);
    setStep(3);
    setLoading(true);

    const start = parseInt(startInput);
    const end = parseInt(endInput);

    const eventSource = new EventSource(
      `http://127.0.0.1:8000/q1/stream?start=${start}&end=${end}`
    );

    eventSource.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data.replace(/'/g, '"'));

        if (data.found) {
          setOutputLines((prev) => [
            ...prev,
            `✅ Found Kaprekar Prime n=${data.n}, number=${data.kaprekar_number}`,
          ]);
          setLoading(false);
          setStep(0); // allow rerun
          eventSource.close();
        } else if (data.not_found) {
          setOutputLines((prev) => [
            ...prev,
            `❌ No Kaprekar prime found. Last checked=${data.last_checked}`,
          ]);
          setLoading(false);
          setStep(0); // allow rerun
          eventSource.close();
        } else if (data.current_check && data.kaprekar_number) {
          setOutputLines((prev) => [
            ...prev,
            `Checking n=${data.current_check}: ${data.kaprekar_number} -> Not prime`,
          ]);
        }
      } catch (err) {
        setOutputLines((prev) => [...prev, "⚠️ JSON parse error"]);
        console.error(err);
        setLoading(false);
        setStep(0); // allow rerun
      }
    };

    eventSource.onerror = (err) => {
      setOutputLines((prev) => [...prev, "❌ Streaming error"]);
      setLoading(false);
      setStep(0); // allow rerun
      eventSource.close();
    };
  };

  return (
    <div className="q1-container">
      <h2 className="q1-title">Question 1</h2>
      <p className="q1-text">
        A prime number is 12345678910987654321. Here n is 10. Find the next number that follows this pattern. That number n lies between 1000 and 3000.
      </p>

      {/* Run Code Button */}
      {step === 0 && (
        <button className="run-btn" onClick={handleRunCodeClick}>
          Run Code
        </button>
      )}

      {/* Terminal-like input */}
      {step === 1 && (
        <div className="terminal-input">
          <span>Start: </span>
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
          <span>End: </span>
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
          const isNotPrime = line.includes("-> Not prime");
          const isFound = line.includes("✅");
          return (
            <div
              key={idx}
              className={isNotPrime ? "not-prime" : isFound ? "found-prime" : ""}
            >
              {line}
            </div>
          );
        })}
        {loading && <div className="loading">⏳ Running...</div>}
      </div>
    </div>
  );
}

export default Q1;
