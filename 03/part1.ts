import { getInput } from "../lib";
const inputPath = `${import.meta.dir}/input.txt`;
const input = await getInput(inputPath);

let sum = 0;

function mul(a: number, b: number) {
  sum += a * b;
}

const mulRegex = /mul\([0-9]{1,3},[0-9]{1,3}\)/g;

for (const [match] of input.matchAll(mulRegex)) {
  eval(match);
}

console.log(sum)
