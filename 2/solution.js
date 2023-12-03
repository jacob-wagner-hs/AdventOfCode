const fs = require("fs");

const getInput = (inputFile) => {
  const fileContent = fs.readFileSync(inputFile);
  const inputData = fileContent.toString().split("\n");
  return inputData;
};

const LIMITS = {
  red: 12,
  green: 13,
  blue: 14,
};

const validateSamples = (samples) => {
  return samples
    .map((sample) =>
      Object.keys(sample).every((color) => sample[color] <= LIMITS[color])
    )
    .every((result) => result);
};

const parseData = (data) =>
  data.reduce((parsedData, item) => {
    const numColor = item.trim().split(" ");
    const num = parseInt(numColor[0]);
    const color = numColor[1];
    parsedData[color] = num;
    return parsedData;
  }, {});

const parseGame = (game) => {
  const gameID = parseInt(game.match(/\d+/)[0]);
  const allGameSamples = game.split(":")[1];
  const individualSamples = allGameSamples.split(";");
  const samples = individualSamples.reduce((samples, sample, i) => {
    const data = sample.split(",");
    const parsedData = parseData(data);
    samples.push(parsedData);
    return samples;
  }, []);

  const isValid = validateSamples(samples);

  return { gameID, isValid };
};

const solve = (inputFile) => {
  const inputData = getInput(inputFile);
  const idSum = inputData
    .map(parseGame)
    .reduce(
      (partialSum, { gameID, isValid }) =>
        isValid ? partialSum + gameID : partialSum,
      0
    );

  return idSum;
};

solve("input.txt");
