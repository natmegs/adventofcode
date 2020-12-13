const { input } = require("./input");

const getInputRows = (str) => str.split("\n");

const OCCUPIED = "#";
const FLOOR = ".";
const EMPTY = "L";

const numOccupiedAdjacent = (matrix, row, col) => {
  const rows = matrix.length;
  const columns = matrix[0].length;
  let numOccupied = 0;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) {
        continue;
      }
      const compareRow = row+i;
      const compareCol = col+j;
      if (
        compareRow >=0 && 
        compareCol >= 0 && 
        compareRow < rows &&
        compareCol < columns &&
        matrix[compareRow][compareCol] === OCCUPIED
      ) {
        numOccupied++;
      }
    }
  }

  return numOccupied;
};

const getVisibleInDirection = (matrix, row, col, i, j, cache) => {
  const memo = cache || {};

  const key = `${row}${col}${i}${j}`;

  if (memo[key] !== undefined) {
    return memo[key];
  }

  const rows = matrix.length;
  const columns = matrix[0].length;
  const compareRow = row+i;
  const compareCol = col+j;
  if (
    compareRow >= 0 && 
    compareCol >= 0 && 
    compareRow < rows &&
    compareCol < columns
  ) {
    const next = matrix[compareRow][compareCol];
    if (next === OCCUPIED) {
      memo[key] = 1;
      return 1;
    }

    if (next === EMPTY) {
      memo[key] = 0;
      return 0;
    }
    const result = getVisibleInDirection(matrix, row+i, col+j, i, j, memo);
    memo[key] = result;
    return result;
  }

  return 0;
} 

const numOccupiedVisible = (matrix, row, col) => {
  let numOccupied = 0;
  const cache = {}

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) {
        continue;
      }
      const visibleInDirection = getVisibleInDirection(matrix, row, col, i, j, cache);
      numOccupied += visibleInDirection;
      if (numOccupied >= 5) {
        return numOccupied
      }
    }
  }

  return numOccupied;
};

const getRound = (matrix, type) => {
  const rows = matrix.length;
  const columns = matrix[0].length;
  const updatedMatrix = [];

  for (let i = 0; i < rows; i++) {
    updatedMatrix.push("");
  }

  let numChanges = 0;
  let occupied = 0;

  const condition = type === "visible" ? numOccupiedVisible : numOccupiedAdjacent;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const val = matrix[row][col];
      switch(val) {
        case OCCUPIED:
          if (condition(matrix, row, col) >= 5) {
            updatedMatrix[row] += EMPTY;
            numChanges++;
          } else {
            updatedMatrix[row] += OCCUPIED;
            occupied++;
          }
          break;
        case EMPTY:
          if (condition(matrix, row, col) === 0) {
            updatedMatrix[row] += OCCUPIED;
            occupied++;
            numChanges++;
          } else {
            updatedMatrix[row] += EMPTY;
          }
          break;
        case FLOOR:
          updatedMatrix[row] += FLOOR;
          break;
      }
    }
  }

  return { numChanges, occupied, matrix: updatedMatrix };
};

const findTotalOccupied = (input, type) => {
  const floorPlan = getInputRows(input);
  let numChanges = Number.MAX_SAFE_INTEGER;
  let occupied = 0;
  let matrix = floorPlan;

  while(numChanges > 0) {
    const result = getRound(matrix, type);
    numChanges = result.numChanges;
    occupied = result.occupied;
    matrix = result.matrix;
  }

  return occupied;
};

const part1 = findTotalOccupied(input);
const part2 = findTotalOccupied(input, "visible");
