import { readFileSync } from "fs";

const input = readFileSync("1/1.txt", "utf-8").trim().split("\n");

let realPassword = 0;
let currentValue = 50;
let previousValue = 50;

for (const line of input) {
  const isClockwise = line.charAt(0) === "R";
  const value = parseInt(line.slice(1), 10);
  const extraSpins = Math.floor(value / 100);

  realPassword += extraSpins;

  if (value % 100 === 0) {
    continue;
  }

  const remainder = value % 100;

  if (isClockwise) {
    currentValue = (currentValue + remainder) % 100;
  } else {
    currentValue = (currentValue - remainder + 100) % 100;
  }

  if (currentValue === 0) {
    realPassword += 1;
  } else {
    if (isClockwise) {
      if (currentValue < previousValue) {
        realPassword += 1;
      }
    } else {
      if (currentValue > previousValue && previousValue !== 0) {
        realPassword += 1;
      }
    }
  }

  previousValue = currentValue;
}

console.log(realPassword); // 6695
