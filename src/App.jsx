import AppRoutes from './routes.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white text-slate-900">
        <AppRoutes />
      </div>
    </ThemeProvider>
  )
}
