import { useState } from "react";
import RulesScreen from "../../components/RulesScreen";
import { rulesText } from "./rules";

function LogicalGrid() {
  const [startGame, setStartGame] = useState(false);

  return startGame ? (
    <div
      style={{
        minHeight: "100vh",
        background: "rgba(0, 0, 0, 0.95)",
        color: "#00ffcc",
        fontFamily: "monospace",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px"
      }}
    >
      <div style={{ maxWidth: "900px", textAlign: "center" }}>
        <h1>🧠 Logical Grid Unlocked</h1>
        <p style={{ color: "#b8e6ff", lineHeight: 1.8 }}>
          The rules for the next challenge are now displayed. When you are ready, continue building the logical-grid game inside this folder.
        </p>
      </div>
    </div>
  ) : (
    <RulesScreen rules={rulesText} onStart={() => setStartGame(true)} />
  );
}

export default LogicalGrid;
