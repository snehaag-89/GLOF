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
import About from "./pages/About";
import Register from "./pages/Auth";
import VolunteerPanel from "./components/SeperatePannel/VolunteerPanel";
// import CreateRequestPanel from "./pages/Home";
import CreateRequestPanel from "./components/SeperatePannel/Pannel";
import VoiceInput from "./pages/About";
import Dictaphone from "./pages/Home";
export default function App() {
  return (<Router>
    <Routes>
      <Route path="/auth" element={<Register/>}/>
      <Route path="login" element={<Login/>}></Route>

      <Route path="/user_request" element={<ProtectedRoute><CreateRequestPanel /></ProtectedRoute>} />

      <Route path="/volunteer" element={<ProtectedRoute><VolunteerPanel /></ProtectedRoute>} />
    </Routes> 

    </Router>
   
  );
}
