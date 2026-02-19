import { motion } from 'framer-motion'
import {
  Users, TrendingUp, UserCheck, DollarSign,
  ArrowUp, ArrowDown, Clock, Star, MoreHorizontal
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { useEmployeeStore } from '../store/employeeStore'
import { monthlyHeadcountData, attendanceTrendData, salaryByDepartment } from '../data/mockData'
import { useAuth } from '../contexts/AuthContext'

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
}

const DEPT_COLORS = ['#6366f1', '#a855f7', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#14b8a6']

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-card-dark px-4 py-3 text-xs">
      <p className="text-slate-400 mb-2 font-medium">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-slate-400">{p.name}:</span>
          <span className="text-white font-semibold">{p.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const { user } = useAuth()
  const { employees, departments } = useEmployeeStore()

  const activeCount = employees.filter(e => e.status === 'active').length
  const remoteCount = employees.filter(e => e.status === 'remote').length
  const onLeaveCount = employees.filter(e => e.status === 'on-leave').length
  const avgSalary = Math.round(employees.reduce((s, e) => s + e.salary, 0) / employees.length)
  const avgPerformance = Math.round(employees.reduce((s, e) => s + e.performance, 0) / employees.length)

  const deptPieData = departments.map(d => ({ name: d.name, value: d.headCount }))

  const recentEmployees = [...employees]
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
    .slice(0, 5)

  const topPerformers = [...employees]
    .sort((a, b) => b.performance - a.performance)
    .slice(0, 4)

  const stats = [
    {
      label: 'Total Employees', value: employees.length, change: '+4', trend: 'up',
      icon: Users, color: 'from-purple-500 to-indigo-600', glow: 'shadow-neon-purple',
    },
    {
      label: 'Active Today', value: activeCount + remoteCount, change: '+2', trend: 'up',
      icon: UserCheck, color: 'from-cyan-500 to-blue-600', glow: 'shadow-neon-cyan',
    },
    {
      label: 'Avg Performance', value: `${avgPerformance}%`, change: '+3%', trend: 'up',
      icon: TrendingUp, color: 'from-emerald-500 to-teal-600', glow: '',
    },
    {
      label: 'Avg Salary', value: `$${(avgSalary / 1000).toFixed(0)}k`, change: '+2.1%', trend: 'up',
      icon: DollarSign, color: 'from-amber-500 to-orange-600', glow: '',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white font-['Space_Grotesk']">
          Good morning, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Here's what's happening with your team today
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="stat-card group"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent" />
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center ${stat.glow}`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <button className="text-slate-600 hover:text-slate-400 transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            <div>
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-slate-400 text-sm mb-3">{stat.label}</p>
              <div className="flex items-center gap-1.5">
                {stat.trend === 'up'
                  ? <ArrowUp className="w-3 h-3 text-emerald-400" />
                  : <ArrowDown className="w-3 h-3 text-red-400" />
                }
                <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {stat.change}
                </span>
                <span className="text-slate-600 text-xs">vs last month</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Attendance Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="xl:col-span-2 glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-white font-semibold">Attendance Overview</h2>
              <p className="text-slate-500 text-xs mt-0.5">Last 7 working days</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" />Present</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-cyan-500 inline-block" />Remote</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500/70 inline-block" />Absent</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={attendanceTrendData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="gPresent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gRemote" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="present" stroke="#6366f1" fill="url(#gPresent)" strokeWidth={2} name="Present" />
              <Area type="monotone" dataKey="remote" stroke="#06b6d4" fill="url(#gRemote)" strokeWidth={2} name="Remote" />
              <Area type="monotone" dataKey="absent" stroke="#ef4444" fill="none" strokeWidth={2} strokeDasharray="4 4" name="Absent" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Department Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6"
        >
          <h2 className="text-white font-semibold mb-1">By Department</h2>
          <p className="text-slate-500 text-xs mb-4">Headcount distribution</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={deptPieData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
              >
                {deptPieData.map((_, i) => (
                  <Cell key={i} fill={DEPT_COLORS[i % DEPT_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {departments.slice(0, 4).map((d, i) => (
              <div key={d.id} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: DEPT_COLORS[i] }} />
                  <span className="text-slate-400">{d.name}</span>
                </div>
                <span className="text-white font-medium">{d.headCount}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Salary by Department */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-6"
        >
          <h2 className="text-white font-semibold mb-1">Avg Salary</h2>
          <p className="text-slate-500 text-xs mb-4">By department ($)</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={salaryByDepartment} margin={{ left: -20, right: 0 }} barSize={12}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="dept" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} formatter={(v: number) => [`$${v.toLocaleString()}`, 'Avg Salary']} />
              <Bar dataKey="avg" radius={[6, 6, 0, 0]} fill="url(#barGrad)" name="Avg Salary" />
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Top Performers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="glass-card p-6"
        >
          <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400" />
            Top Performers
          </h2>
          <div className="space-y-3">
            {topPerformers.map((emp, i) => (
              <div key={emp.id} className="flex items-center gap-3">
                <span className={`w-5 text-xs font-bold ${i === 0 ? 'text-amber-400' : 'text-slate-500'}`}>
                  #{i + 1}
                </span>
                <img src={emp.avatar} className="w-8 h-8 rounded-full bg-dark-600" alt="" />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-medium truncate">{emp.firstName} {emp.lastName}</p>
                  <p className="text-slate-500 text-xs truncate">{emp.position}</p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
                      style={{ width: `${emp.performance}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-white">{emp.performance}%</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Hires */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-card p-6"
        >
          <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            Recent Hires
          </h2>
          <div className="space-y-3">
            {recentEmployees.map(emp => (
              <div key={emp.id} className="flex items-center gap-3">
                <img src={emp.avatar} className="w-8 h-8 rounded-full bg-dark-600" alt="" />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-medium truncate">{emp.firstName} {emp.lastName}</p>
                  <p className="text-slate-500 text-xs truncate">{emp.departmentName}</p>
                </div>
                <span className="text-slate-600 text-xs whitespace-nowrap">
                  {new Date(emp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
