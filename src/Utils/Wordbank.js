export const RHYME_FAMILIES = {
  old: [
    "bold",
    "cold",
    "gold",
    "hold",
    "told",
    "sold",
    "mold",
    "fold",
    "scold",
  ],
  at: [
    "bat",
    "cat",
    "fat",
    "hat",
    "mat",
    "pat",
    "rat",
    "sat",
    "gnat",
    "that",
    "flat",
  ],
  ake: [
    "bake",
    "cake",
    "fake",
    "lake",
    "make",
    "rake",
    "sake",
    "take",
    "wake",
    "snake",
  ],
  ight: [
    "bright",
    "fight",
    "kite",
    "light",
    "might",
    "night",
    "right",
    "sight",
    "tight",
    "white",
  ],
  een: ["bean", "clean", "green", "lean", "mean", "queen", "seen", "screen"],
  ore: [
    "bore",
    "core",
    "door",
    "four",
    "gore",
    "more",
    "pour",
    "roar",
    "sore",
    "store",
  ],
  ay: [
    "bay",
    "clay",
    "day",
    "gray",
    "hay",
    "lay",
    "may",
    "pay",
    "play",
    "say",
    "spray",
    "stay",
    "tray",
    "way",
  ],
  eep: [
    "cheap",
    "creep",
    "deep",
    "keep",
    "peep",
    "sheep",
    "sleep",
    "sweep",
    "weep",
  ],
  ow: ["bow", "cow", "how", "now", "plow", "sow", "wow"],
  ing: [
    "bring",
    "cling",
    "king",
    "ring",
    "sing",
    "sling",
    "spring",
    "sting",
    "swing",
    "thing",
    "wing",
    "wring",
  ],
  bel: ["label", "babel", "nobel", "rebel", "barbel"],
};

// Deterministic number for today (UTC Midnight) so Daily puzzle is the same for everyone
function dayIndex() {
  const ms = new Date().setHours(0, 0, 0, 0); // ms at local midnight
  return Math.floor(ms / 86400000); // days since epoch
}

export function pickPuzzle(mode = "free") {
  const entries = Object.entries(RHYME_FAMILIES);
  const seed = mode === "daily" ? dayIndex() : Math.floor(Math.random() * 1e9);
  const famIdx = seed % entries.length;
  const [family, words] = entries[famIdx];
  const targetIdx = (seed + famIdx) % words.length;
  const target = words[targetIdx];
  const hint = words[(targetIdx + 1) % words.length] || target;
  return { family, words, target, hint };
}
