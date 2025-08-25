import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Settings from './pages/Settings.jsx'
import Profile from './pages/Profile.jsx'
import Notifications from './pages/Notifications.jsx' // Import Notifications page
import Quizzes from './pages/Quizzes.jsx'; // Import Quizzes page
import ProgressReport from "./pages/ProgressReport"; // Import ProgressReport page
import { stats, quizzes } from "./data/quizData"; // Import stats and quizzes from external file

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} /> // Added route for Notifications page
        <Route path="/quizzes" element={<Quizzes />} /> // Added route for Quizzes page
        <Route
          path="/progress-report"
          element={<ProgressReport stats={stats} quizzes={quizzes} />} // Pass stats and quizzes as props
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
    </div>
  )
}
