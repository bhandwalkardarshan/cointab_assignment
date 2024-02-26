// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', (req, res) => {
    res.send('CoinTab');
});

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getSingleUser);
router.get('/user/posts/:id', userController.getAllPostsOfUser)
router.post('/users', userController.createUser);
router.post('/bulk/posts', userController.addBulkPosts);


module.exports = router;
