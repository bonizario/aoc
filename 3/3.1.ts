import { readFileSync } from "node:fs";

const input = readFileSync("3/3.txt", "utf-8").trim();

const banks = input.split("\n");

let totalJoltage = 0;

for (const bank of banks) {
  let left = -1;
  let right = -1;

  for (let i = 0; i < bank.length; i++) {
    const battery = Number(bank[i]);
    if (battery > left && i !== bank.length - 1) {
      left = battery;
      right = Number(bank[i + 1]);
    } else if (battery > right) {
      right = battery;
    }
    if (left === 9 && right === 9) {
      break;
    }
  }

  totalJoltage += left * 10 + right;
}

console.log(totalJoltage); // 17074
