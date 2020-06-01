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
  let distance = 0;
  for (const action of path) {
    const direction = action[0];
    const length = Number(action.slice(1));
    for (let walkedDistance = 0; walkedDistance < length; walkedDistance++) {
      [row, column] = walker[direction](row, column);
      distance++;
      const tile = `${row},${column}`;
      if (this.walkedTiles.has(tile) && this.walkedTiles.get(tile)[0] !== pathNumber) {
        // this.intersections.add(tile);
        this.intersectionDistances.add(distance + this.walkedTiles.get(tile)[1])
      }
      this.walkedTiles.set(tile, [pathNumber, distance]);
    }
  }
}

const getIntersectionPoints = function (paths) {
  const walkedTiles = new Map();
  const intersectionDistances = new Set();
  paths.forEach(walkPath.bind({walkedTiles, intersectionDistances: intersectionDistances}));
  return intersectionDistances;
}

const getClosetIntersection = function (paths) {
  const intersectionDistances = getIntersectionPoints(paths.slice());
  return Math.min(...intersectionDistances)
}

console.log(getClosetIntersection(paths));