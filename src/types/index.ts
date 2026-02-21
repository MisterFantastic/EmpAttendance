export interface User {
  id: string
  name: string
  email: string
  avatar: string
  provider: 'google' | 'microsoft' | 'github'
  role: 'admin' | 'hr' | 'manager' | 'employee'
}

export interface Employee {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  avatar: string
  position: string
  department: Department['id']
  departmentName: string
  salary: number
  startDate: string
  status: 'active' | 'inactive' | 'on-leave' | 'remote'
  location: string
  manager?: string
  skills: string[]
  performance: number
  attendanceRate: number
}

export interface Department {
  id: string
  name: string
  color: string
  headCount: number
  budget: number
  managerId?: string
  icon: string
}

export interface AttendanceRecord {
  id: string
  employeeId: string
  employeeName: string
  date: string
  checkIn: string
  checkOut: string
  status: 'present' | 'absent' | 'late' | 'half-day' | 'remote'
  hoursWorked: number
}

export interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  time: string
  read: boolean
}
