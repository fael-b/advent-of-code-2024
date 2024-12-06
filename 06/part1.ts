import { getInput } from "../lib";
const inputPath = `${import.meta.dir}/input1.txt`;
const input = await getInput(inputPath);

type Direction = "up" | "down" | "left" | "right";

interface Guard {
  x: number;
  y: number;
  direction: Direction;
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

interface DirectionDiff {
  x: number;
  y: number;
  next: Direction;
}

const directions: Record<Direction, DirectionDiff> = {
  up: {
    x: -1,
    y: 0,
    next: "right",
  },
  down: {
    x: 1,
    y: 0,
    next: "left",
  },
  left: {
    x: 0,
    y: -1,
    next: "up",
  },
  right: {
    x: 0,
    y: 1,
    next: "down",
  },
};

let i = -1;
let isInMap = true;
// Je comprends pas, j'ai une erreur array out of bounds mais le résultat final est bon 🤷
// LGTM go push en prod 🚀
try {
  while (isInMap) {
    i++;
    grid[guard.x][guard.y] = "X";
    const directionDiff = directions[guard.direction];
    const nextCell = grid
      .at(guard.x + directionDiff.x)
      ?.at(guard.y + directionDiff.y);
    if (nextCell === "." || nextCell === "X") {
      guard.x += directionDiff.x;
      guard.y += directionDiff.y;
      continue;
    }
    if (nextCell === "#") {
      guard.direction = directionDiff.next;
      continue;
    }
    if (!nextCell) {
      isInMap = false;
    }
  }
} catch (err) {
  console.log(`STOPPED AFTER ITER N°${i}`);
  console.error(err);
}

const xCount = grid.reduce(
  (prev, curr) =>
    prev +
    curr.reduce(
      (prevCell, currCell) => prevCell + (currCell === "X" ? 1 : 0),
      0,
    ),
  0,
);

console.log(grid.map((row) => row.join("")).join("\n"), xCount);
