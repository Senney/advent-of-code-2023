import { readInputFileLines } from '../lib/fs.mjs';

const isNumber = (c) => {
  return c >= 48 && c <= 57;
};

const solve = async () => {
  const r = (await readInputFileLines('./day-1/input'))
    .map((line) =>
      line
        .split('')
        .map((c) => c.charCodeAt(0))
        .filter((c) => isNumber(c))
    )
    .map((line) =>
      line.length > 0 ? (line[0] - 48) * 10 + (line[line.length - 1] - 48) : 0
    )
    .reduce((acc, v) => acc + v, 0);

  console.log(r);
};

solve();
