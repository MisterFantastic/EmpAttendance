import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Search, ChevronDown, LogOut, User, Settings } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const notifications = [
  { id: 1, text: 'Luna Park submitted a leave request', time: '5m ago', unread: true },
  { id: 2, text: 'Q4 performance reviews due in 3 days', time: '1h ago', unread: true },
  { id: 3, text: 'New employee Sofia Martinez onboarded', time: '2h ago', unread: true },
  { id: 4, text: 'Payroll processing completed', time: '1d ago', unread: false },
]

export default function Header() {
  const { user, logout } = useAuth()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <header className="h-16 bg-dark-800/60 backdrop-blur-xl border-b border-white/5 flex items-center px-6 gap-4 relative z-20">
      {/* Search */}
      <div className="flex-1 max-w-md relative">
        <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${searchFocused ? 'text-purple-400' : 'text-slate-500'}`} />
        <input
          type="text"
          placeholder="Search employees, departments..."
          className="glass-input pl-9 py-2 text-sm w-full"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs text-slate-600 border border-white/10">
          ⌘K
        </kbd>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false) }}
            className="relative w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-80 glass-card shadow-glass overflow-hidden"
              >
                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                  <h3 className="text-white font-semibold text-sm">Notifications</h3>
                  <span className="badge badge-purple">{unreadCount} new</span>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map(n => (
                    <div key={n.id} className={`p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors ${n.unread ? 'bg-purple-500/5' : ''}`}>
                      <p className="text-sm text-slate-300">{n.text}</p>
                      <p className="text-xs text-slate-500 mt-1">{n.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center">
                  <button className="text-purple-400 text-xs hover:underline">View all notifications</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false) }}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          >
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-7 h-7 rounded-full bg-dark-600"
            />
            <div className="hidden md:block text-left">
              <p className="text-white text-xs font-medium leading-tight">{user?.name}</p>
              <p className="text-slate-500 text-xs capitalize">{user?.role}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-56 glass-card shadow-glass overflow-hidden"
              >
                <div className="p-4 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <img src={user?.avatar} className="w-10 h-10 rounded-full bg-dark-600" alt="" />
                    <div>
                      <p className="text-white font-medium text-sm">{user?.name}</p>
                      <p className="text-slate-400 text-xs">{user?.email}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5">
                    <img
                      src={user?.provider === 'google' ? 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg' : undefined}
                      className="w-3.5 h-3.5"
                      alt=""
                    />
                    <span className="text-xs text-slate-500 capitalize">via {user?.provider}</span>
                  </div>
                </div>
                <div className="p-2">
                  {[
                    { icon: User, label: 'My Profile' },
                    { icon: Settings, label: 'Settings' },
                  ].map(item => (
                    <button key={item.label} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors text-sm">
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  ))}
                  <div className="border-t border-white/5 mt-2 pt-2">
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors text-sm"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Click outside handler */}
      {(showNotifications || showProfile) && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => { setShowNotifications(false); setShowProfile(false) }}
        />
      )}
    </header>
  )
}
