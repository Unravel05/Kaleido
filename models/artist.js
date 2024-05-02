const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: {type: String, required: true},
    tags: [String],
    imageUrl: {type: String, required: true},
})

module.exports = mongoose.model('Artist', artistSchema)