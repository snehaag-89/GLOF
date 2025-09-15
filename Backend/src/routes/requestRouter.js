const express = require('express');
const requestRouter = express.Router();
const volunteerMiddleware = require('../middleware/volunteerMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const { createRequest, getAllRequests ,getVolunteers} = require('../controller/requestcontrol');

requestRouter.post('/create_request', authMiddleware, createRequest);
requestRouter.get('/get_request', volunteerMiddleware, getAllRequests);
requestRouter.get('/get_volunteer_detail', getVolunteers);


module.exports = requestRouter;
