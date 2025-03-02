const express = require("express");
const router = express.Router();
const Internship = require("../models/Internship");
const Application = require("../models/Application");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

// ✅ Allow multiple IPs (Localhost + LAN)
const allowedIPs = ["::1", "127.0.0.1", "192.168.1.5"];

// 🔹 Get all internships
router.get("/", async (req, res) => {
  try {
    const internships = await Internship.find();
    res.json(internships);
  } catch (error) {
    console.error("❌ Server Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 🔹 Add new internship (restricted to specific IPs)
router.post("/", async (req, res) => {
  const clientIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const normalizedIP = clientIP.replace(/^::ffff:/, ""); // Normalize IPv6 format

  console.log("✅ Client IP:", normalizedIP);

  if (!allowedIPs.includes(normalizedIP)) {
    console.error("⛔ Unauthorized Access Attempt:", normalizedIP);
    return res.status(403).json({ message: "Unauthorized access" });
  }

  try {
    const { title, companyName, location, duration, stipend, requirements, applyDeadline, tags } = req.body;

    if (!title || !companyName || !location || !duration || !requirements || !applyDeadline) {
      console.error("⚠️ Missing Fields in Request");
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const newInternship = new Internship({
      title,
      companyName,
      location,
      duration,
      stipend,
      requirements,
      applyDeadline,
      tags,
    });

    await newInternship.save();
    console.log("✅ Internship added successfully!");

    res.status(201).json({ message: "Internship added successfully!" });
  } catch (error) {
    console.error("❌ Server Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 🔹 Apply for an internship
router.post("/apply", async (req, res) => {
  try {
    const { name, email, phone, internshipId } = req.body;
    if (!name || !email || !phone || !internshipId) {
      console.error("⚠️ Missing Fields in Request");
      return res.status(400).json({ message: "All fields are required" });
    }

    const internship = await Internship.findById(internshipId);
    if (!internship) {
      console.error("⚠️ Internship Not Found:", internshipId);
      return res.status(404).json({ message: "Internship not found" });
    }

    // ✅ Prevent duplicate applications
    const existingApplication = await Application.findOne({ email, internshipId });
    if (existingApplication) {
      return res.status(400).json({ message: "You have already applied for this internship." });
    }

    const application = new Application({ name, email, phone, internshipId });
    await application.save();
    console.log("✅ Application submitted successfully!");

    res.status(201).json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error("❌ Server Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
