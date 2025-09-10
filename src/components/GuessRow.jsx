export default function GuessRow({ guess }) {
  const cls = guess
    ? {
        correct: "box green",
        rhyme: "box yellow",
        wrong: "box gray",
        none: "box",
      }[guess.feedback]
    : "box";
  return (
    <div className="row">
      <div className={cls}>{guess ? guess.word : ""}</div>
    </div>
  );
}
