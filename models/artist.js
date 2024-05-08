const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: {type: String, required: true},
    tags: [String],
    notes: {type: String, required: true},
    imageUrl: {type: String, required: true},
    sourceUrl: {type: String, require: true},

})

module.exports = mongoose.model('Artist', artistSchema)