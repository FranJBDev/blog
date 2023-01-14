const postModel = require('../models/post.model');

const createPost = async (req, res) => {
  const { userId, post, reaction } = req.body;
  const data = { userId, post, reaction };

  if (post) {
    const newPost = await postModel.create({
      userId: data.userId,
      post: data.post,
      reaction: data.reaction,
    });
    res.status(201).json(newPost);
  }
};

const getPosts = (req, res) => {
  postModel.find({}, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
};

module.exports = { getPosts, createPost };
