// import Request from "../models/Request";
const Request = require('../models/Request');

const createRequest = async (req, res) => {
  try {
    const { category, details } = req.body;
    const user = req.result; // middleware se pura user object aaya
    const userId = user._id;

    if (!userId) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    const newRequest = new Request({
      userId,
      category,
      details
    });

    await newRequest.save();

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
