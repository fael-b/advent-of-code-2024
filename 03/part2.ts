import { getInput } from "../lib";
const inputPath = `${import.meta.dir}/input.txt`;
const input = await getInput(inputPath);

const evaluableInput = input
  .replaceAll("do()", "_do()")
  .replaceAll("don't()", "_dont()");

let sum = 0;
let enabled = true;

function mul(a: number, b: number) {
  if (enabled) sum += a * b;
}

function _do() {
  enabled = true;
}

function _dont() {
  enabled = false;
}

const mulRegex = /(mul\([0-9]{1,3},[0-9]{1,3}\)|_do\(\)|_dont\(\))/g;

for (const [match] of evaluableInput.matchAll(mulRegex)) {
  eval(match);
}

console.log(sum)
