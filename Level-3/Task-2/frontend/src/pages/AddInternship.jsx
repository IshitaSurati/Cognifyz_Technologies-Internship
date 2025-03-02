import React, { useState } from "react";

const AddInternship = () => {
  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    location: "",
    duration: "",
    stipend: "",
    requirements: "",
    applyDeadline: "",
    tags: "",
  });

  // 🔹 Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/internships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, tags: formData.tags.split(",") }), // Convert tags to array
      });

      const result = await response.json();
      if (response.ok) {
        alert("Internship added successfully!");
      } else {
        alert("Failed to add internship: " + result.message);
      }
    } catch (error) {
      console.error("❌ Error adding internship:", error);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Add New Internship</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Company Name</label>
          <input type="text" name="companyName" className="form-control" value={formData.companyName} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <input type="text" name="location" className="form-control" value={formData.location} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Duration</label>
          <input type="text" name="duration" className="form-control" value={formData.duration} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Stipend</label>
          <input type="text" name="stipend" className="form-control" value={formData.stipend} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Requirements</label>
          <textarea name="requirements" className="form-control" value={formData.requirements} onChange={handleChange}></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Apply Deadline</label>
          <input type="date" name="applyDeadline" className="form-control" value={formData.applyDeadline} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Tags (comma-separated)</label>
          <input type="text" name="tags" className="form-control" value={formData.tags} onChange={handleChange} />
        </div>

        <button type="submit" className="btn btn-primary">Add Internship</button>
      </form>
    </div>
  );
};

export default AddInternship;
