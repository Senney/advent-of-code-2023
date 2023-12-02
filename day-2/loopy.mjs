import { readInputFileLines } from '../lib/fs.mjs';

const parseDraw = (draw) => {
  return Object.fromEntries(
    draw.map((d) => {
      const p = d.split(' ');

      return [p[1][0], Number.parseInt(p[0])];
    })
  );
};

const parseLine = (input) => {
  const colonIndex = input.indexOf(':');
  if (!colonIndex) {
    throw new Error('Invalid input');
  }

  const draws = input
    .slice(colonIndex + 1)
    .split('; ')
    .map((draw) => draw.trim().split(', '));

  return {
    game: Number.parseInt(input.slice(4, colonIndex)),
    draws: draws.map((d) => parseDraw(d)),
  };
};

const validAmount = (max, actual) => {
  return actual === undefined || max >= actual;
};

const solve = async () => {
  const l = await readInputFileLines('./day-2/input');
  const r = 12,
    g = 13,
    b = 14;

  let t = 0;
  for (const line of l) {
    const game = parseLine(line);

    const isValid = game.draws.every(
      (d) => validAmount(r, d.r) && validAmount(g, d.g) && validAmount(b, d.b)
    );

    if (isValid) {
      t += game.game;
    }
  }

  console.log(t);
};

solve();
