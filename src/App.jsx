import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Layout from "./pages/Layout";
import EvacuationPage from "./components/EvacuationModel";
import VolunteerPanel from "./components/SeperatePannel/VolunteerPanel";
import CreateRequestPanel from "./components/SeperatePannel/Pannel";
import Services from "./pages/Services";
import FloodMonitoringDashboard from "./pages/Home";

import ProtectedRoute from "./utils/ProtectedRoute";
import Analytics from "./components/Analytics";
import MapBox from "./components/MapBox";
import MedicalHelpVolunteer from "./Volunteer/Medicalhelp";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Auth";
import Login from "./pages/Login";





import VoiceInput from "./pages/About";
import Dictaphone from "./pages/Home";
import MainPage from "./pages/MainPage";

import EvacuationModal from "./components/EvacuationModel";

import JoinVolunteer from "./pages/JoinVolunteer";
import AdminVolunteerRequests from "./pages/AdminVolunteerRequests";



export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public (No Header/Sidebar) */}
        <Route path="/auth" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected (With Header + Sidebar from Layout) */}
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/" element={<Home />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/services" element={<Services />} />
          <Route path="/evacuation" element={<EvacuationPage />} />
          <Route path="/map" element={<MapBox />} />
          <Route path="/volunteer" element={<VolunteerPanel />} />
          <Route path="/user_request" element={<CreateRequestPanel />} />
          <Route path="/medical-help" element={<MedicalHelpVolunteer />} />
          <Route path="/join-volunteer" element={<JoinVolunteer />} />
          <Route path="/admin/volunteer-requests" element={<AdminVolunteerRequests />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
}
