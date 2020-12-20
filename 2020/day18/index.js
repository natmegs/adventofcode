const { input } = require("./input");

const initializeStack = (char) => {
  if (char === "(") {
    return [
      {
        val: 0,
        operation: "+"
      },
      {
        val: 0,
        operation: "+"
      }
    ];
  }

  return [{
    val: Number(char)
  }];
}

const findExpressionResult = (str) => {
  str = str.replace(/\s/g, "");
  let stack = initializeStack(str[0]);

  for (let i = 1; i < str.length; i++) {
    let cur = str[i];
    let curNum = Number(cur);
    let last = stack[stack.length - 1];

    if (cur === "(" || cur === ")") {
      if (cur === "(") {
        stack.push({
          val: 0,
          operation: "+"
        });
      } else if (cur === ")") {
        let endOfStack = stack.pop();
        let newLast = stack[stack.length - 1];
        switch(newLast.operation) {
          case "+":
            newLast.val += endOfStack.val;
            break;
          case "*":
            newLast.val *= endOfStack.val;
            break;
        }
      }
    } else if (Number.isNaN(curNum)) {
      last.operation = cur;
    } else {
      switch(last.operation) {
        case "+":
          last.val = last.val + curNum;
          break;
        case "*":
          last.val = last.val * curNum;
          break;
      }
    }
  }

  return stack.pop().val;
};

const getLineSums = (str) => {
  const lines = str.split("\n");

  return lines.reduce((sum, nextExpression) => {
    const next = findExpressionResult(nextExpression);
    return sum + next;
  }, 0);
}


const getFirstAddBlock = (str) => {
  const firstAddOperator = str.indexOf("+");
  if (firstAddOperator < 0) {
    return null;
  }
  let leftOperator = "";
  let leftExpStack = [];
  let rightOperator = "";
  let rightExpStack = [];
  let expStartIndex;
  let expEndIndex;

  for (let i = firstAddOperator - 1; i >= 0; i--) {
    if ((str[i] === "+" || str[i] === "*" || str[i] === "(") && !leftExpStack.length) {
      break;
    }
    leftOperator = str[i] + leftOperator;
    expStartIndex = i;
    if (str[i] === ")") {
      leftExpStack.push(")");
    } else if (str[i] === "(") {
      leftExpStack.pop();
      if (!leftExpStack.length) {
        break;
      }
    }
  }

  for (let i = firstAddOperator + 1; i < str.length; i++) {
    if ((str[i] === "+" || str[i] === "*" || str[i] === ")") && !rightExpStack.length) {
      break;
    }
    rightOperator += str[i];
    expEndIndex = i;
    if (str[i] === "(") {
      rightExpStack.push("(");
    } else if (str[i] === ")") {
      rightExpStack.pop();
      if (!rightExpStack.length) {
        break;
      }
    }
  }

  return {
    leftOperator,
    rightOperator,
    expStartIndex,
    expEndIndex
  }
}

const findSimpleExpressionResult = (str) => {
  let arr = str.replace(/\(|\)/g, "").split("*");
  let result = arr.reduce((product, curr) => {
    return product * Number(curr);
  }, 1);
  return result;
}

const evaluateExpressionWithPrecedence = (str) => {
  let current = str;

  while(current) {
    let block = getFirstAddBlock(current);
    if (!block) {
      return findSimpleExpressionResult(current);
    }
    let blockResult = evaluateExpressionWithPrecedence(block.leftOperator) + evaluateExpressionWithPrecedence(block.rightOperator);
    current = current.slice(0, block.expStartIndex) + blockResult + current.slice(block.expEndIndex + 1);
  }
}

const findExpressionResultWithPrecedence = (str) => {
  str = str.replace(/\s/g, "");
  return evaluateExpressionWithPrecedence(str);
};

const findSumWithPrecedence = (str) => {
  const lines = str.split("\n");

  return lines.reduce((sum, nextExpression) => {
    const next = findExpressionResultWithPrecedence(nextExpression);
    return sum + next;
  }, 0);
}

const part1 = getLineSums(input);
const part2 = findSumWithPrecedence(input);
