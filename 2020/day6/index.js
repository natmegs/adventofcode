const { input } = require("./input");

const getGroupedInput = (str) => {
  return str.split("\n\n");
};

const splitGroup = (group) => {
  return group.split("\n");
}

const numYesInGroup = (group) => {
  const set = new Set();
  for (let person of group) {
    for (let char of person) {
      set.add(char);
    }
  }
  return set.size;
}

const sumOfYes = (groups) => {
  return groups.reduce((count, group) => {
    const numYes = numYesInGroup(splitGroup(group));
    return count + numYes;
  }, 0);
}

const numUnanimousYes = (group) => {
  if (group.length === 1) {
    return group[0].length;
  }
  const map = {};
  for (let person of group) {
    for (let char of person) {
      map[char] = map[char] || 0;
      map[char]++;
    }
  }
  return Object.values(map).filter(v => v === group.length).length;
}

const sumOfUnanimousYes = (groups) => {
  return groups.reduce((count, group) => {
    const numYes = numUnanimousYes(splitGroup(group));
    return count + numYes;
  }, 0);
}

const groupsInput = getGroupedInput(input);

const part1 = sumOfYes(groupsInput);
const part2 = sumOfUnanimousYes(groupsInput);
