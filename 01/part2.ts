import { getInput } from "../lib";
const inputPath = `${import.meta.dir}/input.txt`;
const input = await getInput(inputPath);

const lines = input.split("\n");
const left = [];
const right = new Map();
for (const line of lines) {
  const [a, b] = line.split("   ").map(Number);
  left.push(a);
  right.set(b, (right.get(b) ?? 0) + 1);
}

let similarity = 0;
for (const num of left) {
  similarity += (right.get(num) ?? 0) * num;
}

console.log(similarity);
