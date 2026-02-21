import { motion } from 'framer-motion'
import { Users, DollarSign, TrendingUp, Building2 } from 'lucide-react'
import { useEmployeeStore } from '../store/employeeStore'

export default function Departments() {
  const { departments, employees } = useEmployeeStore()

  const getDeptEmployees = (deptId: string) =>
    employees.filter(e => e.department === deptId)

  const getDeptAvgPerformance = (deptId: string) => {
    const emps = getDeptEmployees(deptId)
    if (!emps.length) return 0
    return Math.round(emps.reduce((s, e) => s + e.performance, 0) / emps.length)
  }

  const getDeptAvgSalary = (deptId: string) => {
    const emps = getDeptEmployees(deptId)
    if (!emps.length) return 0
    return Math.round(emps.reduce((s, e) => s + e.salary, 0) / emps.length)
  }

  const totalBudget = departments.reduce((s, d) => s + d.budget, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white font-['Space_Grotesk']">Departments</h1>
        <p className="text-slate-500 text-sm mt-1">
          {departments.length} departments · {employees.length} total employees
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Total Departments', value: departments.length, icon: Building2, color: 'from-purple-500 to-indigo-600' },
          { label: 'Total Headcount', value: employees.length, icon: Users, color: 'from-cyan-500 to-blue-600' },
          { label: 'Total Budget', value: `$${(totalBudget/1000000).toFixed(1)}M`, icon: DollarSign, color: 'from-amber-500 to-orange-600' },
          { label: 'Avg Performance', value: `${Math.round(departments.reduce((s,d) => s + getDeptAvgPerformance(d.id), 0) / departments.length)}%`, icon: TrendingUp, color: 'from-emerald-500 to-teal-600' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="stat-card"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-slate-500 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Department Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {departments.map((dept, i) => {
          const emps = getDeptEmployees(dept.id)
          const avgPerf = getDeptAvgPerformance(dept.id)
          const avgSalary = getDeptAvgSalary(dept.id)
          const activeEmps = emps.filter(e => e.status === 'active' || e.status === 'remote')

          return (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="glass-card p-6 group hover:border-white/20 transition-all duration-300 cursor-pointer"
            >
              {/* Dept Header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: `${dept.color}20`, border: `1px solid ${dept.color}30` }}
                >
                  {dept.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{dept.name}</h3>
                  <p className="text-slate-500 text-xs">{dept.headCount} employees</p>
                </div>
              </div>

              {/* Budget */}
              <div className="flex items-center justify-between mb-4 p-3 rounded-xl bg-white/5">
                <div>
                  <p className="text-slate-500 text-xs">Annual Budget</p>
                  <p className="text-white font-semibold">${(dept.budget / 1000000).toFixed(1)}M</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-500 text-xs">Avg Salary</p>
                  <p className="text-white font-semibold">${(avgSalary / 1000).toFixed(0)}k</p>
                </div>
              </div>

              {/* Perf bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-500">Avg Performance</span>
                  <span className="text-white font-bold">{avgPerf}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${avgPerf}%` }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${dept.color}, ${dept.color}99)` }}
                  />
                </div>
              </div>

              {/* Status breakdown */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-slate-400">{activeEmps.length} active</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="text-slate-400">{emps.filter(e => e.status === 'on-leave').length} on leave</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-slate-500" />
                  <span className="text-slate-400">{emps.filter(e => e.status === 'inactive').length} inactive</span>
                </div>
              </div>

              {/* Top members */}
              {emps.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/5">
                  <p className="text-xs text-slate-600 mb-2">Team members</p>
                  <div className="flex -space-x-2">
                    {emps.slice(0, 5).map(e => (
                      <img
                        key={e.id}
                        src={e.avatar}
                        alt={`${e.firstName} ${e.lastName}`}
                        className="w-7 h-7 rounded-full border-2 border-dark-800 bg-dark-600"
                        title={`${e.firstName} ${e.lastName}`}
                      />
                    ))}
                    {emps.length > 5 && (
                      <div className="w-7 h-7 rounded-full border-2 border-dark-800 bg-dark-500 flex items-center justify-center text-xs text-slate-400">
                        +{emps.length - 5}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
