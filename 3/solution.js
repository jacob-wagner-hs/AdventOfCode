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

const hasAdjacentSymbol = (number, x, y) => {
  const xSpan = number.length;

  const upperLeft = data[y - 1]?.[x - 1];
  const upperRight = data[y - 1]?.[x + xSpan];
  const right = data[y]?.[x + xSpan];
  const bottomRight = data[y + 1]?.[x + xSpan];
  const bottomLeft = data[y + 1]?.[x - 1];
  const left = data[y]?.[x - 1];
  const top = data[y - 1] ? data[y - 1].slice(x, x + xSpan) : [];
  const bottom = data[y + 1] ? data[y + 1].slice(x, x + xSpan) : [];

  console.log(x, xSpan);

  const valuesToCheck = [
    upperLeft,
    upperRight,
    right,
    bottomRight,
    bottomLeft,
    left,
    ...top,
    ...bottom,
  ];

  return !!valuesToCheck.find((value) => isSymbol(value));
};

const solve = () => {
  const partNumbers = [];
  data.forEach((row, yIndex) => {
    const numbersInRow = [...row.matchAll(/\d+/g)];

    numbersInRow.forEach((numberInfo) => {
      const number = numberInfo[0];
      const xIndex = numberInfo.index;

      const isPart = hasAdjacentSymbol(number, xIndex, yIndex);

      if (isPart) {
        partNumbers.push(parseInt(number));
      }
    });
  });

  const sum = partNumbers.reduce((partialSum, num) => partialSum + num);

  console.log(sum);
};

solve();
