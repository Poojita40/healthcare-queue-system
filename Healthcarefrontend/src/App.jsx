import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import AddPatient from "./pages/AddPatient";
import AddDoctor from "./pages/AddDoctor";
import BookAppointment from "./pages/BookAppointment";
import ViewQueue from "./pages/ViewQueue";
import WaitingTime from "./pages/WaitingTime";
import QueueStatus from "./pages/QueueStatus";

import PatientList from "./pages/PatientList";
import DoctorList from "./pages/DoctorList";
import AppointmentList from "./pages/AppointmentList";

import Login from "./pages/Login";
import Register from "./pages/Register";

import PatientLogin from "./pages/PatientLogin";
import PatientDashboard from "./pages/PatientDashboard";

function Layout() {

  const location = useLocation();

  // Hide navbar on login pages
  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/register" ||
    location.pathname === "/patient-login" ||
    location.pathname === "/patient-dashboard" ||
    location.pathname === "/queue-status";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>

        {/* Admin Authentication */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Patient Management */}
        <Route path="/add-patient" element={<AddPatient />} />
        <Route path="/patients" element={<PatientList />} />

        {/* Doctor Management */}
        <Route path="/add-doctor" element={<AddDoctor />} />
        <Route path="/doctors" element={<DoctorList />} />

        {/* Appointment */}
        <Route path="/book" element={<BookAppointment />} />
        <Route path="/appointments" element={<AppointmentList />} />

        {/* Queue */}
        <Route path="/queue" element={<ViewQueue />} />

        {/* Waiting Time */}
        <Route path="/waiting" element={<WaitingTime />} />

        {/* Public Queue */}
        <Route path="/queue-status" element={<QueueStatus />} />

        {/* Patient Pages */}
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />

      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;