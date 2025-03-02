const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const internshipRoutes = require("./routes/internshipRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    console.log("Welcome to backend");
    
})
app.use("/api/internships", internshipRoutes);

app.listen(3000, () => console.log("🚀 Server running on port 3000"));