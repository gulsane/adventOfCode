const fs = require("fs");

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");

const paths = input.split("\n").map(line => line.split(","));

const walkPath = function (path, pathNumber) {
  const walker = {
    U: (row, column) => [row + 1, column],
    R: (row, column) => [row, column + 1],
    D: (row, column) => [row - 1, column],
    L: (row, column) => [row, column - 1],
  }
  let row = 0;
  let column = 0;
  for (const action of path) {
    const direction = action[0];
    const distance = action.slice(1);
    for (let walkedDistance = 0; walkedDistance < distance; walkedDistance++) {
      [row, column] = walker[direction](row, column);
      const tile = `${row},${column}`;
      if (this.walkedTiles.has(tile) && this.walkedTiles.get(tile) !== pathNumber) {
        this.intersections.add(tile);
      }
      this.walkedTiles.set(tile, pathNumber);
    }
  }
}

const getIntersectionPoints = function (paths) {
  const walkedTiles = new Map();
  const intersections = new Set();
  paths.forEach(walkPath.bind({walkedTiles, intersections}));
  return intersections;
}

const getClosetIntersection = function (paths) {
  const intersections = getIntersectionPoints(paths.slice());
  const absolutePointCoordinate = [...intersections].map(intersection => intersection.split(",").map(Math.abs));
  const manhattanDistances = absolutePointCoordinate.map(([dRow, dColumn]) => dRow + dColumn);
  return Math.min(...manhattanDistances);
}

console.log(getClosetIntersection(paths));