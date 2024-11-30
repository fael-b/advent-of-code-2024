import { cp, readdir } from "node:fs/promises";

const entries = await readdir(import.meta.dir);
const days = entries
  .filter((entry) => !entry.includes("."))
  .filter((folder) => folder.match(/^[0-9]{1,2}$/))
  .map(Number)
  .toSorted();
const previousDayNum = days.at(-1) ?? 0;
const todayNum = previousDayNum + 1;
const today = `${todayNum}`.padStart(2, "0");

// Copy template
await cp("./template", `./${today}`, {
  recursive: true,
});

// Update package.json scripts
const pkg = await Bun.file("./package.json").json();
pkg.scripts[`${today}-1`] = `bun run ./${today}/part1.ts`;
pkg.scripts[`${today}-2`] = `bun run ./${today}/part2.ts`;
await Bun.write("./package.json", JSON.stringify(pkg, null, 2));

console.log("Happy coding ! 🎄");
