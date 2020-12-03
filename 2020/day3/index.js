const { input } = require("./input");

const getSlopeMatrix = (str) => {
  const rows = str.split(/\r?\n/);
  return rows.map(r => r.trim().split("").map(square => square === "." ? 0 : 1));
};

const getTreesInPath = (slopeMatrix, incrementX, incrementY) => {
  const bottomRow = slopeMatrix.length - 1;
  const width = slopeMatrix[0].length;

  let currentPos = [0,0];
  let treeCount = 0;

  while (currentPos[1] < bottomRow) {
    const [x, y] = currentPos;
    const nextPos = [(x+incrementX)%width, y+incrementY];
    if (nextPos[1] <= bottomRow) {
      treeCount += slopeMatrix[nextPos[1]][nextPos[0]];
    }
    currentPos = nextPos;
  }

  return treeCount;
};

const getAllSlopes = (slopeMatrix) => {
  const r1d1 = getTreesInPath(slopeMatrix, 1, 1);
  const r3d1 = getTreesInPath(slopeMatrix, 3, 1);
  const r5d1 = getTreesInPath(slopeMatrix, 5, 1);
  const r7d1 = getTreesInPath(slopeMatrix, 7, 1);
  const r1d2 = getTreesInPath(slopeMatrix, 1, 2);

  return r1d1 * r3d1 * r5d1 * r7d1 * r1d2;
}

const slopeMatrix = getSlopeMatrix(input);
const part1 = getTreesInPath(slopeMatrix, 3, 1);
const part2 = getAllSlopes(slopeMatrix);
