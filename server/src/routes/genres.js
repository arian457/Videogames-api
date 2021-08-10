const { Router} = require('express');
const {Genres} = require('../db.js')
const router = Router()

router.get('/', async (req,res) => {
  const generos = await Genres.findAll()
  res.json(generos)
})

module.exports = router