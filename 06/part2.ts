import { getInput } from "../lib";
import type { Direction, Guard } from "./part1";
import { directions, walkedPositions } from "./part1";
const inputPath = `${import.meta.dir}/input.txt`;
const input = await getInput(inputPath);

function atPosition(x: number, y: number) {
  return (a: Position) => a.x === x && a.y === y;
}

function printGridWithObstacles(
  obstacles: Position[],
  walkedPositions: Position[],
  line: Position[],
) {
  const res = [];
  for (let i = 0; i < grid.length; i++) {
    const row = [];
    for (let j = 0; j < grid[i].length; j++) {
      const hasObstacle = obstacles.some(atPosition(i, j));
      const hasBeenWalkedOn = walkedPositions.some(atPosition(i, j));
      const isInterceptLine = line.some(atPosition(i, j));
      if (isInterceptLine && hasObstacle) {
        row.push("🎯");
      } else if (isInterceptLine) {
        row.push("🦶");
      } else if (hasObstacle && hasBeenWalkedOn) {
        row.push("❌");
      } else if (hasObstacle) {
        row.push("📦");
      } else if (hasBeenWalkedOn) {
        row.push("👣");
      } else {
        row.push("🌑");
      }
    }
    res.push(row);
  }
  console.log(res.map((r) => r.join("")).join("\n"));
  console.log("\n\n");
}

function getLine(start: Position, direction: Direction) {
  const keys = [];
  const directionPosition = directions[direction];
  let x = start.x + directionPosition.x;
  let y = start.y + directionPosition.y;
  // const log = start.x === 4 && start.y === 6;
  while (grid?.[x]?.[y]) {
    const char = grid.at(x)?.at(y);
    if (char) {
      // if (log) console.log(char);
      keys.push(`${x},${y},${direction}`);
    }
    x += directionPosition.x;
    y += directionPosition.y;
  }

  return keys.map(parseKey);
}

function getLineChars(positions: Position[], direction: Direction) {
  const chars = [];
  for (const { x, y } of positions) {
    const key = `${x},${y},${direction}`;
    if (walkedPositions.has(key)) {
      chars.push("X");
      continue;
    }
    const char = grid.at(x)?.at(y);
    if (char === "X") {
      chars.push(".");
    }
    if (char) {
      chars.push(char);
    }
  }

  return chars;
}

function getSeenObstacleInLine(chars: string[]) {
  const match = /^[X.]*X#/.exec(chars.join(""))?.at(0);
  if (!match) return false;
  // console.log(match);
  return match.length;
  // return (chars.join("").match(/^[X.]*X#/)?.length ?? 0) > 0;
}

function parseKey(key: string) {
  const [x, y, direction] = key.split(",");
  return { x: Number(x), y: Number(y), direction };
}

export interface Position {
  x: number;
  y: number;
}

const grid = input.split("\n").map((row) => row.split(""));
const guard: Guard = {
  x: -1,
  y: -1,
  direction: "up",
};

// Find initial position
outer: for (const [i, row] of grid.entries()) {
  for (const [j, cell] of row.entries()) {
    if (cell === "^") {
      guard.x = i;
      guard.y = j;
      break outer;
    }
  }
}

const everyObstaclePosition: Position[] = [];
const everyPotentialObstaclePosition = new Set<string>();
const walkedCells = new Set<string>();
let count = 0;

// starting position
everyPotentialObstaclePosition.add(`${guard.x},${guard.y}`);

let isInMap = true;
try {
  while (isInMap) {
    walkedCells.add(`${guard.x},${guard.y}`);

    grid[guard.x][guard.y] = "X";
    const directionDiff = directions[guard.direction];
    const nextX = guard.x + directionDiff.x;
    const nextY = guard.y + directionDiff.y;
    const nextCell = grid?.[nextX]?.[nextY];
    if (!nextCell) {
      isInMap = false;
    }
    const nextPos: Position = { x: nextX, y: nextY };
    if (nextCell === "#") {
      everyObstaclePosition.push(nextPos);
      guard.direction = directionDiff.next;
      continue;
    }

    const nextPotentialDirection = directionDiff.next;
    const nextPotentialLine = getLine(guard, nextPotentialDirection);
    const nextPotentialLineChars = getLineChars(
      nextPotentialLine,
      nextPotentialDirection,
    );
    const loopableObstacleDistance = getSeenObstacleInLine(
      nextPotentialLineChars,
    );
    if (loopableObstacleDistance !== false) {
      count++;
      // const loopableObstaclePosition = {
      //   x: guard.x + nextPotentialDirection.x * loopableObstacleDistance,
      //   y: guard.y + nextPotentialDirection.y * loopableObstacleDistance,
      // };
      // const key = `${loopableObstaclePosition.x},${loopableObstaclePosition.y}`;
      // everyPotentialObstaclePosition.add(key);
      // printGridWithObstacles(
      //   [...everyObstaclePosition, nextPos],
      //   // [...lastThreeObstaclePositions.values(), potentialObstaclePosition],
      //   Array.from(walkedCells)
      //     .concat(`${nextX},${nextY}`)
      //     .map(parseKey),
      //   nextPotentialLine,
      // );
    }

    if (nextCell === "." || nextCell === "X") {
      guard.x += directionDiff.x;
      guard.y += directionDiff.y;
    }
  }
} catch (err) {
  console.error(err);
}

// console.log(everyPotentialObstaclePosition.size - 1);
console.log(count);
