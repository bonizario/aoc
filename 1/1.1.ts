import { readFileSync } from "node:fs";

const input = readFileSync("1/1.txt", "utf-8").trim().split("\n");

let realPassword = 0;
let currentValue = 50;

for (const line of input) {
  const isClockwise = line.charAt(0) === "R";
  const value = parseInt(line.slice(1), 10) % 100;

  if (isClockwise) {
    currentValue = (currentValue + value) % 100;
  } else {
    currentValue = (currentValue - value + 100) % 100;
  }

  if (currentValue === 0) {
    realPassword += 1;
  }
}

console.log(realPassword); // 1123
