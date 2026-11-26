// One Line, One Laugh: Roast Your Fridge — writes the entry line to /output/entry.txt.
// Deterministic: no time, randomness, network or environment input; same bytes every run.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "My fridge hums around the clock like it's guarding treasure, and it is: " +
  "three almost-empty condiments, a lime from another administration, and " +
  "half an onion it refuses to bury.";

const OUT = "/output/entry.txt";

// Gate: UTF-8 text of 1 to 200 characters, not only white space. Fail before writing.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry line out of gate range: ${LINE.length} characters`);
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, LINE, { encoding: "utf8" });

// Read back and verify the artifact on disk is exactly the entry line, byte for byte.
const written = readFileSync(OUT);
if (!written.equals(Buffer.from(LINE, "utf8"))) {
  throw new Error("verification failed: /output/entry.txt differs from the entry line");
}
