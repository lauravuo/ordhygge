import https from 'https'

export const fetch = (url) =>
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

export const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const findOrdBog = async (word) => {
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
  return { word, audio: audioUrl, wordType };

}
