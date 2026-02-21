import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, getDay } from 'date-fns'
import { ChevronLeft, ChevronRight, UserCheck, UserX, Clock, Wifi } from 'lucide-react'
import { AttendanceRecord } from '../types'
import { fetchAllAttendance } from '../services/db'

const statusConfig = {
  present: { label: 'Present', icon: UserCheck, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  absent: { label: 'Absent', icon: UserX, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
  late: { label: 'Late', icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  'half-day': { label: 'Half Day', icon: Clock, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
  remote: { label: 'Remote', icon: Wifi, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20' },
}

export default function Attendance() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState<Date | null>(new Date())
  const [allRecords, setAllRecords] = useState<AttendanceRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchAllAttendance()
      .then(setAllRecords)
      .finally(() => setIsLoading(false))
  }, [])

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
  const firstDayOfWeek = getDay(monthStart)

  // Records for the selected day
  const selectedDateStr = selectedDay ? format(selectedDay, 'yyyy-MM-dd') : ''
  const dayRecords = allRecords.filter(r => r.date === selectedDateStr)

  // Days that have records (for dots in calendar)
  const datesWithData = new Set(allRecords.map(r => r.date))

  const summary = {
    present: dayRecords.filter(r => r.status === 'present').length,
    remote: dayRecords.filter(r => r.status === 'remote').length,
    absent: dayRecords.filter(r => r.status === 'absent').length,
    late: dayRecords.filter(r => r.status === 'late').length,
  }

  const prevMonth = () => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))
  const nextMonth = () => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white font-['Space_Grotesk']">Attendance</h1>
        <p className="text-slate-500 text-sm mt-1">Track employee attendance and punctuality</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Present', value: summary.present, icon: UserCheck, color: 'from-emerald-500 to-teal-600' },
          { label: 'Remote', value: summary.remote, icon: Wifi, color: 'from-cyan-500 to-blue-600' },
          { label: 'Late', value: summary.late, icon: Clock, color: 'from-amber-500 to-orange-600' },
          { label: 'Absent', value: summary.absent, icon: UserX, color: 'from-red-500 to-pink-600' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="stat-card"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-white">{s.value}</p>
            <p className="text-slate-500 text-sm">{s.label} today</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="xl:col-span-2 glass-card p-5"
        >
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold">{format(currentDate, 'MMMM yyyy')}</h2>
            <div className="flex gap-1">
              <button onClick={prevMonth} className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-all">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={nextMonth} className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-all">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
              <div key={d} className="text-center text-xs text-slate-600 py-1 font-medium">{d}</div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {days.map(day => {
              const isSelected = selectedDay && isSameDay(day, selectedDay)
              const isToday = isSameDay(day, new Date())
              const hasData = datesWithData.has(format(day, 'yyyy-MM-dd'))

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDay(day)}
                  className={`
                    aspect-square flex items-center justify-center text-sm rounded-lg transition-all duration-150 relative
                    ${isSelected ? 'bg-purple-600 text-white' :
                      isToday ? 'bg-purple-600/20 border border-purple-500/50 text-white' :
                      'text-slate-400 hover:bg-white/5 hover:text-white'}
                  `}
                >
                  {format(day, 'd')}
                  {hasData && !isSelected && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-400" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-3 text-xs text-slate-500">
            {[
              { color: 'bg-emerald-400', label: 'Present' },
              { color: 'bg-cyan-400', label: 'Remote' },
              { color: 'bg-amber-400', label: 'Late' },
              { color: 'bg-red-400', label: 'Absent' },
            ].map(l => (
              <span key={l.label} className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${l.color}`} />
                {l.label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Attendance Records */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="xl:col-span-3 glass-card overflow-hidden"
        >
          <div className="p-5 border-b border-white/5 flex items-center justify-between">
            <div>
              <h2 className="text-white font-semibold">Daily Records</h2>
              <p className="text-slate-500 text-xs mt-0.5">
                {selectedDay ? format(selectedDay, 'MMMM d, yyyy') : 'Select a date'}
              </p>
            </div>
            <span className="badge badge-purple">{dayRecords.length} records</span>
          </div>
          <div className="overflow-y-auto max-h-96">
            {isLoading ? (
              <div className="flex items-center justify-center py-16 text-slate-500 text-sm">
                Loading attendance data...
              </div>
            ) : dayRecords.length === 0 ? (
              <div className="flex items-center justify-center py-16 text-slate-500 text-sm">
                No records for this date
              </div>
            ) : (
              <table className="w-full">
                <thead className="sticky top-0 bg-dark-800">
                  <tr className="border-b border-white/5">
                    {['Employee', 'Status', 'Check In', 'Check Out', 'Hours'].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dayRecords.map((rec, i) => {
                    const cfg = statusConfig[rec.status]
                    return (
                      <motion.tr
                        key={rec.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.04 }}
                        className="data-table-row"
                      >
                        <td className="px-4 py-3">
                          <p className="text-white text-sm font-medium">{rec.employeeName}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`badge border ${cfg.bg} ${cfg.color} text-xs`}>
                            {cfg.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-400 text-sm">{rec.checkIn || '—'}</td>
                        <td className="px-4 py-3 text-slate-400 text-sm">{rec.checkOut || '—'}</td>
                        <td className="px-4 py-3 text-slate-200 text-sm font-medium">
                          {rec.hoursWorked > 0 ? `${rec.hoursWorked}h` : '—'}
                        </td>
                      </motion.tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
