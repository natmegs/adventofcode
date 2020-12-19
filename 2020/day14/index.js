const { input } = require("./input");

const getInputLines = (str) => str.split("\n");

const getMask = (str) => str.replace("mask = ", "");
const getNextVal = (str) => {
  const [indexStr, numStr] = str.split(" = ");
  const index = indexStr.substring(4, indexStr.length - 1);
  return [Number(index), Number(numStr)];
}
const applyMask = (val, mask) => {
  const paddedVal = val.padStart(mask.length, "0");
  let valArr = paddedVal.split("");
  const lastIndex = mask.length - 1;
  for (let i = lastIndex; i >= 0; i--) {
    if (mask[i] !== "X") {
      valArr[i] = mask[i];
    }
  }
  const result = valArr.join("");
  return result;
};

const getMemMap = (list) => {
  const map = {};
  let currentMask = getMask(list[0]);
  for (let i = 1; i < list.length; i++) {
    const next = list[i];
    if (next.startsWith("mask")) {
      currentMask = getMask(next);
    } else {
      const [index, val] = getNextVal(next);
      const binary = val.toString(2);
      const maskedVal = applyMask(binary, currentMask);
      map[index] = parseInt(maskedVal, 2);
    }
  }
  return map;
};

const getSum = (str) => {
  const list = getInputLines(str);
  const map = getMemMap(list);
  return Object.values(map).reduce((acc, curr) => {
    return acc + curr;
  }, 0);
}

const getAllPermutations = (length, list) => {
  list = list || [];
  if (length === 1) {
    return ["0", "1"];
  }
  const next = getAllPermutations(length-1, list);
  const result = [];
  next.forEach(l => {
    result.push(l+"0", l+"1");
  })
  return result;
};

const applyMaskV2 = (val, mask) => {
  const paddedVal = val.padStart(mask.length, "0");
  let valArr = paddedVal.split("");
  const lastIndex = mask.length - 1;
  const floatingIndexes = [];
  for (let i = lastIndex; i >= 0; i--) {
    if (mask[i] === "0") {
      continue;
    }
    if (mask[i] === "1") {
      valArr[i] = mask[i];
      continue;
    }
    if (mask[i] === "X") {
      floatingIndexes.push(i);
      continue;
    }
  }
  const permutations = getAllPermutations(floatingIndexes.length);
  const result = [];
  permutations.forEach((perm) => {
    let vals = [...valArr];
    for (let charIndex = 0; charIndex < perm.length; charIndex++) {
      const indexToUpdate = floatingIndexes[charIndex];
      vals[indexToUpdate] = perm[charIndex];
    }
    result.push(vals.join(""));
  });
  return result;
};

const getMemMapV2 = (list) => {
  const map = {};
  let currentMask = getMask(list[0]);

  for (let i = 1; i < list.length; i++) {
    const next = list[i];
    if (next.startsWith("mask")) {
      currentMask = getMask(next);
    } else {
      const [index, val] = getNextVal(next);
      const binaryIndex = index.toString(2);
      const maskedVals = applyMaskV2(binaryIndex, currentMask);
      maskedVals.forEach(i => {
        map[i] = val;
      });
    }
  }
  return map;
};

const getSumV2 = (str) => {
  const list = getInputLines(str);
  const map = getMemMapV2(list);
  return Object.values(map).reduce((acc, curr) => {
    return acc + curr;
  }, 0);
}

const part1 = getSum;
const part2 = getSumV2;
