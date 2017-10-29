var request = require('superagent')
var cheerio = require('cheerio')

request
  .get('https://www.pokemon.com/us/pokedex/')
  .then(res => {
    const $ = cheerio.load(res.text)
    console.log($('.id'));
  })
