const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const characterSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    name: {type: String, required: true},
    tags: [String],
    personality: {type: String, required: true},
    relationship: {type: String, required: true},
    history: {type: String, require: true},
    imageUrl: {type: String, required: true},
})

module.exports = mongoose.model('Character', characterSchema)