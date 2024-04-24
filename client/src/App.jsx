import "./App.css";
import { Route, Routes } from "react-router-dom";
import About from "./components/LandingSite/About/index";
import Contact from "./components/LandingSite/Contact/index";
import LandingSite from "./components/LandingSite/Index";
import LandingPage from "./components/LandingSite/LandingPage/index"
import Auth from "./components/LandingSite/AuthPage/Index";
import SignIn from "./components/LandingSite/AuthPage/SignIn";
import Index from "./components/Dashboards/StudentDashboard/Index";
import Home from "./components/Dashboards/StudentDashboard/Home";
import Leave from "./components/Dashboards/StudentDashboard/Leave";
import Attendance from "./components/Dashboards/StudentDashboard/Attendance";
import Invoices from "./components/Dashboards/StudentDashboard/Invoices";
import Suggestions from "./components/Dashboards/StudentDashboard/Suggestions";
import Complaints from "./components/Dashboards/StudentDashboard/Complaints";
import Settings from "./components/Dashboards/StudentDashboard/Settings";
import WardenIndex from "./components/Dashboards/AdminDashboard/Index";
import WardenHome from "./components/Dashboards/AdminDashboard/Home/Home"
import RegisterStudent from "./components/Dashboards/AdminDashboard/RegisterStudent";
import WardenAttendance from "./components/Dashboards/AdminDashboard/Attendance";
import WardenComplaints from "./components/Dashboards/AdminDashboard/Complaints";
import WardenInvoices from './components/Dashboards/AdminDashboard/Invoices'
import WardenSuggestions from './components/Dashboards/AdminDashboard/Suggestions'
import WardenSettings from './components/Dashboards/AdminDashboard/Settings'
import AllStudents from "./components/Dashboards/AdminDashboard/AllStudents";
import WardenLeave from "./components/Dashboards/AdminDashboard/Leave";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingSite />}>
          <Route index element={<LandingPage />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="auth" element={<Auth />}>
            <Route path="login" element={<SignIn />} />
          </Route>
        </Route>
        <Route path="/student-dashboard" element={<Index />}>
          <Route index element={<Home />} />
          <Route path="leave" element={<Leave />  } />
          <Route path="attendance" element={<Attendance/>} />
          <Route path="complaints" element={<Complaints/>} />
          <Route path="suggestions" element={<Suggestions/>} />
          <Route path="invoices" element={<Invoices/>} />
          <Route path="settings" element={<Settings/>} />
        </Route>
        <Route path="/warden-dashboard" element={<WardenIndex />}>
          <Route index element={<WardenHome />} />
          <Route path='register-student' element={<RegisterStudent />} />
          <Route path="attendance" element={<WardenAttendance />} />
          <Route path="complaints" element={<WardenComplaints />} />
          <Route path="invoices" element={<WardenInvoices/>} />
          <Route path="suggestions" element={<WardenSuggestions/>} />
          <Route path="settings" element={<WardenSettings/>} />
          <Route path="all-students" element={<AllStudents/>}/>
          <Route path="leave" element={<WardenLeave />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
