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
        `✅ Perfect number found for p=${data.p} such that 2^(p-1)*(2^p - 1)`,
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
      <div className="terminal-output">
        <div><strong>N = 2203:</strong></div>
        <div className="long-number">
          1475979915214180235084898622737381736312066145333169775147771216478570297878078949377407337049389289382748507531496480477281264838760259191814463365330269540496961201113430156902396093989090226259326935025281409614983499388222831448598601834318536230923772641390209490231836446899608210795482963763094236630945410832793769905399982457186322944729636418890623372171723742105636440368218459649632948538696905872650486914434637457507280441823676813517852099348660847172579408422316678097670224011990280170474894487426924742108823536808485072502240519452587542875349976558572670229633962575212637477897785501552646522609988869914013540483809865681250419497686697771007
        </div>

        <div><strong>N = 2281:</strong></div>
        <div className="long-number">
          446087557183758429571151706402101809886208632412859901111991219963404685792820473369112545269003989026153245931124316702395758705693679364790903497461147071065254193353938124978226307947312410798874869040070279328428810311754844108094878252494866760969586998128982645877596028979171536962503068429617331702184750324583009171832104916050157628886606372145501702225925125224076829605427173573964812995250569412480720738476855293681666712844831190877620606786663862190240118570736831901886479225810414714078935386562497968178729127629594924411960961386713946279899275006954917139758796061223803393537381034666494402951052059047968693255388647930440925104186817009640171764133172418132836351
        </div>
      </div>

      <button className="run-btn" onClick={handleRunClick} style={{margin:"2rem"}}>
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
