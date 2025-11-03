import AppRoutes from './routes.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { UserDataProvider } from './context/UserDataContext.jsx'

export default function App() {
  return (
    <ThemeProvider>
      <UserDataProvider>
        <div className="min-h-screen bg-white text-slate-900">
          <AppRoutes />
        </div>
      </UserDataProvider>
    </ThemeProvider>
  )
}
