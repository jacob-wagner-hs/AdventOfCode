const fs = require("fs");

const getInput = (inputFile) => {
  const fileContent = fs.readFileSync(inputFile);
  const inputData = fileContent.toString().split("\n");
  return inputData;
};

const data = getInput("input.txt");

const symbols = {
  "*": "*",
  "=": "=",
  "-": "-",
  "/": "/",
  "+": "+",
  "&": "&",
  "%": "%",
  "#": "#",
  "@": "@",
  $: "$",
};

const isSymbol = (value) => !!symbols[value];

const lookForward = (row, x) => row.slice(x).match(/(?<!\.|\d)\d+/);
const lookBackward = (row, x) => {
  const leadingMatches = row
    .slice(0, x + 1)
    .matchAll(/\d+[\*|=|-|\/|\+|\&|%|#|\@|\$]/g);

  const numsBeforeSymbols = [...leadingMatches];
  if (numsBeforeSymbols.length < 1) {
    return null;
  }

  const lastNumBeforeSymbolWithSymbol = numsBeforeSymbols.at(-1)[0];
  return lastNumBeforeSymbolWithSymbol.slice(
    0,
    lastNumBeforeSymbolWithSymbol.length - 1
  );
};

const lookAboveOrBelow = (x, y, direction) => {
  const yToSearch = direction === "above" ? data[y - 1] : data[y + 1];
  if (yToSearch < 0 || yToSearch >= data.length) {
    return null;
  }

  const adjacentNumbers = [];

  const left = yToSearch[x - 1].match(/\d/);
  if (left) {
    for (let i = x - 1; i >= -1; i--) {
      if (yToSearch[i] === "." || !yToSearch[i]) {
        const xToUse = !yToSearch[i] ? 0 : i;
        adjacentNumbers.push(yToSearch.slice(xToUse).match(/\d+/));
        break;
      }
    }
  }
  const center = yToSearch[x].match(/\d/);
  if (center && !left) {
    adjacentNumbers.push(yToSearch.slice(x).match(/\d+/));
  }
  const right = yToSearch[x + 1].match(/\d/);
  if (right && !center) {
    adjacentNumbers.push(yToSearch.slice(x + 1).match(/\d+/));
  }
  return adjacentNumbers;
};

const findAdjacentNumbers = (x, y) => {
  const right = lookForward(data[y], x);
  const left = lookBackward(data[y], x);
  const above = lookAboveOrBelow(x, y, "above");
  const below = lookAboveOrBelow(x, y, "below");

  const neighbours = [right, left, ...above, ...below];
  return neighbours.filter((number) => number);
};

const solve = () => {
  const productsToSum = [];
  data.forEach((row, yIndex) => {
    for (let xIndex = 0; xIndex < row.length; xIndex++) {
      if (isSymbol(row[xIndex])) {
        const adjacentNumbers = findAdjacentNumbers(xIndex, yIndex);
        if (adjacentNumbers.length >= 2) {
          const product = adjacentNumbers.reduce(
            (partialProduct, num) => partialProduct * num
          );
          productsToSum.push(product);
        }
      }
    }
  });
  const total = productsToSum.reduce((partialSum, num) => partialSum + num);
  console.log(total);
};

solve();
