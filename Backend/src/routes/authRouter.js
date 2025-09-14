const express = require('express');
const authRouter = express.Router();

const userMiddleware = require('../middleware/authMiddleware'); // ✅ Fixed typo in folder name
const { register, login, logout, getuserdata } = require('../controller/authcontroller');
const userMiddleWare = require('../middleware/authMiddleware');

// Routes
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', userMiddleware, logout);
authRouter.get('/getuserdata', userMiddleware, getuserdata);

module.exports = authRouter;