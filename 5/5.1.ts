import { readFileSync } from "node:fs";

const input = readFileSync("5/5.txt", "utf-8").trim().split("\n");

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

const freshIngredients = ingredientIds.reduce(
  (acc, id) => acc + isFresh(id),
  0
);

function isFresh(id: number): number {
  let left = 0;
  let right = concatenatedRanges.length - 1;

  while (left < right) {
    let mid = left + Math.floor((right - left) / 2);
    if (isInRange(id, concatenatedRanges[mid])) {
      return 1;
    }
    if (id <= concatenatedRanges[mid][0]) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return isInRange(id, concatenatedRanges[left]) ? 1 : 0;
}

function isInRange(id: number, range: Range): boolean {
  return id >= range[0] && id <= range[1];
}

console.log(freshIngredients); // 798
