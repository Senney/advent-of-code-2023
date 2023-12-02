import fs from 'fs/promises';

async function readInputFileLines(inputFile) {
  const content = await fs.readFile(inputFile, 'utf-8');

  return content.split('\n').filter((line) => !!line);
}

export { readInputFileLines };
