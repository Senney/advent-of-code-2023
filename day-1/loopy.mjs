import { readInputFileLines } from '../lib/fs.mjs';

const isNumber = (c) => {
  return c >= 48 && c <= 57;
};

const getCalibrationValue = (str) => {
  let o = 0;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    if (isNumber(c)) {
      o += (c - 48) * 10;

      for (let j = str.length - 1; j >= i; j--) {
        const c2 = str.charCodeAt(j);

        if (isNumber(c2)) {
          o += c2 - 48;

          return o;
        }
      }
    }
  }

  return 0;
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
