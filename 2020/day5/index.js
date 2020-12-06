const { input } = require("./input");

const getInput = (str) => {
  return str.split("\n");
};

const memoize = (fn) => {
  const cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache[key]) {
      return cache[key];
    }
    const result = fn(...args);
    cache[key] = result;
    return result;
  } 
}

const getRowNumber = (rows) => {
  const instructions = rows.split("");
  let rangeStart = 0;
  let rangeEnd = 127;
  for (let next of instructions) {
    const range = rangeEnd - rangeStart + 1;
    const nextAdjustment = range / 2;
    if (next === "F") {
      // change rangeEnd
      if (range === 2) {
        return rangeStart;
      } else {
        rangeEnd -= nextAdjustment;
        continue;
      }
    }
    if (next === "B") {
      // change rangeStart
      if (range === 2) {
        return rangeEnd;
      } else {
        rangeStart += nextAdjustment;
      }
    }
  }
}

const memoizedGetRowNumber = memoize(getRowNumber);

const getColumnNumber = (columns) => {
  const instructions = columns.split("");
  let rangeStart = 0;
  let rangeEnd = 7;
  for (let next of instructions) {
    const range = rangeEnd - rangeStart + 1;
    const nextAdjustment = range / 2;
    if (next === "L") {
      // change rangeEnd
      if (range === 2) {
        return rangeStart;
      } else {
        rangeEnd -= nextAdjustment;
        continue;
      }
    }
    if (next === "R") {
      // change rangeStart
      if (range === 2) {
        return rangeEnd;
      } else {
        rangeStart += nextAdjustment;
      }
    }
  }
}

const memoizedGetColumnNumber = memoize(getColumnNumber);

const getSeat = (str) => {
  const rows = str.substring(0, 7);
  const columns = str.substring(7);

  const rowNum = memoizedGetRowNumber(rows);
  const columnNum = memoizedGetColumnNumber(columns);
  const id = (rowNum * 8) + columnNum;

  return {
    row: rowNum,
    column: columnNum,
    id
  };
};

const getSeatsMaxId = (arr) => {
  return arr.reduce((max, currentStringSeat) => {
    const { id } = getSeat(currentStringSeat);
    return Math.max(max, id);
  }, 0);
};

const findSeatNum = (arr) => {
  const sorted = arr.map(getSeat).sort((a,b) => a.id - b.id);
  let prev = sorted[0].id;
  for (let i = 1; i < sorted.length; i++) {
    const next = sorted[i].id;
    if (next === prev + 2) {
      return prev + 1;
    }
    prev = next;
  }
}

const myInput = getInput(input);

const part1 = getSeatsMaxId(myInput);
const part2 = findSeatNum(myInput);
