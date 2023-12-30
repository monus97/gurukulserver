const express = require('express');
const router = express.Router();
const userData = require('../controller/userController')

router.post('/add',userData.userRegister)
router.post('/login',userData.loginUser)


module.exports = router;