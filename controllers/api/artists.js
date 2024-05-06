const Artist = require('../../models/artist')

module.exports = {
    index,
    create,
    delete: handleDeleteArtist,
    edit: handleEditArtist,
    get: getArtistById
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
        const artist = await Artist.find({}).populate('user')
        res.json(artist)
    } catch (err) {
        res.status(404).json(err)
    }
}

async function handleDeleteArtist(req, res) {
    try {
        const artist = await Artist.findByIdAndDelete(req.params.id)
        res.json('delete it')
    } catch (err) {
        res.status(404).json(err)
    }
}

async function handleEditArtist(req, res) {
    try {
        console.log(req.params.id)
        const artist = await Artist.findByIdAndUpdate(req.params.id, req.body, {new: true})
        console.log(artist)
        res.status(200).json(artist)
        // res.send(character)
    } catch (err) {
        res.status(404).json(err)
    }
}

async function getArtistById(req, res) {
    try {
        const artist = await Artist.findById(req.params.artistId);
        if (!artist) {
            return res.status(404).json({ error: 'Artist not found' });
        }
        res.json(artist);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
}
