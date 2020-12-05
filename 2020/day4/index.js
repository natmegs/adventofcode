const { input } = require("./input");

const splitLineSpaces = (line) => {
  return line.split(" ");
};

const flatten = (arr) => {
  return arr.reduce((flattened, current) => {
    if (Array.isArray(current)) {
      return [...flattened, ...flatten(current)];
    }
    return [...flattened, current];
  }, []);
}

const getPassport = (passport) => {
  const lines = passport.split("\n");
  return flatten(lines.map(splitLineSpaces)).reduce((obj, curr) => {
    const [key,value] = curr.split(":");
    obj[key] = value;
    return obj;
  }, {});
}

const getInputArray = (str) => {
  const passports = str.split("\n\n");
  return passports.map(getPassport);
};

const isValidDate = (upper, lower) => (date) => {
  try {
    const num = Number(date);
    return date.length === 4 && num >= lower && num <= upper;
  } catch(e) {
    return false;
  }
}

const expectedFields = [
  {
    key: "byr",
    valid: isValidDate(2002, 1920)
  },
  {
    key: "iyr",
    valid: isValidDate(2020, 2010)
  },
  {
    key: "eyr",
    valid: isValidDate(2030, 2020)
  },
  {
    key: "hgt",
    valid(k) {
      try {
        if (k.endsWith("cm")) {
          const num = Number(k.replace("cm",""));
          return num >= 150 && num <= 193;
        }
        if (k.endsWith("in")) {
          const num = Number(k.replace("in", ""));
          return num >= 59 && num <= 76;
        }
      } catch (e) {
        return false;
      }
      return false;
    }
  },
  {
    key: "hcl",
    valid(k) {
      const rgx = /^#[a-f0-9]{6}$/;
      return rgx.test(k);
    }
  },
  {
    key: "ecl",
    valid(k) {
      const valid = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
      return valid.includes(k);
    }
  },
  {
    key: "pid",
    valid(k) {
      const rgx = /^[0-9]{9}$/;
      return rgx.test(k);
    }
  }];

const isValid = (passport) => {
  for (let { key, valid } of expectedFields) {
    const passportVal = passport[key];
    if (!passportVal || !valid(passportVal)) {
      return false;
    }
  }
  return true;
}

const numValid = (passports) => {
  return passports.reduce((count, passport) => {
    return isValid(passport) ? ++count : count;
  }, 0);
};

const myInput = getInputArray(input);

numValid(myInput);
