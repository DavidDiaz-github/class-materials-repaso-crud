const express = require('express')
const router = express.Router()
const Park = require('../models/park.model')
// Aquí los endpoints

router.get('/new', (req, res) => res.render('../views/parks/new-park.hbs'))
router.post('/new', (req, res) => {
    const { name, description } = req.body
    Park.create({ name, description })
        .then(() => res.redirect('/parks/new'))
        .catch(err => console.log('Hubo un error : ', err))
})

module.exports = router