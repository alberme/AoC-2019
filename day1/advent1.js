const { readPuzzle } = require("../util");

// part 1
const puzzle = readPuzzle("./puzzle.txt")
const fuel = puzzle.map(mass => Math.floor(mass / 3) - 2);
const fuelTotal = fuel.reduce((total, fuel) => total += fuel, 0);
console.log(fuelTotal); // 3497998

// part 2
const calculate = fuel => {
  let result = Math.floor(fuel / 3) - 2;
  return result < 0 ? fuel : fuel + calculate(result);
}
const recursiveFuel = fuel.reduce((total, fuel) => total += calculate(fuel), 0);
console.log(recursiveFuel); // 5244112
