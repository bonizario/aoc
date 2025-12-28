import { readFileSync } from "node:fs";

const input = readFileSync("6/6.txt", { encoding: "utf-8" });

const grid = input.split("\n");

const rows = grid.length;
const cols = grid[0].length;

let grandTotal = 0;
let isNextColumnEmpty = false;
const numbers: number[] = [];

for (let col = cols - 1; col >= 0; col--) {
  if (isNextColumnEmpty) {
    isNextColumnEmpty = false;
    continue;
  }
  let number = "";
  for (let row = 0; row < rows - 1; row++) {
    // don't consider the last row as part of number
    number += grid[row][col];
  }
  numbers.push(Number(number));

  const operator = grid[rows - 1][col].trim();
  if (!operator) {
    continue;
  }
  if (operator === "+") {
    grandTotal += numbers.reduce((acc, number) => acc + number, 0);
  } else if (operator === "*") {
    grandTotal += numbers.reduce((acc, number) => acc * number, 1);
  }
  isNextColumnEmpty = true;
  numbers.splice(0, numbers.length);
}

console.log(grandTotal); // 9077004354241
