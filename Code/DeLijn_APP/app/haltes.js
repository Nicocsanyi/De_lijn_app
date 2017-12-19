const request = require('request')
const haltes = (req, res) => {
  if (!req.query.haltenaam) return res.render('haltes')
  const url = `https://www.delijn.be/rise-api-search/search/haltes/${req.query.haltenaam}/1`
  request(url, (err, response, body) => {
    console.log('Halte informatie', response.statusCode)
    if (err || response.statusCode !== 200) {
      console.log('Er loopt iets fout', err)
      res.sendStatus(500)
    }
    const resultaten = JSON.parse(body)
    const haltes = getHaltes(resultaten)
    res.render('halte', {
      haltes
    })
  })
}
module.exports = haltes
const getHaltes = resultaten => {
  let html = ''
  const {
    haltes
  } = resultaten
  if (haltes.length === 0)
    return `
          <p class="pError">Geen haltes gevonden</p>
    `
  haltes.forEach(halte => {
    const {
      lijnen
    } = halte
    console.log(lijnen);
    lijnen.forEach(lijn => {
      console.log(halte)
      html += `
        <div class="lijnItem"> <p class="lijnnummer lijn">${lijn.lijnNummer}</p>  <p class="lijnomschrijving lijn">${lijn.lijnType} | ${lijn.omschrijving}   </p></div>
        `
    })
  })
  return html
}
