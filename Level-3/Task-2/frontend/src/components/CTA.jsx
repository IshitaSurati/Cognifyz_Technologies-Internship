import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CTA = () => {
  const navigate = useNavigate(); 

  const handleApplyClick = () => {
    navigate("/apply");
  };

  return (
    <div className="cta-section text-center">
      <button className="btn btn-danger btn-lg" onClick={handleApplyClick}>
        Apply Now
      </button>
    </div>
  );
};

export default CTA;
