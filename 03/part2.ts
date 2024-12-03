import { getInput } from "../lib";
const inputPath = `${import.meta.dir}/input.txt`;
const input = await getInput(inputPath);

let sum = 0;
let enabled = true;

function mul(a: number, b: number) {
  sum += a * b;
}

const mulRegex = /(mul\([0-9]{1,3},[0-9]{1,3}\)|do\(\)|don't\(\))/g;

for (const [match] of input.matchAll(mulRegex)) {
  switch (match) {
    case "do()":
      enabled = true;
      break;
    case "don't()":
      enabled = false;
      break;
    default:
      if (enabled) eval(match);
  }
}

console.log(sum)
