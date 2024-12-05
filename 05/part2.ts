import { getInput } from "../lib";
const inputPath = `${import.meta.dir}/input.txt`;
const input = await getInput(inputPath);
import { generateRuleset, getArrayMiddle, parseInput } from "./part1";

function createReverseIndex<T>(array: T[]): Map<T, number> {
  const reverseIndex = new Map();
  for (const [i, el] of array.entries()) {
    reverseIndex.set(el, i);
  }
  return reverseIndex;
}

const lines = input.split("\n");
const { rules, updates } = parseInput(lines);
const ruleset = generateRuleset(rules);
const goodUpdateIndexes = new Set();

// Keep part 1 loop for removing good updates
nextUpdate: for (const [i, update] of updates.entries()) {
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
  goodUpdateIndexes.add(i);
}

// Actual part 2 main loop
const fixedUpdates = [];
const updatesToFix = updates.filter((_, i) => !goodUpdateIndexes.has(i));
nextUpdate: for (const update of updatesToFix) {
  const pageIndex = createReverseIndex(update);
  const seenPages = new Set();
  for (const [i, page] of update.entries()) {
    seenPages.add(page);
    if (!ruleset.has(page)) {
      continue;
    }
    const afterSet = ruleset.get(page) as Set<string>;
    const intersection = seenPages.intersection(afterSet);
    if (intersection.size === 0) {
      continue;
    }
    const precedingIndexes = [
      ...intersection
        .keys()
        .map((p) => pageIndex.get(p))
        .filter(Boolean),
    ] as number[];
    const furthestIndex = Math.max(...precedingIndexes, 0);
    updatesToFix.push(update.toSpliced(i, 1).toSpliced(furthestIndex, 0, page));
    continue nextUpdate;
  }
  fixedUpdates.push(update);
}

const sums = fixedUpdates.reduce((a, b) => a + Number(getArrayMiddle(b)), 0);

console.log(sums);
