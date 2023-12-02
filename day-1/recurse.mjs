import { readInputFileLines } from '../lib/fs.mjs';

const validDigitWords = new Map([
  ['one', 1],
  ['two', 2],
  ['three', 3],
  ['four', 4],
  ['five', 5],
  ['six', 6],
  ['seven', 7],
  ['eight', 8],
  ['nine', 9],
]);

const rev = (str) => {
  return str.split('').toReversed().join('');
};

const isNumber = (c) => {
  return c >= 48 && c <= 57;
};

const getCalibrationValue = (str, acc = '', done = false) => {
  if (!str) {
    return 0;
  }

  /**
   * This could be further optimized by constructing a set of all valid prefixes
   * for the set of "valid digit words", allowing us to discard input which doesn't
   * feed in to a valid input.
   *
   * To accomplish this, we'd gather all of the valid [0, n-1] length prefixes for
   * the "validDigitWords", and then do the same again for the reversed pairs.
   *
   * We could also optimize this by registering all of the reversed digit words
   * with their relevant digit.
   */
  const ps = [acc.slice(-3), acc.slice(-4), acc.slice(-5)];

  const matchingWord = ps.find(
    (p) => p && (validDigitWords.get(p) ?? validDigitWords.get(rev(p)))
  );

  const wordAccumulatorNumber = matchingWord
    ? validDigitWords.get(matchingWord) ??
      validDigitWords.get(rev(matchingWord))
    : undefined;

  if (wordAccumulatorNumber) {
    return getCalibrationValue(`${wordAccumulatorNumber}${str}`, '', done);
  }

  const c = str.charCodeAt(0);
  const n = isNumber(c);

  if (n && done) {
    return c - 48;
  } else if (n) {
    return (c - 48) * 10 + getCalibrationValue(rev(str), '', true);
  } else {
    return getCalibrationValue(str.slice(1), acc + str[0], done);
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
