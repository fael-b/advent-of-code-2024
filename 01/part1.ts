import { getInput } from "../lib";
const inputPath = `${import.meta.dir}/input1.txt`;
const input = await getInput(inputPath);

console.log(input.length);
