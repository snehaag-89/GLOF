import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import VolunteerPanel from '../src/components/SeperatePannel/VolunteerPanel'
import CreateRequestPanel from "./components/SeperatePannel/Pannel";
import Navbar from "./components/Navbar";
import Alerts from "./components/Alerts";
import FloodMonitoringDashboard from "./pages/Home";

import ProtectedRoute from "./utils/ProtectedRoute";
import Analytics from "./components/Analytics";
import MapBox from "./components/MapBox";
import MedicalHelpVolunteer from "./Volunteer/Medicalhelp";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from './pages/Auth';
import Login from "./pages/Login";

import VoiceInput from "./pages/About";
import Dictaphone from "./pages/Home";
import MainPage from "./pages/MainPage";
import JoinVolunteer from "./pages/JoinVolunteer";
import AdminVolunteerRequests from "./pages/AdminVolunteerRequests";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ Protected Route Pattern */}
        <Route path="/" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
        <Route path="/volunteer" element={<ProtectedRoute><VolunteerPanel /></ProtectedRoute>} />
        <Route path="/user_request" element={<ProtectedRoute><CreateRequestPanel /></ProtectedRoute>} />
        {/* Add other protected routes as needed */}
        {/* <Route path="/user_request" element={<ProtectedRoute><CreateRequestPanel /></ProtectedRoute>} /> */}
        {/* <Route path="/volunteer" element={<ProtectedRoute><VolunteerPanel /></ProtectedRoute>} /> */}


        {/* ✅ UPDATED: Route for Join as Volunteer */}
        <Route
          path="/join-volunteer"
          element={
            <ProtectedRoute>
              <JoinVolunteer />
            </ProtectedRoute>
          }
        />


        <Route
          path="/admin/volunteer-requests"
          element={
            <ProtectedRoute>
              <AdminVolunteerRequests />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
