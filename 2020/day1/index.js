const { input } = require("./input");

const getInputArray = (str) => {
  return str.split(/\r?\n/).map(num => Number(num));
};

// O(n)
const findSummingPairProduct = (arr) => {
  const cache = {};
  const sum = 2020;
  for (let i = 0; i < arr.length - 1; i++) {
    const num = arr[i];
    const pair = sum - num;
    if (cache[pair]) {
      return num * pair;
    }
    cache[num] = i;
  };
  return null;
};

// O(n^2)
const findSummingTripletProduct = (arr) => {
  const cache = {};
  const sum = 2020;
  for (let i = 0; i < arr.length - 2; i++){
    const numA = arr[i];
    cache[numA] = cache[numA] || i;
    for (let j = i; j < arr.length - 1; j++) {
      const numB = arr[j];
      const numC = sum - numA - numB;

      cache[numB] = cache[numB] || j;
      if (cache[numC] !== undefined) {
        return numA * numB * numC;
      }
    }
  }
  return null;
}

const inputArray = getInputArray(input);
findSummingPairProduct(inputArray);
findSummingTripletProduct(inputArray);
