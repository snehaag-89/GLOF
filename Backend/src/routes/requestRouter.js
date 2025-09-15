// const express = require('express');
// const requestRouter = express.Router();
// const volunteerMiddleware = require('../middleware/volunteermiddleware');
// const authMiddleware = require('../middleware/authMiddleware');
// const { createRequest, getAllRequests } = require('../controller/requestcontrol');

// requestRouter.post('/create_request', authMiddleware, createRequest);
// requestRouter.get('/get_request', volunteerMiddleware, getAllRequests);

// module.exports = requestRouter;



const express = require('express');
const requestRouter = express.Router();
const volunteerMiddleware = require('../middleware/volunteermiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const { completeRequest,createRequest, getAllRequests,acceptRequest } = require('../controller/requestcontrol');

requestRouter.post('/create_request', authMiddleware, createRequest);
requestRouter.get('/get_request', volunteerMiddleware, getAllRequests);
requestRouter.put("/accept/:id", volunteerMiddleware,acceptRequest);
requestRouter.put("/complete/:id", volunteerMiddleware,completeRequest);
module.exports = requestRouter;