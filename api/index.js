const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 4000;

const postsRouter = require('./routes/posts.router');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/posts', cors(), postsRouter);

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando: https://localhost:${PORT}`);
});

server.on('error', (err) => console.log('Error: ', err.message));

mongoose.set('strictQuery', true);
mongoose.connect(MONGO_URL, (err) => {
  if (err) throw err;
  console.log('Conectado a BD');
});
