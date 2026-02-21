import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Plus, Grid, List,
  Mail, MapPin, TrendingUp, Trash2, Edit3, Eye, X, Users
} from 'lucide-react'
import { useEmployeeStore } from '../store/employeeStore'
import { Employee } from '../types'
import EmployeeForm from '../components/Employees/EmployeeForm'
import EmployeeProfile from '../components/Employees/EmployeeProfile'

const statusConfig = {
  active: { label: 'Active', className: 'badge-green' },
  inactive: { label: 'Inactive', className: 'badge-red' },
  'on-leave': { label: 'On Leave', className: 'badge-yellow' },
  remote: { label: 'Remote', className: 'badge-blue' },
}

export default function Employees() {
  const {
    employees, departments, searchQuery, selectedDepartment, selectedStatus,
    setSearchQuery, setSelectedDepartment, setSelectedStatus, filteredEmployees,
    deleteEmployee
  } = useEmployeeStore()

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showForm, setShowForm] = useState(false)
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null)
  const [viewEmployee, setViewEmployee] = useState<Employee | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const filtered = filteredEmployees()

  const handleDelete = (id: string) => {
    deleteEmployee(id)
    setDeleteConfirm(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-['Space_Grotesk']">Employees</h1>
          <p className="text-slate-500 text-sm mt-1">{employees.length} total · {filtered.length} shown</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => { setEditEmployee(null); setShowForm(true) }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Employee
        </motion.button>
      </div>

      {/* Filters Bar */}
      <div className="glass-card p-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by name, role, email..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="glass-input pl-9 py-2 text-sm"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <select
          value={selectedDepartment}
          onChange={e => setSelectedDepartment(e.target.value)}
          className="glass-input py-2 text-sm w-auto pr-8"
        >
          <option value="all">All Departments</option>
          {departments.map(d => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>

        <select
          value={selectedStatus}
          onChange={e => setSelectedStatus(e.target.value)}
          className="glass-input py-2 text-sm w-auto pr-8"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="remote">Remote</option>
          <option value="on-leave">On Leave</option>
          <option value="inactive">Inactive</option>
        </select>

        <div className="flex items-center gap-1 ml-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-white'}`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-white'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Employees Grid */}
      {viewMode === 'grid' ? (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map(emp => (
              <motion.div
                key={emp.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="glass-card p-5 group hover:border-purple-500/20 transition-all duration-300 cursor-pointer"
                onClick={() => setViewEmployee(emp)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={emp.avatar}
                        alt={`${emp.firstName} ${emp.lastName}`}
                        className="w-12 h-12 rounded-xl bg-dark-600"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-dark-800 ${
                        emp.status === 'active' ? 'bg-emerald-400' :
                        emp.status === 'remote' ? 'bg-blue-400' :
                        emp.status === 'on-leave' ? 'bg-amber-400' : 'bg-slate-500'
                      }`} />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">
                        {emp.firstName} {emp.lastName}
                      </p>
                      <p className="text-slate-500 text-xs">{emp.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => { setEditEmployee(emp); setShowForm(true) }}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(emp.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Mail className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                    <span className="truncate">{emp.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                    <span className="truncate">{emp.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`badge ${statusConfig[emp.status].className} text-xs`}>
                    {statusConfig[emp.status].label}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-slate-600" />
                    <span className="text-xs text-white font-semibold">{emp.performance}%</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-white/5">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                    <span>{emp.departmentName}</span>
                    <span>${(emp.salary / 1000).toFixed(0)}k/yr</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {emp.skills.slice(0, 3).map(skill => (
                      <span key={skill} className="px-2 py-0.5 rounded text-xs bg-white/5 text-slate-400 border border-white/5">
                        {skill}
                      </span>
                    ))}
                    {emp.skills.length > 3 && (
                      <span className="px-2 py-0.5 rounded text-xs bg-white/5 text-slate-500">+{emp.skills.length - 3}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* List View */
        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {['Employee', 'Department', 'Status', 'Performance', 'Salary', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.map((emp, i) => (
                  <motion.tr
                    key={emp.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="data-table-row cursor-pointer"
                    onClick={() => setViewEmployee(emp)}
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <img src={emp.avatar} className="w-8 h-8 rounded-lg bg-dark-600" alt="" />
                        <div>
                          <p className="text-white text-sm font-medium">{emp.firstName} {emp.lastName}</p>
                          <p className="text-slate-500 text-xs">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-slate-300 text-sm">{emp.departmentName}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`badge ${statusConfig[emp.status].className}`}>
                        {statusConfig[emp.status].label}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
                            style={{ width: `${emp.performance}%` }}
                          />
                        </div>
                        <span className="text-white text-xs font-semibold">{emp.performance}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-white text-sm">${emp.salary.toLocaleString()}</span>
                    </td>
                    <td className="px-5 py-3" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center gap-1">
                        <button onClick={() => setViewEmployee(emp)} className="p-1.5 text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => { setEditEmployee(emp); setShowForm(true) }} className="p-1.5 text-slate-500 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDeleteConfirm(emp.id)} className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              <Users className="w-8 h-8 mx-auto mb-3 opacity-30" />
              <p>No employees match your filters</p>
            </div>
          )}
        </div>
      )}

      {/* Employee Form Modal */}
      <AnimatePresence>
        {showForm && (
          <EmployeeForm
            employee={editEmployee}
            onClose={() => { setShowForm(false); setEditEmployee(null) }}
          />
        )}
      </AnimatePresence>

      {/* Employee Profile Modal */}
      <AnimatePresence>
        {viewEmployee && (
          <EmployeeProfile
            employee={viewEmployee}
            onClose={() => setViewEmployee(null)}
            onEdit={(emp) => { setEditEmployee(emp); setViewEmployee(null); setShowForm(true) }}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="glass-card p-6 max-w-sm w-full"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-white font-semibold mb-2">Delete Employee</h3>
              <p className="text-slate-400 text-sm mb-6">This action cannot be undone. The employee record will be permanently removed.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="btn-secondary flex-1">Cancel</button>
                <button onClick={() => handleDelete(deleteConfirm)} className="btn-danger flex-1">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

