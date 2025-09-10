export function rhymesWith(word, target) {
  const w = (word || "").toLowerCase();
  const t = (target || "").toLowerCase();
  // Fallback: share last 2 - 3 letters
  for (let len = 3; len >= 2; len--) {
    if (w.length >= len && t.length >= len && w.slice(-len) === t.slice(-len)) {
      return true;
    }
  }
  return false;
}
