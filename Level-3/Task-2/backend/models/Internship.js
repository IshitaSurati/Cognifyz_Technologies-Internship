const mongoose = require("mongoose");

const InternshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  companyName: { type: String, required: true },
  location: { type: String, required: true },
  duration: { type: String, required: true },
  stipend: { type: String, required: false },
  requirements: { type: String, required: true },
  applyDeadline: { type: Date, required: true },
  tags: { type: [String], required: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Internship", InternshipSchema);
