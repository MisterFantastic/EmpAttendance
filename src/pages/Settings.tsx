import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Shield, Bell, Palette, Globe, Save } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const providerBadges = {
  google: { label: 'Google', color: 'bg-blue-500/10 border-blue-500/20 text-blue-400' },
  microsoft: { label: 'Microsoft', color: 'bg-purple-500/10 border-purple-500/20 text-purple-400' },
  github: { label: 'GitHub', color: 'bg-slate-500/10 border-slate-500/20 text-slate-300' },
}

export default function Settings() {
  const { user, logout } = useAuth()
  const [notifications, setNotifications] = useState({
    leaveRequests: true,
    performanceReviews: true,
    payroll: false,
    newHires: true,
    attrition: true,
  })
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    await new Promise(r => setTimeout(r, 500))
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white font-['Space_Grotesk']">Settings</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your account and preferences</p>
      </div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-2 mb-5">
          <User className="w-4 h-4 text-purple-400" />
          <h2 className="text-white font-semibold">Profile</h2>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-16 h-16 rounded-2xl bg-dark-600 border border-white/10"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-dark-800" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">{user?.name}</h3>
            <p className="text-slate-400 text-sm">{user?.email}</p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className={`badge border text-xs ${providerBadges[user?.provider || 'google'].color}`}>
                via {providerBadges[user?.provider || 'google'].label}
              </span>
              <span className="badge badge-purple capitalize">{user?.role}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-slate-500 font-medium mb-1.5 block">Display Name</label>
            <input defaultValue={user?.name} className="glass-input text-sm" />
          </div>
          <div>
            <label className="text-xs text-slate-500 font-medium mb-1.5 block">Email</label>
            <input defaultValue={user?.email} disabled className="glass-input text-sm opacity-50 cursor-not-allowed" />
          </div>
        </div>
      </motion.div>

      {/* Security */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-2 mb-5">
          <Shield className="w-4 h-4 text-cyan-400" />
          <h2 className="text-white font-semibold">Security & Authentication</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
            <div>
              <p className="text-white text-sm font-medium">Federated Identity</p>
              <p className="text-slate-500 text-xs mt-0.5">
                Authenticated via {user?.provider} SSO · Session managed by your identity provider
              </p>
            </div>
            <span className="badge badge-green">Active</span>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
            <div>
              <p className="text-white text-sm font-medium">Multi-Factor Authentication</p>
              <p className="text-slate-500 text-xs mt-0.5">Enabled through your identity provider</p>
            </div>
            <span className="badge badge-green">Enabled</span>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
            <div>
              <p className="text-white text-sm font-medium">Session Timeout</p>
              <p className="text-slate-500 text-xs mt-0.5">Auto-logout after inactivity</p>
            </div>
            <select className="glass-input text-sm py-1.5 w-auto">
              <option>30 minutes</option>
              <option>1 hour</option>
              <option>4 hours</option>
              <option>8 hours</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-2 mb-5">
          <Bell className="w-4 h-4 text-amber-400" />
          <h2 className="text-white font-semibold">Notifications</h2>
        </div>
        <div className="space-y-3">
          {Object.entries(notifications).map(([key, val]) => (
            <div key={key} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
              <div>
                <p className="text-white text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
              </div>
              <button
                onClick={() => setNotifications(prev => ({ ...prev, [key]: !val }))}
                className={`relative w-10 h-5 rounded-full transition-all duration-200 ${val ? 'bg-purple-600' : 'bg-white/10'}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${val ? 'left-5.5 translate-x-0.5' : 'left-0.5'}`} />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Save button */}
      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          className="btn-primary flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          {saved ? 'Saved!' : 'Save Changes'}
        </motion.button>
        <button
          onClick={logout}
          className="px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-all"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}
