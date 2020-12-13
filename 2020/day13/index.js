const { input } = require("./input");

const parseInput = (str) => {
  const [leave, busList] = str.split("\n");
  const busIds = busList.split(",").filter(b => b !== "x").map(b => Number(b));
  const earliestLeaveTime = Number(leave);
  return { busIds, earliestLeaveTime };
}

const parseInputPreserveX = (str) => {
  const [leave, busList] = str.split("\n");
  const busIds = busList.split(",").map(b => b === "x" ? b : Number(b));
  const earliestLeaveTime = Number(leave);
  return { busIds, earliestLeaveTime };
}

const getEarliestBus = (str) => {
  const { busIds, earliestLeaveTime } = parseInput(str);
  const { waitTime, busId } = busIds.reduce((earliest, current) => {
    const busId = current;
    const waitTime = busId - earliestLeaveTime%busId;
    if (earliest === null) {
      return {
        busId,
        waitTime
      }
    }
    const currentShortestWait = earliest.waitTime;
    if (waitTime < currentShortestWait) {
      return {
        busId,
        waitTime
      };
    }
    return earliest;
  }, null);
  return waitTime * busId;
};

// Lol this doesn't work. Way too slow. Did not feel like trying to intuit the chinese remainder theorem
const getEarliestTimestamp = (str) => {
  const { busIds } = parseInputPreserveX(str);
  const increment = busIds[0];
  const filteredBusIds = busIds.reduce((list, bus, i) => {
    if (bus !== "x") {
      list.push({ id: bus, index: i });
    }
    return list;
  }, []);
  let sequence = true;
  let timestamp;
  let currStartingT = 0;
  while (timestamp == undefined) {
    for (let nextBus of filteredBusIds) {
      let {id: next, index} = nextBus;
      if (next === "x") {
        continue;
      }
      let currT = currStartingT + index;
      if (currT%next !== 0) {
        sequence = false;
        break;
      }
    }
    if (sequence) {
      timestamp = currStartingT;
    }
    sequence = true;
    currStartingT += increment;
  }
  return timestamp;
}

const part1 = getEarliestBus(input)
const part2 = getEarliestTimestamp(input)
