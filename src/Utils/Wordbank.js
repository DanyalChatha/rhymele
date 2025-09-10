// Enhanced Wordbank with much larger word sets and API validation
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
    "behold",
    "unfold",
    "withhold",
    "foretold",
    "uphold",
    "retold",
    "untold",
    "manifold",
    "household",
    "threshold",
    "stronghold",
    "blindfold",
    "marigold",
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
    "chat",
    "spat",
    "brat",
    "scat",
    "vat",
    "format",
    "combat",
    "habitat",
    "acrobat",
    "diplomat",
    "thermostat",
    "democrat",
    "aristocrat",
    "bureaucrat",
    "autocrat",
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
    "brake",
    "stake",
    "shake",
    "flake",
    "quake",
    "drake",
    "awake",
    "mistake",
    "remake",
    "forsake",
    "handshake",
    "overtake",
    "undertake",
    "earthquake",
    "snowflake",
    "namesake",
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
    "bite",
    "cite",
    "quite",
    "spite",
    "write",
    "height",
    "flight",
    "fright",
    "knight",
    "slight",
    "blight",
    "delight",
    "insight",
    "invite",
    "ignite",
    "unite",
    "midnight",
    "daylight",
    "spotlight",
  ],
  een: [
    "bean",
    "clean",
    "green",
    "lean",
    "mean",
    "queen",
    "seen",
    "screen",
    "teen",
    "keen",
    "scene",
    "gene",
    "serene",
    "marine",
    "routine",
    "machine",
    "cuisine",
    "magazine",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ],
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
    "wore",
    "tore",
    "shore",
    "score",
    "before",
    "ignore",
    "adore",
    "explore",
    "restore",
    "encore",
    "galore",
    "offshore",
    "therefore",
    "furthermore",
    "carnivore",
    "herbivore",
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
    "ray",
    "gay",
    "jay",
    "prey",
    "they",
    "obey",
    "delay",
    "decay",
    "relay",
    "display",
    "array",
    "birthday",
    "holiday",
    "runway",
    "highway",
    "subway",
    "doorway",
    "pathway",
    "railway",
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
    "leap",
    "heap",
    "steep",
    "asleep",
    "upkeep",
    "housekeep",
    "oversleep",
    "upswept",
  ],
  ow: [
    "bow",
    "cow",
    "how",
    "now",
    "plow",
    "sow",
    "wow",
    "brow",
    "vow",
    "allow",
    "endow",
    "meow",
    "somehow",
    "anyhow",
    "eyebrow",
    "kowtow",
  ],
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
    "fling",
    "string",
    "offering",
    "morning",
    "evening",
    "nothing",
    "something",
    "anything",
    "everything",
    "wedding",
    "building",
    "feeling",
    "meaning",
    "beginning",
    "understanding",
  ],
  ame: [
    "came",
    "fame",
    "game",
    "name",
    "same",
    "tame",
    "blame",
    "flame",
    "frame",
    "shame",
    "claim",
    "acclaim",
    "defame",
    "nickname",
    "surname",
    "filename",
    "username",
    "mainframe",
  ],
  ice: [
    "dice",
    "mice",
    "nice",
    "rice",
    "vice",
    "price",
    "slice",
    "twice",
    "spice",
    "advice",
    "device",
    "notice",
    "office",
    "police",
    "service",
    "practice",
    "justice",
    "sacrifice",
  ],
  ound: [
    "bound",
    "found",
    "ground",
    "hound",
    "mound",
    "pound",
    "round",
    "sound",
    "wound",
    "around",
    "profound",
    "compound",
    "background",
    "playground",
    "underground",
    "surround",
  ],
  ack: [
    "back",
    "hack",
    "jack",
    "lack",
    "pack",
    "rack",
    "sack",
    "tack",
    "track",
    "crack",
    "black",
    "slack",
    "snack",
    "attack",
    "unpack",
    "feedback",
    "backpack",
    "soundtrack",
  ],
  ell: [
    "bell",
    "cell",
    "dell",
    "fell",
    "hell",
    "sell",
    "tell",
    "well",
    "yell",
    "shell",
    "spell",
    "smell",
    "dwell",
    "swell",
    "farewell",
    "doorbell",
    "seashell",
    "cartwheel",
  ],
};

// Word validation cache to avoid repeated API calls
const validationCache = new Map();

/**
 * Validates if a word exists in the dictionary using Free Dictionary API
 * @param {string} word - The word to validate
 * @returns {Promise<boolean>} - True if word exists, false otherwise
 */
