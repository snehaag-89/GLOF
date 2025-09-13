// src/App.jsx
import Navbar from "./components/Navbar";
import Alerts from "./components/Alerts";
import ProtectedRoute from "./utils/ProtectedRoute";
import Analytics from "./components/Analytics";
import MapBox from "./components/MapBox";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Auth";
export default function App() {
  return (<Router>
    <Routes>
      <Route path="/auth" element={<Register/>}/>
      <Route path="login" element={<Login/>}></Route>
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
    </Routes> 

    </Router>
   
  );
}
