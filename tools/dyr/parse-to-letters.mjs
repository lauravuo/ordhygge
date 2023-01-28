import words from './fish.json' assert { type: "json" }
import { writeFileSync } from 'fs'

const sortedWords = words.sort((a, b) => a.dk > b.dk ? 1 : -1)
const res = {}

for (let i = 0; i < sortedWords.length; i++) {
  const word = sortedWords[i]
  const first = word.dk.charAt(0)
  if (!res[first]) {
    res[first] = {}
  }
  res[first][word.dk] = word
}

for (let i = 0; i < Object.keys(res).length; i++) {
  const item = Object.keys(res)[i]
  writeFileSync(`./src/data-fish/${item}.json`, JSON.stringify(res[item]))
}
