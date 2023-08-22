const express = require('express');
// const { default: Post } = require('../../Client/app/src/pages/Post');

const router = express.Router();
const { Likes } = require('../models');
const { validaetoken } = require('../Middleware/authmiddleware');

router.post('/', validaetoken, async (req, res) => {
  const { PostId } = req.body;
  const UserId = req.user.id;

  const found = await Likes.findOne({
    where: {
      PostId: PostId,
    },
  });
  if (!found) {
    await Likes.create({ PostId: PostId, userId: UserId });
    res.json({ liked: true });
  } else {
    await Likes.destroy({
      where: {
        PostId: PostId,
      },
    });

    res.json({ liked: false });
  }
});

module.exports = router;
