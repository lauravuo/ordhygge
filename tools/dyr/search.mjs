import { readFileSync, writeFileSync } from 'fs'

import { fetch, sleep, findOrdBog } from '../utils.mjs'

const fiBirds = readFileSync('./tools/dyr/data.txt').toString().split('\n')

const fetchData = async (word) => {
  const html = await fetch(`https://fi.wikipedia.org/wiki/${word}`)
  const endSpot = html.lastIndexOf('hreflang="da"')
  if (endSpot < 0) {
    console.log(`No danish translation for ${word}`)
    return null
  }
  const hrefStart = html.lastIndexOf('href="', endSpot) + 6
  const hrefEnd = html.indexOf('"', hrefStart)
  const wikiUrlDa = html.substring(hrefStart, hrefEnd)
  
  const endSpotSe = html.lastIndexOf('hreflang="sv"')
  const hrefStartSe = html.lastIndexOf('href="', endSpotSe) + 6
  const hrefEndSe = html.indexOf('"', hrefStartSe)
  const wikiUrlSe = html.substring(hrefStartSe, hrefEndSe)
  
  const htmlDa = await fetch(wikiUrlDa)
  const daStart = htmlDa.indexOf('mw-page-title-main">') + 20
  const daEnd = htmlDa.indexOf('<', daStart)
  const daTitle = htmlDa.substring(daStart, daEnd)
  
  const htmlSe = await fetch(wikiUrlSe)
  const seStart = htmlSe.indexOf('mw-page-title-main">') + 20
  const seEnd = htmlSe.indexOf('<', seStart)
  const seTitle = htmlSe.substring(seStart, seEnd)
  
  //console.log(daTitle, seTitle)
  
  const data = await findOrdBog(daTitle)
  return {
      ...data,
      wordType: data.wordType === 'UNKNOWN' ? 'substantiv' : data.wordType,
      dk: daTitle,
      se: seTitle,
      fi: word,
    }
}

const items = [];
for (let i = 0; i < fiBirds.length; i++) {
  const data = await fetchData(fiBirds[i])
  if (data != null) {
    items.push(data)
  }
  await sleep(500)
}

writeFileSync('./src/data-animals/birds.json', JSON.stringify(items))

