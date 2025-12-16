import { readFileSync } from "node:fs";

const input = readFileSync("5/example.txt", "utf-8").trim().split("\n");

type Range = [number, number];

const ranges: Range[] = [];
const ingredientIds: number[] = [];

for (const line of input) {
  if (line.trim() === "") {
    continue;
  }
  if (line.includes("-")) {
    const [start, end] = line.split("-");
    ranges.push([Number(start), Number(end)]);
  } else {
    ingredientIds.push(Number(line));
  }
}

ranges.sort((a: Range, b: Range) => a[0] - b[0]);

const concatenatedRanges: Range[] = [];

let previousRangeEnd: number | null = null;

for (let i = 0; i < ranges.length; i++) {
  if (previousRangeEnd === null) {
    concatenatedRanges.push(ranges[i]);
    previousRangeEnd = ranges[i][1];
    continue;
  }
  if (ranges[i][0] <= previousRangeEnd + 1) {
    concatenatedRanges.at(-1)![1] = Math.max(
      concatenatedRanges.at(-1)![1],
      ranges[i][1]
    );
  } else {
    concatenatedRanges.push(ranges[i]);
  }
  previousRangeEnd = ranges[i][1];
}

const totalFreshIds = concatenatedRanges.reduce(
  (acc, [start, end]) => acc + (end - start + 1),
  0
);

console.log(totalFreshIds); // 366181852921027
