const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users');

router.post('/register', UsersController.registerUser);
router.get('/users',UsersController.getUsers);

module.exports = router;