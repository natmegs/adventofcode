const { input } = require("./input");

const getRuleLines = (str) => str.split("\n");

const getRule = (ruleStr) => {
  const [outer, canContain] = ruleStr.split(" contain ");
  const outerColour = outer.replace(" bags", "");
  if (canContain === "no other bags.") {
    return {
      colour: outerColour,
      contains: []
    };
  }
  const listContains = canContain.replace(".", "").split(", ");
  const formattedContains = listContains.map(type => {
    const numMatch = type.match(/^\d+/);
    if (numMatch) {
      const num = numMatch[0];
      const rest = type.replace(`${num} `, "");
      const colour = rest.replace(" bags", "").replace(" bag", "");
      return {
        num: Number(num),
        colour
      }
    } else {
      throw new Error(type)
    }
  });

  return {
    colour: outerColour,
    contains: formattedContains
  };
}

const getRules = (str) => getRuleLines(str).map(getRule);

const numCanContain = (str, selectedColour) => {
  const rules = getRules(str);
  const map = {};
  rules.forEach(rule => {
    const { colour, contains } = rule;
    contains.forEach((containsItem) => {
      map[containsItem.colour] = map[containsItem.colour] || {
        items: new Set(),
        isVisited: false
      };
      map[containsItem.colour].items.add(colour);
    });
  });
  if (!map[selectedColour] && !map[seletedColour].items && !map[selectedColour].items.size) {
    return 0;
  }
  let queue = [...Array.from(map[selectedColour].items)];
  let canContain = new Set();
  while (queue.length) {
    let next = queue.shift();
    canContain.add(next);
    if (map[next]) {
      map[next].items.forEach(clr => {
        queue.push(clr);
      });
    }
  }
  return canContain.size;
}

const getNumBags = (map, selectedColour, memo) => {
  memo = memo || {};

  if (memo[selectedColour]) {
    return memo[selectedColour];
  }

  let queue = [...map[selectedColour]];
  let count = 1;
  while(queue.length) {
    let next = queue.shift();
    const bagsForNext = getNumBags(map, next.colour, memo);
    count += (next.num * bagsForNext);
  }
  memo[selectedColour] = count;
  return count;
};

const getNumBagsInBag = (str, selectedColour) => {
  const ruleMap = getRules(str).reduce((map, rule) => {
    const { colour, contains } = rule;
    map[colour] = contains;
    return map;
  }, {});
  return getNumBags(ruleMap, selectedColour) - 1;
};

const part1 = numCanContain(input, "shiny gold");
const part2 = getNumBagsInBag(input, "shiny gold");
