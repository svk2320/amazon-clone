const express = require('express');

const usersRouter = require('./users/user.router');

const api = express.Router();

api.use('/launches', usersRouter);

module.exports = api;