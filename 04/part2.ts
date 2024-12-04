import { getInput } from "../lib";
const inputPath = `${import.meta.dir}/input.txt`;
const input = await getInput(inputPath);

const inputMatrix = input.split("\n").map((line) => line.split(""));

let X_MAS_count = 0;

for (const [i, line] of inputMatrix.entries()) {
  for (const [j, char] of line.entries()) {
    if (char !== "A") continue;
    if (isX_MAS(i, j, inputMatrix)) X_MAS_count++;
  }
}

function isX_MAS(i: number, j: number, matrix: string[][]) {
  const topLeft = matrix?.[i - 1]?.[j - 1];
  const topRight = matrix?.[i - 1]?.[j + 1];
  const bottomRight = matrix?.[i + 1]?.[j + 1];
  const bottomLeft = matrix?.[i + 1]?.[j - 1];

  const hasFirstMAS = isMAS(topLeft, bottomRight);
  const hasSecondMAS = isMAS(topRight, bottomLeft);

  return hasFirstMAS && hasSecondMAS;
}

function isMAS(first: string, second: string) {
  const MS = new Set(["M", "S"]);
  if (!MS.has(first)) return false;
  MS.delete(first);
  return MS.has(second);
}

console.log(X_MAS_count);
