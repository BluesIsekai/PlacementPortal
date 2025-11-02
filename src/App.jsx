import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { QuizProvider } from './context/QuizContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <QuizProvider>
            <div className="min-h-screen bg-white text-slate-900">
              <ProtectedRoute>
                <AppRoutes />
              </ProtectedRoute>
            </div>
          </QuizProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
