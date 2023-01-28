import fs from 'fs'
import { sleep, findOrdBog } from './utils.mjs'

const path = "./src/data";

(async () => {
  const files = fs
    .readdirSync(path)
    .filter((item) => !item.includes("index.js"));

  for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
    const item = files[fileIndex];
    const content = fs.readFileSync(`${path}/${item}`, "utf8");
    const data = JSON.parse(content);
    const newObject = {};
    const keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      const word = keys[i];
      const res = findOrdBog(word)
      newObject[word] = { ...data[word], audio: res.audioUrl, wordType: res.wordType };
      await sleep(500);
    }

    fs.writeFileSync(`${path}/${item}`, JSON.stringify(newObject, null, 2));
  }
})();
