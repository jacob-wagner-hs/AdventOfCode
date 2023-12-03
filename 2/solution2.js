const fs = require("fs");

const getInput = (inputFile) => {
  const fileContent = fs.readFileSync(inputFile);
  const inputData = fileContent.toString().split("\n");
  return inputData;
};

const product = (values) =>
  values.reduce((partialProduct, value) => partialProduct * value);

const sum = (values) =>
  values.reduce((partialProduct, value) => partialProduct + value);

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
  const samples = individualSamples.reduce((samples, sample) => {
    const data = sample.split(",");
    const parsedData = parseData(data);
    samples.push(parsedData);
    return samples;
  }, []);

  const minOfEachTile = samples.reduce((tiles, sample) => {
    Object.keys(sample).forEach((color) => {
      if (!tiles[color] || sample[color] > tiles[color]) {
        tiles[color] = sample[color];
      }
    });
    return tiles;
  }, {});

  const productOfGame = product(Object.values(minOfEachTile));

  return productOfGame;
};

const solve = (inputFile) => {
  const inputData = getInput(inputFile);
  const powerOfGame = sum(inputData.map(parseGame));
  console.log(powerOfGame);
  //71036
  return powerOfGame;
};

solve("input.txt");
