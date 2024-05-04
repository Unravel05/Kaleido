const express = require('express');
const router = express.Router();
const characterCrtl = require('../controllers/api/characters')

router.post('/', characterCrtl.create);

router.get('/', characterCrtl.index);

router.delete('/:id', characterCrtl.delete);

router.put('/:id', characterCrtl.edit)

router.get('/:characterId', characterCrtl.get);



module.exports = router;