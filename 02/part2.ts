import { getInput } from "../lib";
const inputPath = `${import.meta.dir}/input.txt`;
const input = await getInput(inputPath);

console.log(getSafeReportsCount(parseInput(input)));

function parseInput(input: string) {
  return input.split('\n')
    .map((line) => line.split(' ').map(Number));
}

function getSafeReportsCount(reports: number[][]) {
  let safeReportsCount = 0;
  nextReport: for (const report of reports) {
    if (isReportSafe(report)) {
      safeReportsCount++;
      continue
    }
    for (let i = 0; i < report.length; i++) {
      if (isReportSafe(report.toSpliced(i, 1))) {
        safeReportsCount++;
        continue nextReport;
      }
    }
  }

  return safeReportsCount;
}

function isReportSafe(report: number[]) {
  const slope = report[0] - report[report.length - 1];
  if (slope < 0) report.reverse(); // toujours la flemme

  const safeDiffs = new Set([-1, -2, -3]);
  for (let i = 1; i < report.length; i++) {
    const diff = report[i] - report[i - 1];
    safeDiffs.add(diff);
  }
  return safeDiffs.size === 3;
}
