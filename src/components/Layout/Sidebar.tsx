import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Users, Building2, CalendarCheck,
  Settings, ChevronLeft, ChevronRight, Zap, LogOut,
  TrendingUp, Bell
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useState } from 'react'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/employees', icon: Users, label: 'Employees' },
  { to: '/departments', icon: Building2, label: 'Departments' },
  { to: '/attendance', icon: CalendarCheck, label: 'Attendance' },
  { to: '/analytics', icon: TrendingUp, label: 'Analytics' },
]

const bottomItems = [
  { to: '/notifications', icon: Bell, label: 'Notifications', badge: 3 },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { user, logout } = useAuth()
  const location = useLocation()

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="h-screen bg-dark-800/80 backdrop-blur-xl border-r border-white/5 flex flex-col relative z-30 flex-shrink-0"
    >
      {/* Logo */}
      <div className="p-4 flex items-center gap-3 border-b border-white/5 h-16">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-neon-purple">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="text-lg font-bold text-white font-['Space_Grotesk'] whitespace-nowrap"
            >
              NexHR
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + '/')
          return (
            <NavLink
              key={item.to}
              to={item.to}
              title={collapsed ? item.label : undefined}
              className={`
                sidebar-link group relative
                ${isActive ? 'active' : ''}
                ${collapsed ? 'justify-center px-3' : ''}
              `}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-purple-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="text-sm whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute right-2 w-1.5 h-1.5 rounded-full bg-purple-400"
                />
              )}
            </NavLink>
          )
        })}

        <div className="pt-4 mt-4 border-t border-white/5 space-y-1">
          {bottomItems.map((item) => {
            const isActive = location.pathname === item.to
            return (
              <NavLink
                key={item.to}
                to={item.to}
                title={collapsed ? item.label : undefined}
                className={`
                  sidebar-link group relative
                  ${isActive ? 'active' : ''}
                  ${collapsed ? 'justify-center px-3' : ''}
                `}
              >
                <div className="relative flex-shrink-0">
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-purple-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                  {'badge' in item && item.badge && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center font-bold">
                      {item.badge}
                    </span>
                  )}
                </div>
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="text-sm whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </NavLink>
            )
          })}
        </div>
      </nav>

      {/* User profile */}
      <div className="p-3 border-t border-white/5">
        <div className={`flex items-center gap-3 px-3 py-2 rounded-xl ${collapsed ? 'justify-center' : ''}`}>
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-8 h-8 rounded-full border border-white/10 flex-shrink-0 bg-dark-600"
          />
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex-1 min-w-0"
              >
                <p className="text-white text-xs font-medium truncate">{user?.name}</p>
                <p className="text-slate-500 text-xs truncate capitalize">{user?.role}</p>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {!collapsed && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={logout}
                className="text-slate-500 hover:text-red-400 transition-colors p-1"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-dark-600 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors z-10"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </motion.aside>
  )
}
