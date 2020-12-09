const { input } = require("./input");

const getInputLines = (str) => str.split("\n");

const getKey = (i, val) => `${i}:${val}`;
const getInstruction = (str) => {
  const [cmd, strNum] = str.split(" ");
  const num = Number(strNum);
  return [cmd, num];
}

const valBeforeInfiniteLoop = (str) => {
  const instructions = getInputLines(str);
  const visited = {}
  let i = 0;
  let acc = 0;
  while (!visited[getKey(i, instructions[i])]) {
    const key = getKey(i, instructions[i]);
    const [cmd, num] = getInstruction(instructions[i]);
    visited[key] = true;

    switch(cmd) {
      case "nop":
        i++;
        continue;
      case "acc":
        acc += num;
        i++;
        continue;
      case "jmp":
        i += num;
        continue;
    }
  }
  return acc;
};

const instructionsComplete = (list, index) => {
  const visited = {};
  let i = index;
  let acc = 0;
  while (i < list.length) {
    let val = list[i];
    let key = getKey(i, val);

    if (visited[key]) {
      return false;
    }

    let [cmd, num] = getInstruction(val);
    visited[key] = true;

    switch(cmd) {
      case "nop":
        i++;
        continue;
      case "acc":
        acc += num;
        i++;
        continue;
      case "jmp":
        i += num;
        continue;
    }
  }

  return acc;
}

const valChangeOne = (str) => {
  const instructions = getInputLines(str);
  let i = 0;
  let acc = 0;

  while (i < instructions.length) {
    let [cmd, num] = getInstruction(instructions[i]);
    if (cmd === "jmp") {
      let resultSwitchedCompletes = instructionsComplete(instructions, i + 1);
      if (resultSwitchedCompletes !== false) {
        return acc + resultSwitchedCompletes;
      }
      i += num;
      continue;
    } else if (cmd === "nop") {
      let resultSwitchedCompletes = instructionsComplete(instructions, i + num);
      if (resultSwitchedCompletes !== false) {
        return acc + resultSwitchedCompletes;
      }
      i++;
      continue;
    }
    acc += num;
    i++;
  }

  return acc;
};

const part1 = valBeforeInfiniteLoop(input);
const part2 = valChangeOne(input);
