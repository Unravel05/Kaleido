const express = require('express');
const router = express.Router();
const artistCrtl = require('../controllers/api/artists')

router.post('/', artistCrtl.create);

router.get('/', artistCrtl.index);


module.exports = router;