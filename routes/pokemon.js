const { default: axios } = require('axios')
const express = require('express')
const router = express.Router()
const db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
    .then(faves => {
      // res.render('indexFaves', {results: faves})
      res.render('pokemon/index',{favorites:faves})
    })
    .catch(hi => {
      console.error
    })
  // console.log(db.pokemon)
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // TODO: Get form data and add a new record to DB
  // res.send(req.body)
  const formData = JSON.parse(JSON.stringify(req.body))
  // console.log('this is formData:',formData)
  db.pokemon.create({
    name: formData.name
  })
    .then(createdFave => {
      // console.log('db instance created:\n', createdFave)
      res.redirect(`/pokemon`)
    })
    .catch(error => {
      console.error
    })
})

// SHOW route
router.get('/:name', (req, res) => {
  const name = req.params.name
  axios.get(`http://pokeapi.co/api/v2/pokemon/${name}/`)
    .then(apiResults => {
      const weight = apiResults.data.weight
      console.log(weight)
      const pic = apiResults.data.sprites.other.dream_world.front_default
      console.log(pic)
      const abilities = apiResults.data.abilities
      const moves = apiResults.data.moves
      const stats = apiResults.data.stats
      console.log(stats)
      res.render('pokemon/show',{name, weight, pic, abilities, moves, stats})
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = router