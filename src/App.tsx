import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { useEmployeeStore } from './store/employeeStore'
import { isDatabaseEmpty, seedDatabase } from './services/db'
import { employees, departments, attendanceRecords } from './data/mockData'

import Login from './pages/Login'
import AppLayout from './components/Layout/AppLayout'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import Departments from './pages/Departments'
import Attendance from './pages/Attendance'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import Notifications from './pages/Notifications'

/** Initializes Supabase with seed data on first boot, then loads all data into the store. */
function DatabaseInitializer() {
  const fetchAll = useEmployeeStore(s => s.fetchAll)

  useEffect(() => {
    async function init() {
      try {
        const empty = await isDatabaseEmpty()
        if (empty) {
          await seedDatabase(employees, departments, attendanceRecords)
        }
        await fetchAll()
      } catch (err) {
        console.error('Database initialization failed:', err)
      }
    }
    init()
  }, [fetchAll])

  return null
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
        className="w-10 h-10 border-3 border-purple-600 border-t-transparent rounded-full"
        style={{ borderWidth: 3 }}
      />
    </div>
  )
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  if (isLoading) return <LoadingScreen />
  if (!user) return <Navigate to="/login" replace />
  return (
    <>
      <DatabaseInitializer />
      {children}
    </>
  )
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  if (isLoading) return <LoadingScreen />
  if (user) return <Navigate to="/dashboard" replace />
  return <>{children}</>
}

const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.25 },
}

function AnimatedPage({ children }: { children: React.ReactNode }) {
  return (
    <motion.div {...pageTransition}>
      {children}
    </motion.div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<AnimatedPage><Dashboard /></AnimatedPage>} />
            <Route path="employees" element={<AnimatedPage><Employees /></AnimatedPage>} />
            <Route path="departments" element={<AnimatedPage><Departments /></AnimatedPage>} />
            <Route path="attendance" element={<AnimatedPage><Attendance /></AnimatedPage>} />
            <Route path="analytics" element={<AnimatedPage><Analytics /></AnimatedPage>} />
            <Route path="notifications" element={<AnimatedPage><Notifications /></AnimatedPage>} />
            <Route path="settings" element={<AnimatedPage><Settings /></AnimatedPage>} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
