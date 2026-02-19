import { create } from 'zustand'
import { Employee, Department } from '../types'
import { employees as initialEmployees, departments as initialDepartments } from '../data/mockData'

interface EmployeeStore {
  employees: Employee[]
  departments: Department[]
  searchQuery: string
  selectedDepartment: string
  selectedStatus: string
  sortField: keyof Employee
  sortDir: 'asc' | 'desc'
  setSearchQuery: (q: string) => void
  setSelectedDepartment: (d: string) => void
  setSelectedStatus: (s: string) => void
  setSortField: (f: keyof Employee) => void
  setSortDir: (d: 'asc' | 'desc') => void
  addEmployee: (emp: Omit<Employee, 'id'>) => void
  updateEmployee: (id: string, updates: Partial<Employee>) => void
  deleteEmployee: (id: string) => void
  filteredEmployees: () => Employee[]
}

export const useEmployeeStore = create<EmployeeStore>((set, get) => ({
  employees: initialEmployees,
  departments: initialDepartments,
  searchQuery: '',
  selectedDepartment: 'all',
  selectedStatus: 'all',
  sortField: 'firstName',
  sortDir: 'asc',

  setSearchQuery: (q) => set({ searchQuery: q }),
  setSelectedDepartment: (d) => set({ selectedDepartment: d }),
  setSelectedStatus: (s) => set({ selectedStatus: s }),
  setSortField: (f) => set({ sortField: f }),
  setSortDir: (d) => set({ sortDir: d }),

  addEmployee: (emp) => {
    const newEmp: Employee = { ...emp, id: `emp-${Date.now()}` }
    set(state => ({ employees: [...state.employees, newEmp] }))
  },

  updateEmployee: (id, updates) => {
    set(state => ({
      employees: state.employees.map(e => e.id === id ? { ...e, ...updates } : e)
    }))
  },

  deleteEmployee: (id) => {
    set(state => ({ employees: state.employees.filter(e => e.id !== id) }))
  },

  filteredEmployees: () => {
    const { employees, searchQuery, selectedDepartment, selectedStatus, sortField, sortDir } = get()
    let result = [...employees]

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(e =>
        `${e.firstName} ${e.lastName}`.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        e.position.toLowerCase().includes(q) ||
        e.departmentName.toLowerCase().includes(q)
      )
    }

    if (selectedDepartment !== 'all') {
      result = result.filter(e => e.department === selectedDepartment)
    }

    if (selectedStatus !== 'all') {
      result = result.filter(e => e.status === selectedStatus)
    }

    result.sort((a, b) => {
      const aVal = a[sortField] ?? ''
      const bVal = b[sortField] ?? ''
      const cmp = String(aVal).localeCompare(String(bVal))
      return sortDir === 'asc' ? cmp : -cmp
    })

    return result
  },
}))
