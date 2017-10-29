console.log("hello");

var request = require('superagent')
var cheerio = require('cheerio')
var fs = require('fs')
var path = require('path')

start()

function start () {
  fs.readFile(path.join(__dirname, '/pokemans.txt'), 'utf8', (err, data) => {
    if (err) {
      console.log(err)
      writeFile([])
      .then(() => start())
    } else {
      var arr = JSON.parse(data)
      console.log(arr)
      getImageRecursive(arr.length == 0 ? 1 : arr.length, arr)
      .then(images => {
        console.log(images)
        writeFile(images)
        .then(message => console.log('done!'))
      })
    }
  })
}

function writeFile(pokemon) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(path.join(__dirname, '/pokemans.txt'), JSON.stringify(pokemon), (err) => {
      if (!err) resolve("written " + pokemon.length +  " images")
      else reject(err)
    })
  });
}

function getImageRecursive (idx, arr) {
  return new Promise(function(resolve, reject) {
    request
    .get('https://www.pokemon.com/us/pokedex/' + idx)
    .then(res => {
      var $ = cheerio.load(res.text)
      var pokemon = {
        image: $('.profile-images').find('img')[0].attribs.src

      }
      arr.push(pokemon)
      writeFile(arr)
        .then(message => console.log(message))
        .catch(err => {
          console.log(err)
        })
      if (idx == 805) resolve(images)
      else resolve(getImageRecursive(idx + 1, arr))
      // console.log(res.text);
    })
    .catch(err => resolve(getImageRecursive(idx, arr)))
  })
}
