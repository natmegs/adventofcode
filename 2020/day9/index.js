const { input } = require("./input");

const getInputs = (str) => str.split("\n");

const getFirstInvalidIndex = (list) => {
  let prev25 = list.slice(0, 25);
  let values = new Set(prev25);
  for (let i = 25; i < list.length; i++) {
    let current = list[i];
    let foundMatch = false;
    for (let j = 0; j < 25; j++) {
      let el = prev25[j];
      let matching = current - el;
      if (values.has(matching)) {
        foundMatch = true;
        break;
      }
    }
    if (!foundMatch) {
      return i;
    }
    let old = prev25.shift();
    values.delete(old);
    values.add(current);
    prev25.push(current);
  }
  return null;
};

const getFirstInvalid = (str) => {
  const list = getInputs(str).map(n => Number(n));
  const index = getFirstInvalidIndex(list);
  return list[index];
}

const setAddingToInvalid = (str) => {
  const list = getInputs(str).map(n => Number(n));
  const index = getFirstInvalidIndex(list);
  const invalid = list[index];

  let trailingIndex = 0;
  let leadingIndex = 1;
  let current = list[0] + list[1];
  let max = Math.max(list[0], list[1]);

  while(leadingIndex < index) {
    if (current === invalid) {
      let min = list[trailingIndex];
      for (let i = trailingIndex; i <= leadingIndex; i++) {
        min = Math.min(min, list[i]);
      }
      return min + max;
    }
    if (current < invalid) {
      current += list[leadingIndex+1];
      max = Math.max(max, list[leadingIndex + 1]);
      leadingIndex++;
      continue;
    }
    current -= list[trailingIndex];
    trailingIndex++;
  }
  return null;
};

const part1 = getFirstInvalid(input);
const part2 = setAddingToInvalid(input);
