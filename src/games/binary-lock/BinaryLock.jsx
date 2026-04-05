// BinaryLock.jsx
// Component for the Binary Lock game

import { useState } from "react";
import RulesScreen from "../../components/RulesScreen";
import { rulesText } from "./rules";

function BinaryLock() {
  const [startGame, setStartGame] = useState(false);

  return startGame ? (
    <div style={{ color: "white", textAlign: "center", marginTop: "50px" }}>
      <h1>🔓 Binary Lock Game Started</h1>
    </div>
  ) : (
    <RulesScreen rules={rulesText} onStart={() => setStartGame(true)} />
  );
}

export default BinaryLock;