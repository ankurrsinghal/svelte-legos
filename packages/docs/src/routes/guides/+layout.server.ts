import fs from 'fs';

const base = './src/routes/guides';

export async function load() {
  const functions = fs.readdirSync(base).filter(f => fs.lstatSync(base + '/' + f).isDirectory()).map(f => f);
  return {
    functions
  }
}