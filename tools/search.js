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

const findAudioURL = (html) => {
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

const findWordType = (html) => {
  const index = html.indexOf("tekstmedium allow-glossing");
  if (index < 0) {
    return "UNKNOWN";
  }
  const startIndex = html.indexOf(">", index);
  const endIndex = html.indexOf("<", index);
  if (startIndex < 0 || endIndex < 0) {
    return "UNKNOWN";
  }
  return html.substring(startIndex + 1, endIndex).split(",")[0];
};

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

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
      const splitIndex = word.indexOf(",");
      const trimmedWord = word.substring(
        0,
        splitIndex > 0 ? splitIndex : word.length
      );
      const html = await fetch(
        `https://ordnet.dk/ddo/ordbog?query=${trimmedWord}`
      );
      const audioUrl = findAudioURL(html);
      const wordType = findWordType(html);
      newObject[word] = { ...data[word], audio: audioUrl, wordType };
      await sleep(500);
    }

    fs.writeFileSync(`${path}/${item}`, JSON.stringify(newObject, null, 2));
  }
})();
