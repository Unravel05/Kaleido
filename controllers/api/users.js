const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const bcrypt = require('bcrypt')

require('dotenv').config()

module.exports = {
  index,
  create,
  login,
  checkToken,
  getByName,
};



async function getByName(req, res) {
  try {
    const user = await User.findOne({ name: req.params.name });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user by name:', error);
    res.status(500).json({ error: 'Server error' });
  }
}


async function index(req, res) {
  try {
      const user = await User.find({})
      res.json(user)
  } catch (err) {
      res.status(404).json(err)
  }
}

async function login(req, res) {
    try {
        const user = await User.findOne({email: req.body.email})
        if (!user) throw new Error();
        const match = await bcrypt.compare(req.body.password, user.password)
        if (!user) throw new Error();

    
        const token = createJWT(user)
        res.json(token)
     

    } catch (err) {
        res.status(400).json(err)
    }
}


async function create(req, res) {
  try {
    // Add the user to the db
    const user = await User.create(req.body);
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}

function checkToken(req, res) {
  // req.user will always be there for you when a token is sent
  console.log('req.user', req.user);
  res.json(req.exp);
}

/*--- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}

