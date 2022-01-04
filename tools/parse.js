const fs = require("fs");
const content = fs.readFileSync("./tools/data.txt", "utf8");
const lines = content.split("\n");
const data = lines.reduce(
  (result, item) => {
    if (item.length === 1 && item.toUpperCase() === item) {
      return { ...result, current: [...result.current, item], [item]: [] };
    }
    if (item === "---") {
      if (result.lang === "dk") {
        return { ...result, lang: "se", index: 0 };
      }
      if (result.lang === "se") {
        return { ...result, lang: "fi", index: 0 };
      }
    }

    //console.log(result, item)

    if (item.length > 0) {
      if (result.lang === "dk") {
        const current = result.current[result.current.length - 1];
        return {
          ...result,
          [current]: { ...result[current], [item]: { dk: item } },
          items: [...result.items, { item, letter: current }]
        };
      } else {
        const current = result.items[result.index].letter;
        const dkItem = result.items[result.index].item;
        return {
          ...result,
          [current]: {
            ...result[current],
            [dkItem]: { ...result[current][dkItem], [result.lang]: item }
          },
          index: result.index + 1
        };
      }
    }
    return result;
  },
  { current: [], lang: "dk", items: [], index: 0 }
);

const letters = Object.keys(data).filter((item) => item.toUpperCase() === item);
letters.forEach((key) => {
  fs.writeFileSync(
    `./src/data/${key}.json`,
    JSON.stringify(data[key], null, 2)
  );
});

fs.unlinkSync("./src/data/index.js");

const fileNames = fs
  .readdirSync("./src/data")
  .map((item) => item.replace(".json", ""));

const importJsonFiles = fileNames
  .map((item) => `import ${item} from  './${item}.json' `)
  .join("\n");

const indexFile = `${importJsonFiles}\n\nexport default {\n${fileNames
  .map((item) => `${item},`)
  .join("\n")}\n}\n`;

fs.writeFileSync(`./src/data/index.js`, indexFile);
