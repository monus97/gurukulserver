const express = require('express');
const router = express.Router();
const userData = require('../controller/userController')

router.post('/add',userData.userRegister)
router.post('/login',userData.loginUser)
router.get('/users',userData.getAllUsers)
router.put('/users/:id',userData.editUser)
router.delete('/users/:id',userData.deleteUser)


module.exports = router;