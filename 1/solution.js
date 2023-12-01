const fs = require("fs");

const getInput = (inputFile) => {
  const fileContent = fs.readFileSync(inputFile);
  const inputData = fileContent.toString().split("\n");
  return inputData;
};

const wordNumbers = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const parseDigit = (digit) => {
  const int = parseInt(digit);
  if (int) {
    return int;
  }
  return wordNumbers[digit];
};

const parseDigits = (x, y) => {
  const xInt = parseDigit(x);
  const yInt = parseDigit(y);
  return parseInt([xInt, yInt].join(""));
};

const solve = (inputFile) => {
  const inputData = getInput(inputFile);
  const result = inputData.reduce((partialSum, input, i) => {
    const inputDigits = [
      ...input.matchAll(
        /(?=(\d|(?:one|two|three|four|five|six|seven|eight|nine)))/g
      ),
    ].map((captureGroup) => captureGroup[1]);

    if (i === 928) {
      console.log(inputDigits);
    }
    if (inputDigits.length < 2) {
      const increment = parseDigits(inputDigits[0], inputDigits[0]);
      return partialSum + increment;
    }
    const increment = parseDigits(
      inputDigits[0],
      inputDigits[inputDigits.length - 1]
    );
    if (i === 928) {
      console.log(increment);
    }
    return partialSum + increment;
  }, 0);

  console.log(result);
  return result;
};

solve("input.txt");
