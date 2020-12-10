const { input } = require("./input");

const getInput = (str) => str.split("\n").map(n => Number(n));

const getJoltDifferences = (input) => {
  const adapterList = getInput(input);
  const adapters = new Set(adapterList);
  const max = Math.max(...adapterList);
  const start = 0;

  let num1jolt = 0;
  let num3jolt = 0;
  let current = start;
  while (current < max) {
    if (adapters.has(current + 1)) {
      current = current + 1;
      num1jolt++;
      continue;
    }
    if (adapters.has(current + 2)) {
      current = current + 2;
      continue;
    }
    if (adapters.has(current + 3)) {
      current = current + 3;
      num3jolt++;
      continue;
    }
    throw new Error("can't go on from here");
  }
  return num1jolt * (num3jolt + 1);
}

const combinations = (start, adapters, memo, max) => {
  if (memo[start]) {
    return memo[start];
  }

  if (!adapters.has(start) && start !== 0) {
    return 0;
  }

  if (start === max) {
    return 1;
  }

  const result = combinations(start + 1, adapters, memo, max) + combinations(start + 2, adapters, memo, max) + combinations(start + 3, adapters, memo, max);
  memo[start] = result;
  return result;
}

const getNumCombinations = (str) => {
  const adapterList = getInput(str);
  const adapters = new Set(adapterList);
  const max = Math.max(...adapterList);
  const start = 0;

  const memo = {};

  return combinations(start, adapters, memo, max);
}

const part1 = getJoltDifferences(input);
const part2 = getNumCombinations(input);
