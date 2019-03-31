const express = require('express');
const UserController = require('./UserController');

const userRouter = express.Router();

userRouter.get('/', UserController.getAllUsers);
userRouter.get('/:id', UserController.getUser);
userRouter.post('/', UserController.insertUser);
userRouter.delete('/:id', UserController.deleteUser);
userRouter.patch('/:id', UserController.updateUser);

module.exports = userRouter;