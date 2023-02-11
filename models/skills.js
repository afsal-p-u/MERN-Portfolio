const mongoose = require('mongoose')

const SkillsSchema = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    value: {type: Number, required: true}
})

module.exports = mongoose.model("skills", SkillsSchema);