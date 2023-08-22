const express = require('express');
// const { default: Post } = require('../../Client/app/src/pages/Post');

const router = express.Router();
const { Posts, Likes } = require('../models');

router.get('/', async (req, res) => {
  const listofposts = await Posts.findAll({ include: [Likes] });
  res.json(listofposts);
});

router.get('/byid/:id', async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});

router.post('/', async (req, res) => {
  const post = req.body;
  await Posts.create(post);
  res.status(201).json(post);
});

module.exports = router;
