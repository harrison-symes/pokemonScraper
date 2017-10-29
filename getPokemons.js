var request = require('superagent')
var cheerio = require('cheerio')

request
  .get('https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_National_Pok%C3%A9dex_number#List_of_Pok.C3.A9mon_by_National_Pok.C3.A9dex_number')
  .then(res => {
    const $ = cheerio.load(res.text)
    console.log($('table').find('tbody').find('tr').find('td').find('a')[0])
  })
