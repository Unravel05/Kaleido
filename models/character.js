const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const characterSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name: {type: String, required: true},
    tags: [String],
    personality: {type: String, required: true},
    relationships: {type: String, required: true},
    history: {type: String, require: true},
    imageUrl: {type: String, required: true},
    sourceUrl: {type: String, require: true},
})

module.exports = mongoose.model('Character', characterSchema)