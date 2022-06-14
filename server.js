const { query } = require('express')
const express = require('express')
const res = require('express/lib/response')
const app = express()
const {animals} = require('./data/animals.json')
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`API now available on port ${PORT}`)
})


function filterByQuery(query, animalsArray) {
    let filteredResults = animalsArray;
    let personalityTraitsArray = []
    if (query.personalityTraits) {
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits]
        } else {
            personalityTraitsArray = query.personalityTraits
        }
        personalityTraitsArray.forEach(trait => {
            filteredResults = filteredResults.filter(animal => animal.personalityTraits.indexOf(trait) !== -1)
        })
    }
    if (query.diet) {
      filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
      filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
      filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
  }

app.get('/api/animals', (req, res) => {
    let results = animals
    if (req.query) {
        results = filterByQuery(req.query, results)
    }
    res.json(results)
})