// src/routes/volunteer.js
const express = require("express");
const router = express.Router();

// ✅ Corrected imports (make sure folder & file names match exactly)
const userMiddleware = require("../middleware/authMiddleware");
const volunteerMiddleware = require("../middleware/volunteerMiddleware");
const User = require("../models/User");

// -------------------------
// User → Join as Volunteer
// -------------------------
router.post("/join-volunteer", userMiddleware, async (req, res) => {
  try {
    const user = req.user;

    if (user.role !== "user") {
      return res.status(400).json({ message: "Already a volunteer or admin" });
    }

    user.volunteerRequest = true;
    await user.save();

    // Notify admin in real-time (if socket.io is integrated)
    const io = req.app.get("io");
    io.emit("newVolunteerRequest", { userId: user._id, name: user.name });

    res.json({ message: "Volunteer request submitted successfully" });
  } catch (err) {
    console.error("Join volunteer error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// -------------------------
// Admin → Get Pending Requests
// -------------------------
router.get("/volunteer-requests", volunteerMiddleware, async (req, res) => {
  try {
    // Fetch all users with pending requests
    const requests = await User.find({ volunteerRequest: true, role: "user" });
    res.json(requests);
  } catch (err) {
    console.error("Fetch volunteer requests error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// -------------------------
// Admin → Approve Volunteer
// -------------------------
router.post("/approve-volunteer/:id", volunteerMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = "volunteer";
    user.volunteerRequest = false;
    await user.save();

    res.json({ message: "User approved as volunteer", user });
  } catch (err) {
    console.error("Approve volunteer error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;


