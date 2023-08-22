const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const { Users } = require('../models');
const { sign } = require('jsonwebtoken');

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json('Success');
  });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });
  if (!user) {
    return res.json({ error: 'User does not exist' });
  }
  bcrypt.compare(password, user.password).then((match) => {
    if (!match) {
      return res.json({ error: 'Invalid creds' });
    }
    const accesstoken = sign(
      { username: user.username, id: user.id },
      'importantsecret'
    );
    res.json(accesstoken);
  });
});

module.exports = router;
