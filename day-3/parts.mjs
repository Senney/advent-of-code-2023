import fs from 'fs';
import { readInputFileLines } from '../lib/fs.mjs';

const validNumericCharacters = /[0-9]/;
const validSymbolCharacters = /[^\.0-9]/;

const hasSymbolicNeighbor = (grid, x, y) => {
  const c = [
    { y: y - 1, x: x - 1 },
    { y: y - 1, x: x },
    { y: y - 1, x: x + 1 },
    { y: y, x: x - 1 },
    { y: y, x: x + 1 },
    { y: y + 1, x: x - 1 },
    { y: y + 1, x: x },
    { y: y + 1, x: x + 1 },
  ];

  return c.some((coord) => {
    return (
      !!grid[coord.y] &&
      grid[coord.y][coord.x] &&
      validSymbolCharacters.test(grid[coord.y][coord.x])
    );
  });
};

const solve = async () => {
  const lines = await readInputFileLines('./day-3/input');
  const grid = lines.map((line) => line.split(''));

  const partNumbers = [];

  for (let y = 0; y < grid.length; y++) {
    const col = grid[y];

    let acc = '';
    let validPartNumber = false;

    for (let x = 0; x < col.length; x++) {
      const cell = col[x];

      if (!validNumericCharacters.test(cell)) {
        if (validPartNumber) {
          partNumbers.push(Number.parseInt(acc));
        }

        acc = '';
        validPartNumber = false;

        continue;
      }

      acc += cell;

      if (!validPartNumber && hasSymbolicNeighbor(grid, x, y)) {
        validPartNumber = true;
      }
    }

    if (validPartNumber) {
      partNumbers.push(Number.parseInt(acc));
    }

    acc = '';
    validPartNumber = false;
  }

  fs.writeFileSync('out', JSON.stringify(partNumbers, null, 2));
  console.log(partNumbers.reduce((acc, v) => acc + v, 0));
};

solve();
