import { readFileSync } from "node:fs";

const input = readFileSync("6/6.txt", { encoding: "utf-8" });

const problems = input.split("\n").map((line) => line.trim().split(/\s+/));

function transpose(matrix: string[][]) {
  return matrix[0].map((_col, i) => matrix.map((row) => row[i]));
}

const grandTotal = transpose(problems).reduce((acc, problem) => {
  const operator = problem.at(-1);
  const result = problem
    .slice(0, -1)
    .map(Number)
    .reduce(
      (acc, number) => (operator === "+" ? acc + number : acc * number),
      operator === "+" ? 0 : 1
    );
  return acc + result;
}, 0);

console.log(grandTotal); // 4364617236318
