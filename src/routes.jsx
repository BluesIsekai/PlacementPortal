import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Settings from './pages/Settings.jsx'
import Profile from './pages/Profile.jsx'
import Notifications from './pages/Notifications.jsx'
import Quizzes from './pages/Quizzes.jsx'
import ProgressReport from "./pages/ProgressReport"
import Companies from './pages/Companies.jsx'
import Coding from './pages/Coding.jsx'
import Landing from './pages/Landing.jsx'
import Features from './pages/Features.jsx'
import Reports from './pages/Reports.jsx'
import Schedule from './pages/Schedule.jsx'
import { stats, quizzes } from "./data/quizData"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/features" element={<Features />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/quizzes" element={<Quizzes />} />
      <Route path="/companies" element={<Companies />} />
      <Route path="/coding" element={<Coding />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route
        path="/progress-report"
        element={<ProgressReport stats={stats} quizzes={quizzes} />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
