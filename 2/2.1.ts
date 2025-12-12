import { readFileSync } from "node:fs";

const input = readFileSync("2/2.txt", "utf-8").trim();

const idRanges = input.split(",");

let sumOfInvalidIds = 0;

for (const idRange of idRanges) {
  const [start, end] = idRange.split("-").map(Number);
  for (let num = start; num <= end; num++) {
    const digits = String(num).length;
    const hasOddDigits = digits & 1;
    if (hasOddDigits) {
      continue;
    }
    const splitInHalf = Math.pow(10, digits / 2);
    const isInvalidId = Math.floor(num / splitInHalf) === num % splitInHalf;
    if (isInvalidId) {
      sumOfInvalidIds += num;
    }
  }
}

console.log(sumOfInvalidIds); // 30323879646
