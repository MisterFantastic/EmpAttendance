import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Save, User } from 'lucide-react'
import { Employee } from '../../types'
import { useEmployeeStore } from '../../store/employeeStore'

interface Props {
  employee: Employee | null
  onClose: () => void
}

const defaultForm = {
  firstName: '', lastName: '', email: '', phone: '',
  position: '', department: 'eng', departmentName: 'Engineering',
  salary: 80000, startDate: new Date().toISOString().split('T')[0],
  status: 'active' as Employee['status'],
  location: '', manager: '',
  skills: [] as string[],
  performance: 80, attendanceRate: 95,
  avatar: '',
}

const deptMap: Record<string, string> = {
  eng: 'Engineering', design: 'Design', sales: 'Sales',
  hr: 'Human Resources', finance: 'Finance', marketing: 'Marketing', ops: 'Operations',
}

export default function EmployeeForm({ employee, onClose }: Props) {
  const { addEmployee, updateEmployee, departments } = useEmployeeStore()
  const [form, setForm] = useState(employee ? { ...employee } : { ...defaultForm })
  const [skillInput, setSkillInput] = useState('')
  const [saving, setSaving] = useState(false)

  const set = (key: string, value: any) => setForm(prev => ({ ...prev, [key]: value }))

  const handleSave = async () => {
    if (!form.firstName || !form.lastName || !form.email) return
    setSaving(true)
    await new Promise(r => setTimeout(r, 600))
    const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${form.firstName}${form.lastName}`
    const deptName = deptMap[form.department] || form.department
    if (employee) {
      updateEmployee(employee.id, { ...form, avatar, departmentName: deptName })
    } else {
      addEmployee({ ...form as any, avatar, departmentName: deptName })
    }
    setSaving(false)
    onClose()
  }

  const addSkill = () => {
    if (skillInput.trim() && !form.skills.includes(skillInput.trim())) {
      set('skills', [...form.skills, skillInput.trim()])
      setSkillInput('')
    }
  }

  const removeSkill = (s: string) => set('skills', form.skills.filter(x => x !== s))

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
        className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-glass"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-white font-semibold">{employee ? 'Edit Employee' : 'Add New Employee'}</h2>
              <p className="text-slate-500 text-xs">Fill in the employee details below</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Name Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 font-medium mb-1.5 block">First Name *</label>
              <input
                value={form.firstName}
                onChange={e => set('firstName', e.target.value)}
                placeholder="John"
                className="glass-input text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 font-medium mb-1.5 block">Last Name *</label>
              <input
                value={form.lastName}
                onChange={e => set('lastName', e.target.value)}
                placeholder="Doe"
                className="glass-input text-sm"
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 font-medium mb-1.5 block">Email *</label>
              <input
                type="email"
                value={form.email}
                onChange={e => set('email', e.target.value)}
                placeholder="john.doe@company.com"
                className="glass-input text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 font-medium mb-1.5 block">Phone</label>
              <input
                value={form.phone}
                onChange={e => set('phone', e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="glass-input text-sm"
              />
            </div>
          </div>

          {/* Position & Department */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 font-medium mb-1.5 block">Position</label>
              <input
                value={form.position}
                onChange={e => set('position', e.target.value)}
                placeholder="Software Engineer"
                className="glass-input text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 font-medium mb-1.5 block">Department</label>
              <select
                value={form.department}
                onChange={e => { set('department', e.target.value); set('departmentName', deptMap[e.target.value]) }}
                className="glass-input text-sm"
              >
                {departments.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Salary & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 font-medium mb-1.5 block">Salary (USD/yr)</label>
              <input
                type="number"
                value={form.salary}
                onChange={e => set('salary', Number(e.target.value))}
                className="glass-input text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 font-medium mb-1.5 block">Status</label>
              <select
                value={form.status}
                onChange={e => set('status', e.target.value)}
                className="glass-input text-sm"
              >
                <option value="active">Active</option>
                <option value="remote">Remote</option>
                <option value="on-leave">On Leave</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Location & Start Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 font-medium mb-1.5 block">Location</label>
              <input
                value={form.location}
                onChange={e => set('location', e.target.value)}
                placeholder="San Francisco, CA"
                className="glass-input text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 font-medium mb-1.5 block">Start Date</label>
              <input
                type="date"
                value={form.startDate}
                onChange={e => set('startDate', e.target.value)}
                className="glass-input text-sm"
              />
            </div>
          </div>

          {/* Manager */}
          <div>
            <label className="text-xs text-slate-500 font-medium mb-1.5 block">Manager</label>
            <input
              value={form.manager || ''}
              onChange={e => set('manager', e.target.value)}
              placeholder="Manager name"
              className="glass-input text-sm"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="text-xs text-slate-500 font-medium mb-1.5 block">Skills</label>
            <div className="flex gap-2 mb-2">
              <input
                value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addSkill()}
                placeholder="Type a skill and press Enter..."
                className="glass-input text-sm flex-1"
              />
              <button onClick={addSkill} className="btn-secondary text-sm px-3">Add</button>
            </div>
            {form.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {form.skills.map(s => (
                  <span key={s} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs">
                    {s}
                    <button onClick={() => removeSkill(s)} className="hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-white/5">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={saving || !form.firstName || !form.lastName || !form.email}
            className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving ? 'Saving...' : employee ? 'Save Changes' : 'Add Employee'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
