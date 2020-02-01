const express = require('express');
const { isValidHost, isAuth } = require('../../middleware/auth');
const userController = require('../../controllers/v1/user-controller');

const router = express.Router();

router.post('/login', userController.login);
router.post('/create', userController.createUser);
router.post('/update', isValidHost, isAuth, userController.updateUser);
router.post('/delete', isValidHost, isAuth, userController.deleteUser);
router.get('/getAll', userController.getUser);

module.exports = router;
