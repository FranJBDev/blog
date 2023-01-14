const router = require('express').Router();
const users = require('../controllers/users.controller');

router.post('/register', users.registerUser);
router.post('/login', users.login);
router.get('/allusers', users.allUsers);
router.get('/deleteall', users.allUsers);

module.exports = router;
