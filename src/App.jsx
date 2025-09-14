// src/App.jsx
import Navbar from "./components/Navbar";
import Alerts from "./components/Alerts";
import FloodMonitoringDashboard from "./pages/Home";
import ProtectedRoute from "./utils/ProtectedRoute";
import Analytics from "./components/Analytics";
import MapBox from "./components/MapBox";
import MedicalHelpVolunteer from "./Volunteer/Medicalhelp";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Auth";
export default function App() {
  return (<Router>
    <Routes>
      <Route path="/auth" element={<Register/>}/>
      <Route path="login" element={<Login/>}></Route>
      <Route path="/" element={<ProtectedRoute><MedicalHelpVolunteer /></ProtectedRoute>} />
    </Routes> 

    </Router>
   
  );
}
