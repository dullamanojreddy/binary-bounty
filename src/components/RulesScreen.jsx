import { useEffect, useState } from "react";
import "./rules.css";

function RulesScreen({ rules, onStart }) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  // typing effect
  useEffect(() => {
    if (index < rules.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + rules[index]);
        setIndex(index + 1);
      }, 20);
      return () => clearTimeout(timeout);
    }
  }, [index, rules]);

  // auto start after 30 sec
  useEffect(() => {
    const timer = setTimeout(() => {
      onStart();
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="rules-container">
      <div className="overlay">
        <h1>MISSION BRIEF</h1>
        <p className="rules-text">{displayedText}</p>

        <button className="start-btn" onClick={onStart}>
          START
        </button>
      </div>
    </div>
  );
}

export default RulesScreen;