const { input } = require("./input");

const getInputArray = (str) => {
  return str.split(/\r?\n/).map(combination => {
    const [policyDef, letterDef, pwd] = combination.trim().split(" ");
    const policy = policyDef.split("-").map(n => Number(n));
    const letter = letterDef.replace(":", "");
    return {
      policy,
      letter,
      pwd
    };
  });
};

const isValidPwd = (entry) => {
  const { policy, letter, pwd } = entry;
  const [numLow, numHigh] = policy;
  let letterCount = 0;
  for (let char of pwd) {
    if (char === letter) {
      letterCount++;
    }
    if (letterCount > numHigh) {
      return false;
    }
  }
  if (letterCount < numLow) {
    return false;
  }
  return true;
};

const getNumValid = (arr) => {
  let total = 0;
  arr.forEach(entry => {
    if (isValidPwd(entry)) {
      total++;
    }
  });
  return total;
};

const isValidPwdV2 = (entry) => {
  const { policy, letter, pwd } = entry;
  const [firstIndex, secondIndex] = policy;
  const charAtFirst = pwd[firstIndex-1];
  const charAtSecond = pwd[secondIndex-1];
  if (charAtFirst === letter && charAtSecond === letter) {
    return false;
  }
  if (charAtFirst === letter || charAtSecond === letter) {
    return true;
  }
  return false;
};

const getNumValidV2 = (arr) => {
  let total = 0;
  arr.forEach(entry => {
    if (isValidPwdV2(entry)) {
      total++;
    }
  });
  return total;
}

const inputArray = getInputArray(input);
const part1 = getNumValid(inputArray);
const part2 = getNumValidV2(inputArray);
