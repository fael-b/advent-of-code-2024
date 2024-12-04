import { getInput } from "../lib";
const inputPath = `${import.meta.dir}/input.txt`;
const input = await getInput(inputPath);

let count = 0;
const lines: string[] = [];
const matrix = input.split("\n").map((line) => line.split(""));

// horizontal
for (const line of matrix) {
  lines.push(line.join(""));
  lines.push(line.toReversed().join(""));
}

// first diagonals
for (
  let diagonalIndex = 0;
  diagonalIndex < matrix.length * 2 - 1;
  diagonalIndex++
) {
  const diagonal = [];
  let i =
    diagonalIndex >= matrix.length ? 0 : matrix.length - diagonalIndex - 1;
  let j = diagonalIndex < matrix.length ? 0 : diagonalIndex - matrix.length + 1;
  while (matrix?.[i]?.[j]) {
    diagonal.push(matrix[i++][j++]);
  }
  lines.push(diagonal.join(""));
  lines.push(diagonal.toReversed().join(""));
}

// vertical
for (let i = 0; i < matrix.length; i++) {
  const column = [];
  for (let j = 0; j < matrix[i].length; j++) {
    column.push(matrix[j][i]);
  }
  lines.push(column.join(""));
  lines.push(column.toReversed().join(""));
}

// second diagonals
for (
  let diagonalIndex = 0;
  diagonalIndex < matrix.length * 2 - 1;
  diagonalIndex++
) {
  const diagonal = [];
  let i = diagonalIndex < matrix.length ? 0 : diagonalIndex - matrix.length + 1;
  let j = diagonalIndex < matrix.length ? diagonalIndex : matrix.length - 1;
  while (matrix?.[i]?.[j]) {
    diagonal.push(matrix[i++][j--]);
  }
  lines.push(diagonal.join(""));
  lines.push(diagonal.toReversed().join(""));
}

function countXMAS(line: string) {
  for (const _match of line.matchAll(/XMAS/g)) {
    count++;
  }
}

for (const line of lines) {
  countXMAS(line);
}

console.log(count);
