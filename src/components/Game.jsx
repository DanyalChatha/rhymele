import { useState } from "react";
import GuessRow from "./GuessRow";
import { pickPuzzle } from "../Utils/Wordbank";
import { rhymesWith } from "../Utils/RhymeChecker";

const MAX_GUESSES = 6;

export default function Game() {
  const [mode, setMode] = useState("free"); // "free" or "daily"
  const [puzzle, setPuzzle] = useState(() => pickPuzzle(mode));
  const [guesses, setGuesses] = useState([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("playing"); // "playing", "won", "lost"

  function submitGuess() {
    if (status !== "playing") return;
    const guess = input.trim().toLowerCase();
    if (!guess) return;
    if (!/^[a-z]+$/.test(guess)) {
      alert("Letters only, please.");
      return;
    }

    let feedback = "wrong";
    if (guess === puzzle.target) {
      feedback = "correct";
    } else if (
      guess.endsWith(puzzle.family) ||
      rhymesWith(guess, puzzle.target)
    ) {
      feedback = "rhyme";
    }

    const next = [...guesses, { word: guess, feedback }];
    setGuesses(next);
    setInput("");

    if (feedback === "correct") {
      setStatus("won");
    } else if (next.length >= MAX_GUESSES) {
      setStatus("lost");
    }
  }

  function reset(newMode = mode) {
    const nextPuzzle = pickPuzzle(newMode);
    setMode(newMode);
    setPuzzle(nextPuzzle);
    setGuesses([]);
    setInput("");
    setStatus("playing");
  }

  return (
    <div className="game">
      <div className="controls">
        <div className="modes">
          <button
            className={mode === "free" ? "active" : ""}
            onClick={() => reset("free")}
          >
            Free Play
          </button>
          <button
            className={mode === "daily" ? "active" : ""}
            onClick={() => reset("daily")}
          >
            Daily
          </button>
        </div>
        <button className="newgame" onClick={() => reset(mode)}>
          New Game
        </button>
      </div>

      <div className="hint">
        Hint word: <span className="hint-word">{puzzle.hint}</span>
      </div>

      <div className="board">
        {Array.from({ length: MAX_GUESSES }).map((_, i) => (
          <GuessRow key={i} guess={guesses[i]} />
        ))}
      </div>

      <div className="input-row">
        <input
          type="text"
          value={input}
          disabled={status !== "playing"}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submitGuess()}
          placeholder="Type your guess..."
          maxLength={16}
          autoFocus
        />
        <button onClick={submitGuess} disabled={status !== "playing"}>
          Guess
        </button>
      </div>

      <div className={`status ${status}`}>
        {status === "won" && (
          <>
            🎉 Nice! The word was <strong>{puzzle.target}</strong>.
          </>
        )}
        {status === "lost" && (
          <>
            😞 Out of guesses! The word was <strong>{puzzle.target}</strong>.
          </>
        )}
        {status === "playing" && (
          <span>Guesses left: {MAX_GUESSES - guesses.length}</span>
        )}
      </div>

      <p className="tip">
        Yellow = rhymes but not the target. Green = Correct. Gray = no rhyme.
      </p>
    </div>
  );
}
