const mongoose = require('mongoose')

const ProjectSchema = mongoose.Schema({
    name: {type: String, required: true},
    imgURL: {type: String, required: true},
    previewLink: {type: String, required: true},
    sourceCode: {type: String, required: true}
})

module.exports = mongoose.model("projects", ProjectSchema)