import React, { useState, useEffect } from "react";
import "./Q1.css"; // using Q1 CSS

function Q4() {
  const [outputLines, setOutputLines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startInput, setStartInput] = useState("");
  const [endInput, setEndInput] = useState("");
  const [step, setStep] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Default values (p1, p2) from Q3 backend response
  const DEFAULT_START =
    "1475979915214180235084898622737381736312066145333169775147771216478570297878078949377407337049389289382748507531496480477281264838760259191814463365330269540496961201113430156902396093989090226259326935025281409614983499388222831448598601834318536230923772641390209490231836446899608210795482963763094236630945410832793769905399982457186322944729636418890623372171723742105636440368218459649632948538696905872650486914434637457507280441823676813517852099348660847172579408422316678097670224011990280170474894487426924742108823536808485072502240519452587542875349976558572670229633962575212637477897785501552646522609988869914013540483809865681250419497686697771007";

  const DEFAULT_END =
    "446087557183758429571151706402101809886208632412859901111991219963404685792820473369112545269003989026153245931124316702395758705693679364790903497461147071065254193353938124978226307947312410798874869040070279328428810311754844108094878252494866760969586998128982645877596028979171536962503068429617331702184750324583009171832104916050157628886606372145501702225925125224076829605427173573964812995250569412480720738476855293681666712844831190877620606786663862190240118570736831901886479225810414714078935386562497968178729127629594924411960961386713946279899275006954917139758796061223803393537381034666494402951052059047968693255388647930440925104186817009640171764133172418132836351";

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
    const value = startInput || DEFAULT_START;
    setStartInput(value);
    setOutputLines([`Start N = ${value}`]);
    setStep(2);
  };

  const handleEndSubmit = () => {
    const value = endInput || DEFAULT_END;
    setEndInput(value);

    setOutputLines([
      `Start N = ${startInput || DEFAULT_START}`,
      `End N = ${value}`,
      "Running backend...",
    ]);
    setStep(3);
    setLoading(true);
    setElapsedTime(0);

    const s = startInput || DEFAULT_START;
    const e = value;

    fetch(`http://127.0.0.1:8000/q4?start=${s}&end=${e}&count=4`)
      .then((res) => res.json())
      .then((data) => {
        if (data.output) {
          const { primes_between_squares, message } = data.output;

          if (primes_between_squares && primes_between_squares.length > 0) {
            setOutputLines([
              "Primes found between squares:",
              ...primes_between_squares.map(
                (p, idx) => `Prime ${idx + 1}: ${String(p)}` // ✅ force string
              ),
              message,
            ]);
          } else {
            setOutputLines(["No primes found.", message]);
          }
        } else if (data.error) {
          setOutputLines([`Error: ${data.error}`]);
        } else {
          setOutputLines(["No output found."]);
        }
        setLoading(false);
        setStep(1);
      })

      .catch((err) => {
        console.error(err);
        setOutputLines(["❌ Error fetching data"]);
        setLoading(false);
        setStep(1);
      });
  };

  return (
    <div className="q1-container">
      <h2 className="q1-title">Question 4</h2>
      <p className="q1-text">
        Brocard's Conjecture says for any consecutive primes greater than 3
        there are at least 4 prime numbers between their squares.
      </p>

      {/* Show default values from Q3 */}
      <div className="terminal-output">
        <div>
          <strong>p1 (default):</strong>
        </div>
        <div className="long-number">{DEFAULT_START}</div>

        <div>
          <strong>p2 (default):</strong>
        </div>
        <div className="long-number">{DEFAULT_END}</div>
      </div>

      <button
        className="run-btn"
        onClick={handleRunClick}
        style={{ margin: "2rem" }}
      >
        Run Code
      </button>

      {step === 1 && (
        <div className="terminal-input">
          <span>Start N: </span>
          <input
            type="text"
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
            type="text"
            value={endInput}
            onChange={(e) => setEndInput(e.target.value)}
          />
          <button onClick={handleEndSubmit}>Submit</button>
        </div>
      )}

      {/* Terminal Output */}
      <div className="terminal-output">
        {outputLines.map((line, idx) => (
          <div key={idx} className="long-number">
            {line}
          </div>
        ))}
        {loading && (
          <div className="loading">⏳ Running... ({elapsedTime}s)</div>
        )}
      </div>
    </div>
  );
}

export default Q4;
