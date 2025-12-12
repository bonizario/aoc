import { readFileSync } from "node:fs";

const input = readFileSync("4/4.txt", "utf-8").trim().split("\n");

const grid = input.map((line) => line.split(""));

const MAX_PAPER_ROLLS_TO_FORKLIFT_ACCESS = 4;
const deltaRow = [-1, -1, -1, 0, 1, 1, 1, 0];
const deltaCol = [-1, 0, 1, 1, 1, 0, -1, -1];
const rows = grid.length;
const cols = grid[0].length;

let previousPaperRollsRemoved = -1;
let paperRollsRemoved = 0;

while (paperRollsRemoved > previousPaperRollsRemoved) {
  previousPaperRollsRemoved = paperRollsRemoved;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] !== "@") {
        continue;
      }
      const nearbyPaperRolls = countNearbyPaperRolls(row, col);
      if (nearbyPaperRolls < MAX_PAPER_ROLLS_TO_FORKLIFT_ACCESS) {
        paperRollsRemoved += 1;
        grid[row][col] = "x";
      }
    }
  }
}

function countNearbyPaperRolls(row: number, col: number): number {
  let nearbyPaperRolls = 0;
  for (let i = 0; i < deltaRow.length; i++) {
    const newRow = row + deltaRow[i];
    const newCol = col + deltaCol[i];
    if (
      newRow >= 0 &&
      newRow <= rows - 1 &&
      newCol >= 0 &&
      newCol <= cols - 1
    ) {
      if (grid[newRow][newCol] === "@") {
        nearbyPaperRolls += 1;
      }
    }
  }
  return nearbyPaperRolls;
}

console.log(paperRollsRemoved); // 9038
