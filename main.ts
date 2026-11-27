import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const MOTTO: string =
  "I never sleep, I never forget — and I still need you to rephrase the question.";

// Validate the motto before writing: at most 200 characters, a single
// line with no trailing newline, and not only whitespace.
if (MOTTO.length > 200) {
  console.error(
    `error: motto is ${MOTTO.length} characters, exceeding the 200-character limit`,
  );
  process.exit(1);
}
if (MOTTO.length === 0 || MOTTO.trim().length === 0) {
  console.error("error: motto is empty or only whitespace");
  process.exit(1);
}
if (MOTTO.includes("\n") || MOTTO.includes("\r")) {
  console.error("error: motto must be a single line with no newline characters");
  process.exit(1);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", MOTTO, "utf8");

// Read the file back and verify it is byte-identical to the motto.
const written: string = readFileSync("/output/entry.txt", "utf8");
if (written !== MOTTO) {
  console.error(
    "error: /output/entry.txt does not match the motto byte-for-byte",
  );
  process.exit(1);
}
