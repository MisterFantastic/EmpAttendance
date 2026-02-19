import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex h-screen bg-dark-900 overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-indigo-900/10 rounded-full blur-3xl" />
      </div>

      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
