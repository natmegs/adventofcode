const input = [0,8,15,2,12,1,4];

const getXth = (x) => (nums) => {
  const map = {
    [nums[0]]: {
      last: 1
    }
  };
  let lastSpoken = nums[0];

  for (let i = 1; i < x; i++) {
    if (i < nums.length) {
      let next = nums[i];
      map[next] = {
        last: i+1
      };
      lastSpoken = next;
      continue;
    }
    if (map[lastSpoken].secondLast) {
      lastSpoken = map[lastSpoken].last - map[lastSpoken].secondLast;
    } else if (map[lastSpoken].last) {
      lastSpoken = 0;
    }
    if (!map[lastSpoken]) {
      map[lastSpoken] = {
        last: i+1
      }
    } else {
      map[lastSpoken].secondLast = map[lastSpoken].last;
      map[lastSpoken].last = i+1;
    }
  }

  return lastSpoken;
};

const part1 = getXth(2020);

// This is clearly meant to be optimized in some way....
const part2 = getXth(30000000);
