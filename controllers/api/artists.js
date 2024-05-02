const Artist = require('../../models/artist')

module.exports = {
    index,
    create,
    delete: handleDeleteArtist,
    edit: handleEditArtist,
}

async function create(req, res) {
    try {
        req.body.user = req.user
        const artist = await Artist.create(req.body)
        res.json(artist)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function index(req, res) {
    try {
        const artist = await Artist.find({})
        res.json(artist)
    } catch (err) {
        res.status(404).json(err)
    }
}

async function handleDeleteArtist(req, res) {
    try {
        const artist = await Artist.findByIdAndDelete(req.params.id)
        res.json(artist)
    } catch (error) {
        res.status(404).json(err)
    }
}

async function handleEditArtist(req, res) {
    try {
        const artist = await Artist.findByIdAndUpdate(req.params.body)
        res.json(artist)
    } catch (error) {
        res.status(404).json(err)
    }
}

