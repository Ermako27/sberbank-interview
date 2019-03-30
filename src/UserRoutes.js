const express = require('express');
const UserController = require('./UserController');

const userRouter = express.Router();

userRouter.get('/', UserController.getAllUsers);
userRouter.get('/:id', UserController.getUser);
userRouter.post('/', UserController.addUser);
userRouter.delete('/:id', UserController.deleteUser);
userRouter.patch('/:id', UserController.changeUser);

module.exports = userRouter;