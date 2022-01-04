const fs = require('fs');
const content = fs.readFileSync('./tools/data.txt', 'utf8');
const lines = content.split('\n');
const data = lines.reduce((result, item) => {
  if (item.length === 1 && item.toUpperCase() === item) {
    return { ...result, current: [...result.current, item], [item]: [] };
  }
  if (item === '---') {
    if (result.lang === 'dk') {
      return { ...result, lang: 'se', index: 0};
    }
    if (result.lang === 'se') {
      return { ...result, lang: 'fi', index: 0};
    }
  }

  //console.log(result, item)


  if (item.length > 0) {
    if (result.lang === 'dk') {
      const current = result.current[result.current.length - 1];
      return { ...result, [current]: {...result[current], [item]: { 'dk': item } }, items: [...result.items, { item, letter: current}] };
    } else {
      const current = result.items[result.index].letter;
      const dkItem = result.items[result.index].item;
      return { ...result, [current]: {...result[current], [dkItem]: { ...result[current][dkItem], [result.lang]: item } }, index: result.index + 1 };
    }
  }
  return result
}, {current: [], lang: 'dk', items: [], index: 0})


Object.keys(data).forEach(key => {
  if (key.toUpperCase() === key) {
    fs.writeFileSync(`./src/data/${key}.json`, JSON.stringify(data[key], null, 2));
  }
})