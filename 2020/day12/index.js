const { input } = require("./input");

const getInputArr = (str) => str.split("\n");

const directions = {
  N: {
    turns: ["E", "S", "W"],
    forward: [0, 1]
  },
  E: {
    turns: ["S", "W", "N"],
    forward: [1, 0]
  },
  S: {
    turns: ["W", "N", "E"],
    forward: [0, -1]
  },
  W: {
    turns: ["N", "E", "S"],
    forward: [-1, 0]
  }
};

const getInstruction = (instruction) => {
  const dir = instruction[0];
  const num = Number(instruction.substring(1));
  return {
    dir,
    num
  };
};

const getNextPos = (x, y, direction, instruction) => {
  const { dir, num } = getInstruction(instruction);

  if (dir === "R") {
    const deg = (num / 90) - 1;
    const index = deg%3;
    const nextDir = directions[direction].turns[index];
    return { x, y, direction: nextDir };
  }
  if (dir === "L") {
    const deg = (num / 90) - 1;
    const index = (2-deg)%3;
    const nextDir = directions[direction].turns[index];
    return { x, y, direction: nextDir };
  }
  if (dir === "F") {
    const [incrementX, incrementY] = directions[direction].forward;
    return {
      x: x + (incrementX * num),
      y: y + (incrementY * num),
      direction
    }
  }

  const [incrementX, incrementY] = directions[dir].forward;
  return {
    x: x + (incrementX * num),
    y: y + (incrementY * num),
    direction
  }
};

const getManhattanDistance = (input) => {
  const list = getInputArr(input);
  let currX = 0;
  let currY = 0;
  let currDirection = "E";
  for (let next of list) {
    const { x, y, direction } = getNextPos(currX, currY, currDirection, next);
    currX = x;
    currY = y;
    currDirection = direction;
  }
  return Math.abs(currX) + Math.abs(currY);
}

const pivotFuncs = {
  R: ([x, y]) => ([y, -x]),
  L: ([x, y]) => ([-y, x]),
};
const pivotWaypoint = (x, y, num, dir) => {
  const deg = (num / 90);
  let currX = x;
  let currY = y;
  for (let i = 1; i <= deg; i++) {
    const [newX, newY] = pivotFuncs[dir]([currX, currY]);
    currX = newX;
    currY = newY;
  }
  return [currX, currY];
};

const getNewPosWithWaypoint = (x, y, instruction, waypointX, waypointY) => {
  const { dir, num } = getInstruction(instruction);
  if (dir === "F") {
    return {
      x: x + (waypointX * num),
      y: y + (waypointY * num),
    }
  }
  return {
    x,
    y
  }
}

const getNewWaypointPos = (waypointX, waypointY, instruction) => {
  const { dir, num } = getInstruction(instruction);

  if (dir === "R" || dir === "L") {
    const [wx, wy] = pivotWaypoint(waypointX, waypointY, num, dir);
    return { x: wx, y: wy };
  }
  if (dir === "F") {
    return {
      x: waypointX,
      y: waypointY,
    }
  }

  const [incrementX, incrementY] = directions[dir].forward;
  return {
    x: waypointX + (incrementX * num),
    y: waypointY + (incrementY * num),
  }
};

const getManhattanDistanceWithWaypoint = (input) => {
  const list = getInputArr(input);
  let currX = 0;
  let currY = 0;
  let currWX = 10;
  let currWY = 1;
  for (let next of list) {
    const { x, y } = getNewPosWithWaypoint(currX, currY, next, currWX, currWY);
    const { x: wx, y: wy } = getNewWaypointPos(currWX, currWY, next);
    currX = x;
    currY = y;
    currWX = wx;
    currWY = wy;
  }
  return Math.abs(currX) + Math.abs(currY);
}

const part1 = getManhattanDistance(input);
const part2 = getManhattanDistanceWithWaypoint(input);
