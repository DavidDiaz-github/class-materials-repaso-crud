const express = require('express')
const router = express.Router()
const Coaster = require('../models/coaster.model')
const Park = require('../models/park.model')

// Aquí los endpoints


router.get("/new", (req, res) => {
    Park.find()
        .select({ name: 1, _id: 1 })
        .then(parks => {
            res.render("../views/coasters/new-coaster", { parks });
            
    });
});
router.post('/new', (req, res) => {
    const { name, description, inversions, length, active, park } = req.body
    Coaster.create({ name, description, inversions, length, active, park })
        .then(() => res.redirect('/coasters/new'))
        .catch(err => console.log('Hubo un error : ', err))
})


router.get('/', (req, res) => {
    Coaster.find()
        .populate('park')
        .then(coasters => {
            res.render('../views/coasters/coasters-index.hbs', {coasters})
    })
})



router.get('/delete', (req, res) => {
    const id = req.query.id

    Coaster.findByIdAndDelete(id)
        .then(() => res.redirect('/coasters'))
        .catch(err => console.log('Hubo un error : ', err))
})

router.get('/edit', (req, res) => {
    const id = req.query.id

    Coaster.findById(id, function (err, result) {
        Park.find(function (err, results) {

            res.render('../views/coasters/coaster-edit-form', { title: 'Coaster Details', coaster: result, park: results })
        })
    })
})   

router.post('/edit', (req, res) => {
    const id = req.query.id
    const { name, description, inversions, length, active, park } = req.body

    Coaster.findByIdAndUpdate(id, { name, description, inversions, length, active, park })
        .populate('park')
        .then(() => res.redirect('/coasters'))
        .catch(err => console.log('Hubo un error : ', err))
})


router.get('/:id', (req, res) => {
    const id = req.params.id
    Coaster.findById(id)
        .populate('park')
        .then(coasterDetails => res.render('../views/coasters/coaster-details.hbs', coasterDetails))
        .catch(err => console.log('Hubo un error : ', err))
})



module.exports = router