import { readFileSync } from "node:fs";

const input = readFileSync("2/2.txt", "utf-8").trim();

const idRanges = input.split(",");

let invalidIds = new Set<number>();

for (const idRange of idRanges) {
  const [start, end] = idRange.split("-").map(Number);
  for (let num = start; num <= end; num++) {
    const digits = String(num);

    const splitSteps = [1, ...getDivisors(digits.length)];

    // prevent single-digit prime numbers from being mistakenly considered invalid.
    if (digits.length === 1 && splitSteps.length === 1) {
      continue;
    }

    const isInvalidId = splitSteps.some((step) => {
      const chunks = splitIntoChunks(digits, step);
      return chunks.every((chunk) => chunk === chunks[0]);
    });

    if (isInvalidId) {
      invalidIds.add(num);
    }
  }
}

function splitIntoChunks(digits: string, step: number): string[] {
  const chunks: string[] = [];
  for (let i = 0; i < digits.length; i += step) {
    chunks.push(digits.slice(i, i + step));
  }
  return chunks;
}

function getDivisors(n: number): number[] {
  const divisors: number[] = [];
  const sqrtN = Math.sqrt(n);
  for (let i = 2; i <= sqrtN; i++) {
    if (n % i === 0) {
      divisors.push(i);
      const symmetricDivisor = Math.floor(n / i);
      if (i !== symmetricDivisor) {
        divisors.push(symmetricDivisor);
      }
    }
  }
  return divisors;
}

const sumOfInvalidIds = [...invalidIds].reduce((id, total) => id + total);

console.log(sumOfInvalidIds); // 43872163557
