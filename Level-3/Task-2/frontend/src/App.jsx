import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import InternshipList from "./components/InternshipList";
import Qualifications from "./components/Qualifications";
import Highlights from "./components/Highlights";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import Apply from "./pages/Apply";
import AddInternship from "./pages/AddInternship"; 

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <div className="container my-5">
              <h2 className="text-center mb-4">Available Internships</h2>
              <InternshipList />
            </div>
            <div className="container my-5">
              <div className="row">
                <div className="col-md-6"><Highlights /></div>
                <div className="col-md-6"><Qualifications /></div>
              </div>
            </div>
            <CTA />
          </>
        } />
        <Route path="/apply" element={<Apply />} />
        <Route path="/add-internship" element={<AddInternship />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
