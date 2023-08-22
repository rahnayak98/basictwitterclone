const express = require('express');

const router = express.Router();
const { Comments } = require('../models');
const { validaetoken } = require('../Middleware/authmiddleware');

router.get('/:postid', async (req, res) => {
  const postid = req.params.postid;
  const comments = await Comments.findAll({
    where: {
      PostId: postid,
    },
  });
  res.json(comments);
});

router.post('/', validaetoken, async (req, res) => {
  const comment = req.body;
  const username = req.user.username;
  comment.username = username;

  await Comments.create(comment);
  res.status(201).json(comment);
});

router.delete('/:commentid', validaetoken, async (req, res) => {
  const commentId = req.params.commentid;

  await Comments.destroy({
    where: {
      id: commentId,
    },
  });

  res.json('Deleted');
});

module.exports = router;
