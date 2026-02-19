import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, CheckCheck, Trash2, Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'

const initialNotifications = [
  { id: '1', type: 'warning' as const, title: 'Leave Request Pending', message: 'Luna Park has submitted a leave request for Feb 20-25. Please review and approve.', time: '5 minutes ago', read: false },
  { id: '2', type: 'info' as const, title: 'Q4 Performance Reviews Due', message: 'Performance reviews for Q4 2025 are due in 3 days. 12 employees still pending review.', time: '1 hour ago', read: false },
  { id: '3', type: 'success' as const, title: 'New Employee Onboarded', message: 'Sofia Martinez has successfully completed onboarding and joined the Engineering team.', time: '2 hours ago', read: false },
  { id: '4', type: 'success' as const, title: 'Payroll Processed', message: 'February payroll has been processed successfully for all 80 employees.', time: '1 day ago', read: true },
  { id: '5', type: 'info' as const, title: 'Training Reminder', message: 'Annual compliance training is due for 23 employees by end of month.', time: '2 days ago', read: true },
  { id: '6', type: 'error' as const, title: 'High Absence Rate Alert', message: 'Absence rate in Sales department is 12% this week, above the 8% threshold.', time: '3 days ago', read: true },
]

const typeConfig = {
  info: { icon: Info, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
  success: { icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  warning: { icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  error: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
}

export default function Notifications() {
  const [notes, setNotes] = useState(initialNotifications)

  const markAllRead = () => setNotes(n => n.map(x => ({ ...x, read: true })))
  const markRead = (id: string) => setNotes(n => n.map(x => x.id === id ? { ...x, read: true } : x))
  const deleteNote = (id: string) => setNotes(n => n.filter(x => x.id !== id))

  const unread = notes.filter(n => !n.read).length

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-['Space_Grotesk']">Notifications</h1>
          <p className="text-slate-500 text-sm mt-1">{unread} unread · {notes.length} total</p>
        </div>
        {unread > 0 && (
          <button onClick={markAllRead} className="btn-secondary flex items-center gap-2 text-sm">
            <CheckCheck className="w-4 h-4" />
            Mark all read
          </button>
        )}
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {notes.map((note) => {
            const cfg = typeConfig[note.type]
            return (
              <motion.div
                key={note.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`glass-card p-4 relative ${!note.read ? 'border-l-2 border-l-purple-500' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center flex-shrink-0 ${cfg.bg}`}>
                    <cfg.icon className={`w-4 h-4 ${cfg.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm font-medium ${note.read ? 'text-slate-300' : 'text-white'}`}>
                        {note.title}
                      </p>
                      {!note.read && (
                        <div className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0 mt-1.5" />
                      )}
                    </div>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">{note.message}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-slate-600 text-xs">{note.time}</span>
                      {!note.read && (
                        <button onClick={() => markRead(note.id)} className="text-purple-400 text-xs hover:underline">
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="p-1.5 text-slate-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all flex-shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {notes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-12 text-center"
          >
            <Bell className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-500">No notifications</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