export async function validateWord(word) {
  if (!word || typeof word !== "string") return false;

  const cleanWord = word.toLowerCase().trim();

  // Check cache first
  if (validationCache.has(cleanWord)) {
    return validationCache.get(cleanWord);
  }

  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${cleanWord}`
    );
    const isValid = response.ok;

    // Cache the result
    validationCache.set(cleanWord, isValid);

    return isValid;
  } catch (error) {
    console.warn("Dictionary API error:", error);
    // Fallback: allow common words if API fails
    return cleanWord.length >= 2 && /^[a-z]+$/.test(cleanWord);
  }
}

/**
 * Alternative validation using Merriam-Webster API (requires API key)
 * Sign up at: https://dictionaryapi.com/
 */
export async function validateWordMerriamWebster(word, apiKey) {
  if (!word || !apiKey) return false;

  const cleanWord = word.toLowerCase().trim();

  if (validationCache.has(cleanWord)) {
    return validationCache.get(cleanWord);
  }

  try {
    const response = await fetch(
      `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${cleanWord}?key=${apiKey}`
    );
    const data = await response.json();

    // Merriam-Webster returns an array of results or suggestions
    const isValid =
      Array.isArray(data) &&
      data.length > 0 &&
      typeof data[0] === "object" &&
      data[0].meta;

    validationCache.set(cleanWord, isValid);
    return isValid;
  } catch (error) {
    console.warn("Merriam-Webster API error:", error);
    return false;
  }
}

/**
 * Get all possible answers for a rhyme family
 * @param {string} family - The rhyme family key
 * @returns {string[]} - Array of valid answers
 */
export function getRhymeFamilyWords(family) {
  return RHYME_FAMILIES[family] || [];
}

/**
 * Get a random word from a specific rhyme family
 * @param {string} family - The rhyme family key
 * @returns {string} - Random word from the family
 */
export function getRandomWordFromFamily(family) {
  const words = getRhymeFamilyWords(family);
  return words[Math.floor(Math.random() * words.length)];
}

// Deterministic number for today (UTC Midnight) so Daily puzzle is the same for everyone
function dayIndex() {
  const ms = new Date().setHours(0, 0, 0, 0);
  return Math.floor(ms / 86400000);
}

export function pickPuzzle(mode = "free") {
  const entries = Object.entries(RHYME_FAMILIES);
  const seed = mode === "daily" ? dayIndex() : Math.floor(Math.random() * 1e9);
  const famIdx = seed % entries.length;
  const [family, words] = entries[famIdx];
  const targetIdx = (seed + famIdx) % words.length;
  const target = words[targetIdx];
  const hint = words[(targetIdx + 1) % words.length] || target;

  return {
    family,
    words,
    target,
    hint,
    // Include all possible valid answers for this family
    validAnswers: words,
  };
}

/**
 * Check if a guess is acceptable for the current puzzle
 * @param {string} guess - The user's guess
 * @param {object} puzzle - Current puzzle object
 * @returns {Promise<object>} - Result object with validation info
 */
export async function validateGuess(guess, puzzle) {
  const cleanGuess = guess.toLowerCase().trim();

  // Basic format validation
  if (!cleanGuess || !/^[a-z]+$/.test(cleanGuess)) {
    return {
      valid: false,
      reason: "Only letters allowed",
      feedback: "invalid",
    };
  }

  // Check if it's a real word
  const isRealWord = await validateWord(cleanGuess);
  if (!isRealWord) {
    return {
      valid: false,
      reason: "Not found in dictionary",
      feedback: "invalid",
    };
  }

  // Check if it's the target word
  if (cleanGuess === puzzle.target) {
    return {
      valid: true,
      reason: "Correct answer!",
      feedback: "correct",
    };
  }

  // Check if it rhymes (either in the family or passes rhyme check)
  const isInFamily = puzzle.words.includes(cleanGuess);
  const rhymesWithTarget =
    cleanGuess.endsWith(puzzle.family) ||
    sharesSimilarEnding(cleanGuess, puzzle.target);

  if (isInFamily || rhymesWithTarget) {
    return {
      valid: true,
      reason: "Rhymes but not the target",
      feedback: "rhyme",
    };
  }

  return {
    valid: true,
    reason: "Valid word but doesn't rhyme",
    feedback: "wrong",
  };
}

/**
 * Enhanced rhyme checking
 */
function sharesSimilarEnding(word1, word2) {
  const w1 = word1.toLowerCase();
  const w2 = word2.toLowerCase();

  // Check for shared endings of different lengths
  for (let len = 3; len >= 2; len--) {
    if (
      w1.length >= len &&
      w2.length >= len &&
      w1.slice(-len) === w2.slice(-len)
    ) {
      return true;
    }
  }
  return false;
}

// Export total word count for stats
export const TOTAL_WORDS = Object.values(RHYME_FAMILIES).reduce(
  (sum, words) => sum + words.length,
  0
);
export const TOTAL_FAMILIES = Object.keys(RHYME_FAMILIES).length;
