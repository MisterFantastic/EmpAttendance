import { create } from 'zustand'
import { Employee, Department } from '../types'
import * as db from '../services/db'

interface EmployeeStore {
  employees: Employee[]
  departments: Department[]
  isLoading: boolean
  searchQuery: string
  selectedDepartment: string
  selectedStatus: string
  sortField: keyof Employee
  sortDir: 'asc' | 'desc'

  // Data fetching
  fetchAll: () => Promise<void>

  // Filters / sort
  setSearchQuery: (q: string) => void
  setSelectedDepartment: (d: string) => void
  setSelectedStatus: (s: string) => void
  setSortField: (f: keyof Employee) => void
  setSortDir: (d: 'asc' | 'desc') => void

  // CRUD (syncs with Supabase then updates local state)
  addEmployee: (emp: Omit<Employee, 'id'>) => Promise<void>
  updateEmployee: (id: string, updates: Partial<Employee>) => Promise<void>
  deleteEmployee: (id: string) => Promise<void>

  filteredEmployees: () => Employee[]
}

export const useEmployeeStore = create<EmployeeStore>((set, get) => ({
  employees: [],
  departments: [],
  isLoading: false,
  searchQuery: '',
  selectedDepartment: 'all',
  selectedStatus: 'all',
  sortField: 'firstName',
  sortDir: 'asc',

  fetchAll: async () => {
    set({ isLoading: true })
    try {
      const [employees, departments] = await Promise.all([
        db.fetchEmployees(),
        db.fetchDepartments(),
      ])
      set({ employees, departments })
    } finally {
      set({ isLoading: false })
    }
  },

  setSearchQuery: (q) => set({ searchQuery: q }),
  setSelectedDepartment: (d) => set({ selectedDepartment: d }),
  setSelectedStatus: (s) => set({ selectedStatus: s }),
  setSortField: (f) => set({ sortField: f }),
  setSortDir: (d) => set({ sortDir: d }),

  addEmployee: async (emp) => {
    const newEmp = await db.insertEmployee(emp)
    set(state => ({ employees: [...state.employees, newEmp] }))
  },

  updateEmployee: async (id, updates) => {
    const updated = await db.updateEmployee(id, updates)
    set(state => ({
      employees: state.employees.map(e => e.id === id ? updated : e),
    }))
  },

  deleteEmployee: async (id) => {
    await db.deleteEmployee(id)
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
