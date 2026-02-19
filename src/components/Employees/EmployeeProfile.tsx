import { motion } from 'framer-motion'
import {
  X, Mail, Phone, MapPin, Calendar, TrendingUp,
  Building2, User, Edit3, DollarSign, CheckCircle, Clock
} from 'lucide-react'
import { Employee } from '../../types'
import { format } from 'date-fns'

interface Props {
  employee: Employee
  onClose: () => void
  onEdit: (emp: Employee) => void
}

const statusConfig = {
  active: { label: 'Active', className: 'badge-green' },
  inactive: { label: 'Inactive', className: 'badge-red' },
  'on-leave': { label: 'On Leave', className: 'badge-yellow' },
  remote: { label: 'Remote', className: 'badge-blue' },
}

export default function EmployeeProfile({ employee: emp, onClose, onEdit }: Props) {
  const tenure = Math.floor(
    (new Date().getTime() - new Date(emp.startDate).getTime()) / (1000 * 60 * 60 * 24 * 365)
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="glass-card w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-glass"
        onClick={e => e.stopPropagation()}
      >
        {/* Hero */}
        <div className="relative p-6 pb-0">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent rounded-t-2xl" />
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-slate-500 hover:text-white transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative flex items-start gap-4 pb-6">
            <div className="relative">
              <img
                src={emp.avatar}
                alt={`${emp.firstName} ${emp.lastName}`}
                className="w-20 h-20 rounded-2xl bg-dark-600 border border-white/10"
              />
              <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-dark-800 ${
                emp.status === 'active' ? 'bg-emerald-400' :
                emp.status === 'remote' ? 'bg-blue-400' :
                emp.status === 'on-leave' ? 'bg-amber-400' : 'bg-slate-500'
              }`} />
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-bold text-white font-['Space_Grotesk']">
                {emp.firstName} {emp.lastName}
              </h2>
              <p className="text-slate-400 text-sm">{emp.position}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`badge ${statusConfig[emp.status].className}`}>
                  {statusConfig[emp.status].label}
                </span>
                <span className="text-slate-600 text-xs">·</span>
                <span className="text-slate-400 text-xs">{emp.departmentName}</span>
              </div>
            </div>

            <button
              onClick={() => onEdit(emp)}
              className="btn-secondary text-sm flex items-center gap-1.5 flex-shrink-0"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 px-6 pb-4">
          {[
            { label: 'Performance', value: `${emp.performance}%`, color: 'text-purple-400' },
            { label: 'Attendance', value: `${emp.attendanceRate}%`, color: 'text-cyan-400' },
            { label: 'Tenure', value: `${tenure}y`, color: 'text-emerald-400' },
          ].map(s => (
            <div key={s.label} className="glass-card-dark p-3 text-center">
              <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
              <p className="text-slate-500 text-xs">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Details */}
        <div className="px-6 pb-6 space-y-4">
          <div className="glass-card-dark rounded-xl p-4 space-y-3">
            {[
              { icon: Mail, label: 'Email', value: emp.email },
              { icon: Phone, label: 'Phone', value: emp.phone },
              { icon: MapPin, label: 'Location', value: emp.location },
              { icon: Building2, label: 'Department', value: emp.departmentName },
              { icon: User, label: 'Manager', value: emp.manager || '—' },
              { icon: Calendar, label: 'Start Date', value: format(new Date(emp.startDate), 'MMM d, yyyy') },
              { icon: DollarSign, label: 'Salary', value: `$${emp.salary.toLocaleString()} / year` },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3 text-sm">
                <item.icon className="w-4 h-4 text-slate-600 flex-shrink-0" />
                <span className="text-slate-500 w-24 flex-shrink-0">{item.label}</span>
                <span className="text-slate-200">{item.value}</span>
              </div>
            ))}
          </div>

          {/* Skills */}
          {emp.skills.length > 0 && (
            <div>
              <h3 className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {emp.skills.map(skill => (
                  <span key={skill} className="px-3 py-1 rounded-lg text-sm bg-white/5 border border-white/10 text-slate-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Performance bar */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Performance Score</span>
              <span className="text-white text-sm font-bold">{emp.performance}%</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${emp.performance}%` }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
              />
            </div>
          </div>

          {/* Attendance bar */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Attendance Rate</span>
              <span className="text-white text-sm font-bold">{emp.attendanceRate}%</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${emp.attendanceRate}%` }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
