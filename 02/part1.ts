import { getInput } from "../lib";
const inputPath = `${import.meta.dir}/input1.txt`;
const input = await getInput(inputPath);

let safeReportsCount = 0;
for (const line of input.split('\n')) {
  const levels = line.split(' ').map(Number);
  const increasing = levels[0] < levels[levels.length - 1];
  if (!increasing) levels.reverse(); // flemme
  let isLevelSafe = true;
  for (let i = 1; i < levels.length; i++) {
    const previous = levels[i - 1];
    const current = levels[i];
    if (!isInBounds(previous, current)) isLevelSafe = false;
  }
  if (isLevelSafe) safeReportsCount++;
}

function isInBounds(previous: number, current: number) {
  return current >= previous + 1 && current <= previous + 3;
}

console.log(safeReportsCount);
