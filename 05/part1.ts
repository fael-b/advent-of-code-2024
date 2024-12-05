import { getInput } from "../lib";
const inputPath = `${import.meta.dir}/input.txt`;
const input = await getInput(inputPath);

export function parseInput(lines: string[]) {
  let i = 0;
  while (i < lines.length) {
    if (lines[i].trim() === "") {
      return {
        rules: lines.slice(0, i).map(parseRule),
        updates: lines.slice(i + 1, lines.length).map(parseUpdate),
      };
    }
    i++;
  }
  return {
    rules: [],
    updates: [],
  };
}

export function parseRule(rawRule: string) {
  return rawRule.split("|") as [string, string];
}

export function parseUpdate(rawUpdate: string) {
  return rawUpdate.split(",");
}

export function generateRuleset(rules: [string, string][]) {
  const ruleset = new Map<string, Set<string>>();
  for (const [before, after] of rules) {
    if (ruleset.has(before)) {
      ruleset.get(before)?.add(after);
    } else {
      ruleset.set(before, new Set([after]));
    }
  }
  return ruleset;
}

export function getArrayMiddle<T>(arr: T[]) {
  return arr[Math.floor(arr.length / 2)];
}

const lines = input.split("\n");
const { rules, updates } = parseInput(lines);
const ruleset = generateRuleset(rules);
const goodUpdates = [];

nextUpdate: for (const update of updates) {
  const seenPages = new Set();
  for (const page of update) {
    seenPages.add(page);
    if (!ruleset.has(page)) {
      continue;
    }
    const afterSet = ruleset.get(page) as Set<string>;
    if (seenPages.intersection(afterSet).size > 0) {
      continue nextUpdate;
    }
  }
  goodUpdates.push(update);
}

const sums = goodUpdates.reduce((a, b) => a + Number(getArrayMiddle(b)), 0);

console.log(sums);
