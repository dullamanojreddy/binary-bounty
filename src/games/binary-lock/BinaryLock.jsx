import { useEffect, useState } from "react";
import RulesScreen from "../../components/RulesScreen";
import LogicalGrid from "../logical-grid/logical";
import { rulesText } from "./rules";
import bgImage from "./binarylock.jpg";

function BinaryLock() {
  const [startGame, setStartGame] = useState(false);
  const [showNextGame, setShowNextGame] = useState(false);
  const [answers, setAnswers] = useState({});
  const [status, setStatus] = useState({});

  const correctAnswers = {
    1: "1010",
    2: "1101",
    3: "00101",
    4: "11100",
    5: "101010"
  };

  const questions = [
    {
      id: 1,
      text: `
Level 1 (4-bit)
- Exactly 2 bits are 1
- First bit ≠ last bit
- Second bit = fourth bit
- Third bit ≠ second bit
`
    },
    {
      id: 2,
      text: `
Level 2 (4-bit)
- Exactly 3 bits are 1
- First bit = 1
- Second bit ≠ third bit
- Last bit = second bit
`
    },
    {
      id: 3,
      text: `
Level 3 (5-bit)
- Exactly 2 bits are 1
- First bit = 0
- Last bit = 1
- Second bit = fourth bit
- Third bit ≠ second bit
`
    },
    {
      id: 4,
      text: `
Level 4 (5-bit)
- Exactly 3 bits are 1
- First bit ≠ last bit
- Second bit = third bit
- Fourth bit ≠ second bit
- At least one pair of consecutive 1s
- Fifth bit ≠ third bit
`
    },
    {
      id: 5,
      text: `
Level 5 (6-bit)
- Exactly 3 bits are 1
- First bit = 1
- Last bit = 0
- Second bit ≠ third bit
- Fourth bit = second bit
- Fifth bit ≠ fourth bit
- No two 1s are adjacent
`
    }
  ];

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setStatus((prev) => ({ ...prev, [id]: undefined }));
  };

  const playWrongBeep = () => {
    if (typeof window === "undefined") return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const audioCtx = new AudioContext();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(220, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.12);
    oscillator.onended = () => audioCtx.close();
  };

  const handleVerify = (id) => {
    const answer = (answers[id] || "").trim();

    if (!answer) {
      setStatus((prev) => ({ ...prev, [id]: "empty" }));
      return;
    }

    const valid = answer === correctAnswers[id];
    if (!valid) {
      playWrongBeep();
    }

    setStatus((prev) => ({
      ...prev,
      [id]: valid ? "correct" : "incorrect"
    }));
  };

  const solvedCount = Object.values(status).filter((value) => value === "correct").length;

  useEffect(() => {
    if (questions.length > 0 && solvedCount === questions.length) {
      setShowNextGame(true);
    }
  }, [solvedCount]);

  if (showNextGame) {
    return <LogicalGrid />;
  }

  return startGame ? (
    <div
      style={{
        minHeight: "100vh",
        background: `url(${bgImage}) no-repeat center center/cover`,
        backgroundColor: "#05081a",
        backgroundBlendMode: "multiply",
        color: "#00ffcc",
        fontFamily: "monospace",
        textAlign: "center",
        padding: "40px 20px"
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          background: "rgba(0, 0, 0, 0.75)",
          padding: "30px",
          borderRadius: "18px",
          border: "1px solid #00ffcc",
          boxShadow: "0 0 30px #00ffcc",
          color: "#00ffcc",
          fontFamily: "monospace"
        }}
      >
        <h1 style={{ marginBottom: "10px" }}>🔓 Binary Lock Game Started</h1>
        <p style={{ marginTop: 0, marginBottom: "24px", color: "#b8e6ff" }}>
          Enter the binary code for each lock and verify your answer.
        </p>

        {questions.map((q) => (
          <div
            key={q.id}
            style={{
              border: "1px solid #00ffcc",
              margin: "20px auto",
              padding: "22px",
              width: "100%",
              textAlign: "left",
              borderRadius: "14px",
              backgroundColor: "rgba(0,0,0,0.7)",
              boxShadow: "0 0 10px #00ffcc"
            }}
          >
            <pre style={{ margin: 0, whiteSpace: "pre-wrap", color: "#ccefff" }}>{q.text}</pre>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "12px",
                marginTop: "18px"
              }}
            >
              <input
                type="text"
                value={answers[q.id] || ""}
                onChange={(event) => handleChange(q.id, event.target.value)}
                placeholder="Enter binary answer"
                style={{
                  flex: "1 1 220px",
                  minWidth: "180px",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255, 255, 255, 0.18)",
                  background: "rgba(255, 255, 255, 0.06)",
                  color: "white"
                }}
              />
              <button
                onClick={() => handleVerify(q.id)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "10px",
                  border: "1px solid #00ffcc",
                  background: "transparent",
                  color: "#00ffcc",
                  cursor: "pointer",
                  fontFamily: "monospace",
                  transition: "0.3s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#00ffcc";
                  e.currentTarget.style.color = "black";
                  e.currentTarget.style.boxShadow = "0 0 10px #00ffcc";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#00ffcc";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Verify
              </button>
              {status[q.id] === "correct" && (
                <span style={{ color: "#7df77d", fontWeight: "700" }}>Correct!</span>
              )}
              {status[q.id] === "incorrect" && (
                <span style={{ color: "#ff7a92", fontWeight: "700" }}>Try again</span>
              )}
              {status[q.id] === "empty" && (
                <span style={{ color: "#ffd36a", fontWeight: "700" }}>Enter a code first</span>
              )}
            </div>
          </div>
        ))}
        {solvedCount === questions.length && (
          <div
            style={{
              marginTop: "20px",
              padding: "18px 22px",
              borderRadius: "14px",
              background: "rgba(34, 108, 188, 0.16)",
              border: "1px solid rgba(34, 108, 188, 0.35)",
              color: "#b0f3ff"
            }}
          >
            🎉 All locks unlocked! You solved every binary code.
          </div>
        )}
      </div>
    </div>
  ) : (
    <RulesScreen rules={rulesText} onStart={() => setStartGame(true)} />
  );
}

export default BinaryLock;