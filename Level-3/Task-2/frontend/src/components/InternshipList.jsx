import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InternshipList = () => {
  const [internships, setInternships] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/api/internships")
      .then(response => setInternships(response.data))
      .catch(error => console.error("Error fetching internships:", error));
  }, []);

  return (
    <div>
      {internships.map((internship) => (
        <div key={internship._id} className="card p-3 mb-3">
          <h3>{internship.title}</h3>
          <p>{internship.description}</p>
          <p><strong>Duration:</strong> {internship.duration}</p>
          <button className="btn btn-danger" onClick={() => navigate("/apply")}>
            Apply
          </button>
        </div>
      ))}
    </div>
  );
};

export default InternshipList;
