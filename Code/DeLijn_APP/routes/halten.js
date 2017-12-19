var request = require('request')

var halten = (req, res) => {

  // /halten
  if(!req.query.haltenaam) return res.render('halten')

  // /halten?haltenaam=XXXXX
  //TODO sanitize req.query.haltenaam
  var url = `https://www.delijn.be/rise-api-search/search/haltes/${req.query.haltenaam}/1`

  request(url, (err, response, body ) => {
    console.log('Halte informatie', response.statusCode)
    if (err || response.statusCode !== 200) {
      console.log('er ging iets mis', err)
      res.sendStatus(500)
      //TODO res.render('error')
    }

    var resultaten = JSON.parse(body)
    var haltes = getHaltes(resultaten)
    res.render('halte',{
      haltes
    })
  })

  }

module.exports = halten

//////////

var getHaltes = resultaten => {
  var html = ''
  var { haltes } = resultaten
  // TODO: ?haltenaam=onbestaandegemeente

  if( haltes.length === 0)
    return  `
          <p>Er werd geen halte gevonden</p>
          <a href="/halten"><button>back</button></a>
    `

  haltes.forEach( halte => {
    var { lijnen } = halte
    lijnen.forEach(lijn => {
      console.log(halte)
      html += `
        <div class="lijnItem"> <p class="lijnnummer lijn">${lijn.lijnNummer}</p>  <p class="lijnomschrijving lijn">${lijn.lijnType} | ${lijn.omschrijving}   </p></div>
        `
    })
  })

  return html
}
