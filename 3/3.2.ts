import { readFileSync } from "node:fs";

const input = readFileSync("3/3.txt", "utf-8").trim();

const banks = input.split("\n");

const BATTERIES_BY_BANK = 12;

let totalJoltage = 0;

for (const bank of banks) {
  const chosenBatteriesIndexes = Array.from<number>({
    length: BATTERIES_BY_BANK,
  }).fill(-1);

  for (let i = 0; i < BATTERIES_BY_BANK; i++) {
    const remainingBatteriesToTurnOn = BATTERIES_BY_BANK - i;
    const previousChosenIndex = i > 0 ? chosenBatteriesIndexes[i - 1] : -1;
    const availableBatteries = bank.length - previousChosenIndex - 1;
    let start = previousChosenIndex + 1;
    let end = start + (availableBatteries - remainingBatteriesToTurnOn);

    while (start <= end) {
      if (
        chosenBatteriesIndexes[i] === -1 ||
        Number(bank[start]) > Number(bank[chosenBatteriesIndexes[i]])
      ) {
        chosenBatteriesIndexes[i] = start;
      }
      start += 1;
    }
  }

  totalJoltage += Number(
    chosenBatteriesIndexes.reduce((acc, index) => acc + bank[index], "")
  );
}

console.log(totalJoltage); // 169512729575727
