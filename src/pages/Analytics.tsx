import { motion } from 'framer-motion'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ScatterChart, Scatter, ZAxis, Legend
} from 'recharts'
import { useEmployeeStore } from '../store/employeeStore'
import { TrendingUp, Award, Target, Activity } from 'lucide-react'

const radarData = [
  { metric: 'Productivity', score: 88 },
  { metric: 'Attendance', score: 94 },
  { metric: 'Performance', score: 91 },
  { metric: 'Collaboration', score: 85 },
  { metric: 'Innovation', score: 78 },
  { metric: 'Leadership', score: 82 },
]

const retentionData = [
  { month: 'Aug', hired: 4, left: 1, net: 3 },
  { month: 'Sep', hired: 6, left: 2, net: 4 },
  { month: 'Oct', hired: 3, left: 1, net: 2 },
  { month: 'Nov', hired: 2, left: 3, net: -1 },
  { month: 'Dec', hired: 5, left: 1, net: 4 },
  { month: 'Jan', hired: 7, left: 2, net: 5 },
  { month: 'Feb', hired: 4, left: 1, net: 3 },
]

const scatterData = [
  { salary: 95000, performance: 87, name: 'Omar H.' },
  { salary: 105000, performance: 91, name: 'Luna P.' },
  { salary: 110000, performance: 87, name: 'David T.' },
  { salary: 115000, performance: 95, name: 'Nadia K.' },
  { salary: 125000, performance: 92, name: 'Marcus R.' },
  { salary: 130000, performance: 88, name: 'Sofia M.' },
  { salary: 135000, performance: 89, name: 'Liam F.' },
  { salary: 138000, performance: 89, name: 'James K.' },
  { salary: 145000, performance: 96, name: 'Sarah C.' },
  { salary: 150000, performance: 94, name: 'Emily W.' },
  { salary: 165000, performance: 98, name: 'Aisha P.' },
]

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-card-dark px-4 py-3 text-xs">
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2 mb-1">
          <span className="text-slate-400">{p.name}:</span>
          <span className="text-white font-semibold">{p.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function Analytics() {
  const { employees, departments } = useEmployeeStore()

  const avgPerf = Math.round(employees.reduce((s, e) => s + e.performance, 0) / employees.length)
  const avgAttendance = Math.round(employees.reduce((s, e) => s + e.attendanceRate, 0) / employees.length)
  const topDept = [...departments].sort((a, b) => {
    const avgA = employees.filter(e => e.department === a.id).reduce((s, e) => s + e.performance, 0)
    const avgB = employees.filter(e => e.department === b.id).reduce((s, e) => s + e.performance, 0)
    return avgB - avgA
  })[0]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white font-['Space_Grotesk']">Analytics</h1>
        <p className="text-slate-500 text-sm mt-1">Deep insights into workforce performance and trends</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Avg Performance', value: `${avgPerf}%`, icon: Target, color: 'from-purple-500 to-indigo-600', trend: '+3% vs last month' },
          { label: 'Avg Attendance', value: `${avgAttendance}%`, icon: Activity, color: 'from-cyan-500 to-blue-600', trend: '+1% vs last month' },
          { label: 'Top Department', value: topDept?.name, icon: Award, color: 'from-amber-500 to-orange-600', trend: 'Highest avg performance' },
          { label: 'Team Health', value: '92/100', icon: TrendingUp, color: 'from-emerald-500 to-teal-600', trend: 'Excellent score' },
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
            <p className="text-2xl font-bold text-white mb-1">{s.value}</p>
            <p className="text-slate-400 text-sm">{s.label}</p>
            <p className="text-slate-600 text-xs mt-1">{s.trend}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Team Competency Radar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6"
        >
          <h2 className="text-white font-semibold mb-1">Team Competency Profile</h2>
          <p className="text-slate-500 text-xs mb-4">Average scores across key dimensions</p>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
              <PolarGrid stroke="rgba(255,255,255,0.05)" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: '#64748b', fontSize: 11 }} />
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#a855f7"
                fill="#a855f7"
                fillOpacity={0.15}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Hiring vs Attrition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass-card p-6"
        >
          <h2 className="text-white font-semibold mb-1">Hiring vs Attrition</h2>
          <p className="text-slate-500 text-xs mb-4">Monthly workforce changes (last 7 months)</p>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={retentionData} margin={{ left: -20, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '12px' }} />
              <Bar dataKey="hired" fill="#10b981" radius={[4, 4, 0, 0]} name="Hired" barSize={14} />
              <Bar dataKey="left" fill="#ef4444" radius={[4, 4, 0, 0]} name="Left" barSize={14} />
              <Line type="monotone" dataKey="net" stroke="#a855f7" strokeWidth={2} dot={{ fill: '#a855f7', r: 4 }} name="Net" />
            </ComposedChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Salary vs Performance Scatter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="glass-card p-6"
      >
        <h2 className="text-white font-semibold mb-1">Salary vs Performance Correlation</h2>
        <p className="text-slate-500 text-xs mb-4">Are your top performers being compensated fairly?</p>
        <ResponsiveContainer width="100%" height={240}>
          <ScatterChart margin={{ left: -10, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="salary"
              domain={[85000, 175000]}
              axisLine={false}
              tickLine={false}
              tickFormatter={v => `$${(v/1000).toFixed(0)}k`}
            />
            <YAxis
              type="number"
              dataKey="performance"
              domain={[75, 100]}
              axisLine={false}
              tickLine={false}
              tickFormatter={v => `${v}%`}
            />
            <ZAxis range={[60, 60]} />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null
                const d = payload[0]?.payload
                return (
                  <div className="glass-card-dark px-3 py-2 text-xs">
                    <p className="text-white font-semibold mb-1">{d?.name}</p>
                    <p className="text-slate-400">Salary: ${d?.salary?.toLocaleString()}</p>
                    <p className="text-slate-400">Performance: {d?.performance}%</p>
                  </div>
                )
              }}
            />
            <Scatter data={scatterData} fill="#6366f1" fillOpacity={0.8} />
          </ScatterChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  )
}
