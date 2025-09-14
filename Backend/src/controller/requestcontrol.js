// import Request from "../models/Request";
const Request = require('../models/Request');

const createRequest = async (req, res) => {
    try {
      const { category, details } = req.body;
      const user = req.result;
      const userId = user._id;
  
      const newRequest = new Request({ userId, category, details });
      await newRequest.save();
  
      // Emit nayi request volunteers ko
      const io = req.app.get("io");
      io.emit("new_request", {
        _id: newRequest._id,
        category,
        details,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address
        },
        status: newRequest.status
      });
  
      res.status(201).json({
        message: "Request created successfully",
        request: newRequest
      });
    } catch (err) {
      console.error("Error creating request:", err.message);
      res.status(500).json({ error: err.message });
    }
  };
  
// controllers/requestController.js


const getAllRequests = async (req, res) => {
  try {
    // saari requests fetch karo aur user ki details bhi populate karo
    console.log("Get_ALL_Request Hit")
    const requests = await Request.find()
      .populate("userId", "name email phone address") // user ke details
      .sort({ createdAt: -1 }); // latest request upar

    res.status(200).json({
      message: "All requests fetched successfully",
      requests
    });
  } catch (err) {
    console.error("Error fetching requests:", err.message);
    res.status(500).json({ error: err.message });
  }
};



module.exports = {createRequest,getAllRequests};
