import AppRoutes from './routes.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { QuizProvider } from './context/QuizContext.jsx'

export default function App() {
  return (
    <ThemeProvider>
      <QuizProvider>
        <div className="min-h-screen bg-white text-slate-900">
          <ProtectedRoute>
            <AppRoutes />
          </ProtectedRoute>
        </div>
      </QuizProvider>
    </ThemeProvider>
  )
}
