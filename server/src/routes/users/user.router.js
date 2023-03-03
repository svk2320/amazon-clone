const express = require('express');
const { httpCreateNewUser, httpCheckUser, httpUserDetails } = require('./user.controller');

const usersRouter = express.Router();

usersRouter.post('/signup', httpCreateNewUser);
usersRouter.post('/signin', httpCheckUser);
usersRouter.post('/settings', httpUserDetails);

module.exports = usersRouter;