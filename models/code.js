const mongoose = require('mongoose')

const codeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('codeBoxes', codeSchema)