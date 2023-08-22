const express = require('express');

const app = express();
const db = require('./models');
const PORT = 3000;
const cors = require('cors');

//Routers
app.use(express.json());
app.use(cors());
const postRouter = require('../Server/routes/Posts');

app.use('/posts', postRouter);

const commentsRouter = require('../Server/routes/Comments');

app.use('/comments', commentsRouter);

const usersRouter = require('../Server/routes/Users');

app.use('/auth', usersRouter);

const likessRouter = require('../Server/routes/Likes');

app.use('/like', likessRouter);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log('API Running'));
});

// app.get('/',()=>{ 'API Running'});
