const { ObjectID } = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Aquí el esquema

const coasterSchema = {
    name: String,
    description: String,
    inversions: Number,
    length: Number,
    active: {
        type: Boolean,
        default: true
    },
    park: {
        type: Schema.Types.ObjectId,
        ref: 'Park'
    }
}

module.exports = mongoose.model('Coaster', coasterSchema)