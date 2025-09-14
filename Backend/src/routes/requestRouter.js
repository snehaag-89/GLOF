const express=require('express');
const requestRouter=express.Router()
const volunteerMiddleware=require('../middleware/volunteermiddleware')
const authMiddleware=require('../middleware/authMiddleware')
const {createRequest,getAllRequests}=require('../controller/requestcontrol')
requestRouter.post('/create_request',authMiddleware,createRequest);
requestRouter.get('/get_request',volunteerMiddleware,getAllRequests);

module.exports = requestRouter;