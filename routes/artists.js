const express = require('express');
const router = express.Router();
const artistCrtl = require('../controllers/api/artists')

router.post('/', artistCrtl.create);

router.get('/', artistCrtl.index);

router.delete('/:id', artistCrtl.delete);

router.put('/:id', artistCrtl.edit);

module.exports = router;