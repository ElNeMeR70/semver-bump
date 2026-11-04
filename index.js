#!/usr/bin/env node
const [type, current] = process.argv.slice(2);
if (!type || !current || type === "-h" || type === "--help") {
  console.log("Usage: semver-bump <patch|minor|major> <current-version>");
  console.log("Example: semver-bump minor 1.2.3");
  process.exit(type ? 0 : 1);
}
const m = current.match(/^(\d+)\.(\d+)\.(\d+)(.*)$/);
if (!m) {
  console.error("Invalid semver format: " + current);
  process.exit(1);
}
let [_, maj, min, pat, pre] = m;
maj = parseInt(maj, 10);
min = parseInt(min, 10);
pat = parseInt(pat, 10);

if (type === "major") { maj++; min = 0; pat = 0; }
else if (type === "minor") { min++; pat = 0; }
else if (type === "patch") { pat++; }
else {
  console.error("Unknown bump type. Use 'patch', 'minor', or 'major'");
  process.exit(1);
}
console.log(`${maj}.${min}.${pat}`);
