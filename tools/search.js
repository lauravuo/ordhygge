const fs = require("fs");
const https = require("https");

const path = "./src/data";

const fetch = (url) =>
  new Promise((resolve, reject) => {
    console.log(`Find url from ${url}`);
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("error", (err) => reject(err));
      res.on("end", () => resolve(data));
    });
  });

const findAudioURL = async (word) => {
  const html = await fetch(`https://ordnet.dk/ddo/ordbog?query=${word}`);
  const index = html.indexOf("playSound(");
  if (index < 0) {
    return "";
  }
  const id = html.substring(index + 11, index + 21);
  const urlSuffix = `/${id}.mp3`;
  const urlSuffixIndex = html.indexOf(urlSuffix);
  const urlStartIndex = html.lastIndexOf(`https://`, urlSuffixIndex);
  if (urlSuffixIndex < 0 || urlStartIndex < 0) {
    return "";
  }
  const url = html.substring(urlStartIndex, urlSuffixIndex + urlSuffix.length);
  return url;
};

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

fs.readdirSync(path)
  .filter((item) => !item.includes("index.js"))
  .forEach(async (item) => {
    const content = fs.readFileSync(`${path}/${item}`, "utf8");
    const data = JSON.parse(content);
    const newObject = {};
    const keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      const word = keys[i];
      const splitIndex = word.indexOf(",");
      const trimmedWord = word.substring(
        0,
        splitIndex > 0 ? splitIndex : word.length
      );
      const audioUrl = await findAudioURL(trimmedWord);
      newObject[word] = { ...data[word], audio: audioUrl };
      await sleep(500);
    }

    fs.writeFileSync(`${path}/${item}`, JSON.stringify(newObject, null, 2));
  });
