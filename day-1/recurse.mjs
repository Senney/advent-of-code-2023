import { readInputFileLines } from '../lib/fs.mjs';

const isNumber = (c) => {
  return c >= 48 && c <= 57;
};

const getCalibrationValue = (str, done = false) => {
  if (!str) {
    return 0;
  }

  const c = str.charCodeAt(0);
  const n = isNumber(c);

  if (n && done) {
    return c - 48;
  } else if (n) {
    return (
      (c - 48) * 10 +
      getCalibrationValue(str.split('').toReversed().join(''), true)
    );
  } else {
    return getCalibrationValue(str.slice(1), done);
  }
};

const solve = async () => {
  let r = 0;
  for (const line of await readInputFileLines('./day-1/input')) {
    const cv = getCalibrationValue(line);

    r += cv;
  }
  console.log(r);
};

solve();
