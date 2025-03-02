import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Apply = () => {
  const [searchParams] = useSearchParams();
  const internshipIdFromURL = searchParams.get("internshipId"); // Get internship ID from URL
  const [internships, setInternships] = useState([]);
  const [selectedInternship, setSelectedInternship] = useState(internshipIdFromURL || "");
  const [internshipDetails, setInternshipDetails] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // 🔍 Fetch available internships
  useEffect(() => {
    fetch("http://localhost:3000/api/internships")
      .then((res) => res.json())
      .then((data) => setInternships(data))
      .catch((err) => console.error("Error fetching internships:", err));
  }, []);

  // 🔍 Fetch Internship Details (only if ID is present)
  useEffect(() => {
    if (selectedInternship) {
      fetch(`http://localhost:3000/api/internships/${selectedInternship}`)
        .then((res) => res.json())
        .then((data) => setInternshipDetails(data))
        .catch((err) => console.error("Error fetching internship details:", err));
    }
  }, [selectedInternship]);

  // 🔹 Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Handle Internship Selection
  const handleInternshipChange = (e) => {
    setSelectedInternship(e.target.value);
  };

  // 🔹 Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedInternship) {
      alert("Please select an internship.");
      return;
    }

    const applicationData = { ...formData, internshipId: selectedInternship };

    try {
      const response = await fetch("http://localhost:3000/api/internships/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Application submitted successfully!");
      } else {
        alert("Failed to submit application: " + result.message);
      }
    } catch (error) {
      console.error("❌ Error submitting application:", error);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Apply for Internship</h2>

      {/* 🔹 Internship Selection Dropdown */}
      <div className="mb-3">
        <label className="form-label">Select an Internship</label>
        <select className="form-select" value={selectedInternship} onChange={handleInternshipChange} required>
          <option value="">-- Select an Internship --</option>
          {internships.map((internship) => (
            <option key={internship._id} value={internship._id}>
              {internship.title}
            </option>
          ))}
        </select>
      </div>

      {/* 🔹 Show Internship Title */}
      {internshipDetails && <h4>{internshipDetails.title}</h4>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input type="text" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required />
        </div>

        <button type="submit" className="btn btn-primary">Submit Application</button>
      </form>
    </div>
  );
};

export default Apply;
