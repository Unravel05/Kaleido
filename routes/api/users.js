const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/users'

// Insert ensureLoggedIn on all routes that need protecting
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);

// GET /api/users/check-token
router.get('/check-token', usersCtrl.checkToken);

// POST /api/users (create a user - sign up)
router.post('/', usersCtrl.create);
router.post('/login', usersCtrl.login)

router.post('/artist', usersCtrl.create)

module.exports = router;