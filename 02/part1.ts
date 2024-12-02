import { getInput } from "../lib";
const inputPath = `${import.meta.dir}/input.txt`;
const input = await getInput(inputPath);

let safeReportsCount = 0;
for (const line of input.split('\n')) {
  const levels = line.split(' ').map(Number);
  const increasing = levels[0] < levels[levels.length - 1];
  if (!increasing) levels.reverse(); // flemme
  let isReportSafe = true;
  for (let i = 1; i < levels.length; i++) {
    const previous = levels[i - 1];
    const current = levels[i];
    if (!isInBounds(previous, current)) isReportSafe = false;
  }
  if (isReportSafe) safeReportsCount++;
}

function isInBounds(previous: number, current: number) {
  return current >= previous + 1 && current <= previous + 3;
}

console.log(safeReportsCount);
