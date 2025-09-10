import { useState } from "react";
import GuessRow from "./GuessRow";
import {
  pickPuzzle,
  validateGuess,
  TOTAL_WORDS,
  TOTAL_FAMILIES,
} from "../Utils/Wordbank";

const MAX_GUESSES = 6;

export default function Game() {
  const [mode, setMode] = useState("free"); // "free", "daily", or "unlimited"
  const [puzzle, setPuzzle] = useState(() => pickPuzzle(mode));
  const [guesses, setGuesses] = useState([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("playing"); // "playing", "won", "lost"
  const [isValidating, setIsValidating] = useState(false);
  const [lastError, setLastError] = useState("");

  // Determine if we should show limited rows or unlimited scrolling
  const isUnlimitedMode = mode === "unlimited";
  const maxGuessesForMode = isUnlimitedMode
    ? Math.max(MAX_GUESSES, guesses.length + 1)
    : MAX_GUESSES;

  async function submitGuess() {
    if (status !== "playing" || isValidating) return;

    const guess = input.trim().toLowerCase();
    if (!guess) return;

    setIsValidating(true);
    setLastError("");

    try {
      const validation = await validateGuess(guess, puzzle);

      if (!validation.valid) {
        setLastError(validation.reason);
        setIsValidating(false);
        return;
      }

      const next = [...guesses, { word: guess, feedback: validation.feedback }];
      setGuesses(next);
      setInput("");

      if (validation.feedback === "correct") {
        setStatus("won");
      } else if (!isUnlimitedMode && next.length >= MAX_GUESSES) {
        setStatus("lost");
      }
      // In unlimited mode, we never set status to "lost"
    } catch (error) {
      console.error("Validation error:", error);
      setLastError("Unable to validate word. Please try again.");
    }

    setIsValidating(false);
  }

  function reset(newMode = mode) {
    const nextPuzzle = pickPuzzle(newMode);
    setMode(newMode);
    setPuzzle(nextPuzzle);
    setGuesses([]);
    setInput("");
    setStatus("playing");
    setLastError("");
    setIsValidating(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      submitGuess();
    } else if (e.key === "Escape") {
      setLastError("");
    }
  }

  return (
    <div className="game">
      <div className="controls">
        <div className="modes">
          <button
            className={mode === "free" ? "active" : ""}
            onClick={() => reset("free")}
            disabled={isValidating}
          >
            Free Play
          </button>
          <button
            className={mode === "daily" ? "active" : ""}
            onClick={() => reset("daily")}
            disabled={isValidating}
          >
            Daily
          </button>
          <button
            className={mode === "unlimited" ? "active" : ""}
            onClick={() => reset("unlimited")}
            disabled={isValidating}
          >
            Unlimited
          </button>
        </div>
        <button
          className="newgame"
          onClick={() => reset(mode)}
          disabled={isValidating}
        >
          New Game
        </button>
      </div>

      <div className="hint">
        Hint word: <span className="hint-word">{puzzle.hint}</span>
        <div className="word-stats">
          Dictionary has {TOTAL_WORDS.toLocaleString()} words across{" "}
          {TOTAL_FAMILIES} rhyme families
          {isUnlimitedMode && " • Unlimited tries!"}
        </div>
      </div>

      <div
        className={`board ${
          isUnlimitedMode && guesses.length > MAX_GUESSES
            ? "unlimited-board"
            : ""
        }`}
      >
        {Array.from({ length: maxGuessesForMode }).map((_, i) => (
          <GuessRow key={i} guess={guesses[i]} />
        ))}
      </div>

      <div className="input-row">
        <input
          type="text"
          value={input}
          disabled={status !== "playing" || isValidating}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            isValidating ? "Checking dictionary..." : "Type your guess..."
          }
          maxLength={20}
          autoFocus
        />
        <button
          onClick={submitGuess}
          disabled={status !== "playing" || isValidating || !input.trim()}
        >
          {isValidating ? "..." : "Guess"}
        </button>
      </div>

      {/* Error display */}
      {lastError && <div className="error-message">⚠️ {lastError}</div>}

      <div className={`status ${status}`}>
        {status === "won" && (
          <>
            🎉 Excellent! The word was <strong>{puzzle.target}</strong>.
            {isUnlimitedMode && (
              <div style={{ marginTop: "8px", fontSize: "14px", opacity: 0.8 }}>
                Solved in {guesses.length}{" "}
                {guesses.length === 1 ? "try" : "tries"}!
              </div>
            )}
            <div className="possible-answers">
              Other valid answers:{" "}
              {puzzle.validAnswers
                .filter((w) => w !== puzzle.target)
                .slice(0, 5)
                .join(", ")}
              {puzzle.validAnswers.length > 6 && " and more..."}
            </div>
          </>
        )}
        {status === "lost" && (
          <>
            😞 Out of guesses! The word was <strong>{puzzle.target}</strong>.
            <div className="possible-answers">
              Valid answers included:{" "}
              {puzzle.validAnswers.slice(0, 5).join(", ")}
              {puzzle.validAnswers.length > 5 &&
                ` and ${puzzle.validAnswers.length - 5} more`}
            </div>
          </>
        )}
        {status === "playing" && (
          <span>
            {isUnlimitedMode
              ? `Guesses made: ${guesses.length}`
              : `Guesses left: ${MAX_GUESSES - guesses.length}`}
          </span>
        )}
      </div>

      <div className="tips">
        <p className="tip">
          Yellow = rhymes but not the target. Green = Correct. Gray = no rhyme.
        </p>
        <p className="tip">
          {isUnlimitedMode
            ? "Unlimited mode: Keep guessing until you find the answer!"
            : "Only real dictionary words are accepted. API validates each guess."}
        </p>
      </div>
    </div>
  );
}
