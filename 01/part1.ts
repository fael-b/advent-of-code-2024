import { getInput } from "../lib";
const inputPath = `${import.meta.dir}/input1.txt`;
const input = await getInput(inputPath);

const lines = input.split("\n");
const left = [];
const right = [];
for (const line of lines) {
  const [a, b] = line.split("   ");
  left.push(Number(a));
  right.push(Number(b));
}
left.sort();
right.sort();

let sum = 0;
for (let i = 0; i < left.length; i++) {
  const a = left[i];
  const b = right[i];
  sum += Math.abs(a - b);
}

console.log(sum);
