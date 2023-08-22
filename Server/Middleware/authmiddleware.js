const { verify } = require('jsonwebtoken');

const validaetoken = (req, res, next) => {
  const accesstoken = req.header('accessToken');
  if (!accesstoken) {
    return res.json({ error: 'User not Loogged in! ' });
  }

  try {
    const validtoken = verify(accesstoken, 'importantsecret');
    req.user = validtoken;
    if (validtoken) {
      next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validaetoken };
