const router = require('express').Router();
const posts = require('../controllers/posts.controller');

router.get('/get', posts.getPosts);
router.post('/create', posts.createPost);

module.exports = router;
