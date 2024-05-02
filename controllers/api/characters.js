const Character = require('../../models/character')

module.exports = {
    index,
    create,
    delete: handleDeleteCharacter,
    edit: handleEditCharacter,
}

async function create(req, res) {
    try {
        req.body.user = req.user
        const character = await Character.create(req.body)
        res.json(character)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function index(req, res) {
    try {
        const character = await Character.find({})
        res.json(character)
    } catch (err) {
        res.status(404).json(err)
    }
}

async function handleDeleteCharacter(req, res) {
    try {
        const character = await Character.findByIdAndDelete(req.params.id)
        res.json('delete it')
    } catch (err) {
        res.status(404).json(err)
    }
}

async function handleEditCharacter(req, res) {
    try {
        const character = await Character.findByIdAndUpdate(req.params.id)
        res.json(character)
    } catch (err) {
        res.status(404).json(err)
    }
}