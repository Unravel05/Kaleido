const Character = require('../../models/character')

module.exports = {
    index,
    create,
    delete: handleDeleteCharacter,
    edit: handleEditCharacter,
    get: getCharacterById
}

async function create(req, res) {
    try {
        req.body.user = req.user
        const character = await Character.create(req.body)
        res.status(201).json(character)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function index(req, res) {
    try {
        const character = await Character.find({}).populate('user')
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
        console.log(req.params.id)
        const character = await Character.findByIdAndUpdate(req.params.id, req.body, {new: true})
        console.log(character)
        res.status(200).json(character)
        // res.send(character)
    } catch (err) {
        res.status(404).json(err)
    }
}

async function getCharacterById(req, res) {
    try {
        const character = await Character.findById(req.params.characterId);
        if (!character) {
            return res.status(404).json({ error: 'Character not found' });
        }
        res.json(character);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
}