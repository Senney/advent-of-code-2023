import { readInputFileLines } from '../lib/fs.mjs';

const parseDraw = (draw) => {
  return Object.fromEntries(
    draw.map((d) => {
      const p = d.split(' ');

      return [p[1][0], Number.parseInt(p[0])];
    })
  );
};

const minPresentInDraws = (draws) => {
  const m = {};

  draws.forEach((d) => {
    const entries = Object.entries(d);

    entries.forEach((e) => {
      m[e[0]] = Math.max(m[e[0]] ?? 0, e[1]);
    });
  });

  return m;
};

const parseLine = (input) => {
  const colonIndex = input.indexOf(':');
  if (!colonIndex) {
    throw new Error('Invalid input');
  }

  const draws = input
    .slice(colonIndex + 1)
    .split('; ')
    .map((draw) => draw.trim().split(', '))
    .map((d) => parseDraw(d));

  return {
    game: Number.parseInt(input.slice(4, colonIndex)),
    draws: draws,
    minRequired: minPresentInDraws(draws),
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

    const powerSet =
      game.minRequired.r * game.minRequired.b * game.minRequired.g;

    t += powerSet;
  }

  console.log(t);
};

solve();
