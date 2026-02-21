/**
 * Database service layer — maps between app types (camelCase) and
 * Supabase/PostgreSQL column names (snake_case).
 */
import { supabase } from '../lib/supabase'
import { Employee, Department, AttendanceRecord } from '../types'

// ─── Row types returned by Supabase ────────────────────────────────────────

interface EmployeeRow {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  avatar: string
  position: string
  department: string
  department_name: string
  salary: number
  start_date: string
  status: Employee['status']
  location: string
  manager: string | null
  skills: string[]
  performance: number
  attendance_rate: number
}

interface DepartmentRow {
  id: string
  name: string
  color: string
  head_count: number
  budget: number
  manager_id: string | null
  icon: string
}

interface AttendanceRow {
  id: string
  employee_id: string
  employee_name: string
  date: string
  check_in: string
  check_out: string
  status: AttendanceRecord['status']
  hours_worked: number
}

// ─── Mappers ────────────────────────────────────────────────────────────────

function toEmployee(row: EmployeeRow): Employee {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phone: row.phone,
    avatar: row.avatar,
    position: row.position,
    department: row.department,
    departmentName: row.department_name,
    salary: row.salary,
    startDate: row.start_date,
    status: row.status,
    location: row.location,
    manager: row.manager ?? undefined,
    skills: row.skills ?? [],
    performance: row.performance,
    attendanceRate: row.attendance_rate,
  }
}

function fromEmployee(emp: Omit<Employee, 'id'> & { id?: string }): Omit<EmployeeRow, 'id'> & { id?: string } {
  return {
    ...(emp.id ? { id: emp.id } : {}),
    first_name: emp.firstName,
    last_name: emp.lastName,
    email: emp.email,
    phone: emp.phone,
    avatar: emp.avatar,
    position: emp.position,
    department: emp.department,
    department_name: emp.departmentName,
    salary: emp.salary,
    start_date: emp.startDate,
    status: emp.status,
    location: emp.location,
    manager: emp.manager ?? null,
    skills: emp.skills,
    performance: emp.performance,
    attendance_rate: emp.attendanceRate,
  }
}

function toDepartment(row: DepartmentRow): Department {
  return {
    id: row.id,
    name: row.name,
    color: row.color,
    headCount: row.head_count,
    budget: row.budget,
    managerId: row.manager_id ?? undefined,
    icon: row.icon,
  }
}

function fromDepartment(dept: Department): DepartmentRow {
  return {
    id: dept.id,
    name: dept.name,
    color: dept.color,
    head_count: dept.headCount,
    budget: dept.budget,
    manager_id: dept.managerId ?? null,
    icon: dept.icon,
  }
}

function toAttendance(row: AttendanceRow): AttendanceRecord {
  return {
    id: row.id,
    employeeId: row.employee_id,
    employeeName: row.employee_name,
    date: row.date,
    checkIn: row.check_in,
    checkOut: row.check_out,
    status: row.status,
    hoursWorked: row.hours_worked,
  }
}

function fromAttendance(rec: AttendanceRecord): AttendanceRow {
  return {
    id: rec.id,
    employee_id: rec.employeeId,
    employee_name: rec.employeeName,
    date: rec.date,
    check_in: rec.checkIn,
    check_out: rec.checkOut,
    status: rec.status,
    hours_worked: rec.hoursWorked,
  }
}

// ─── Employee CRUD ──────────────────────────────────────────────────────────

export async function fetchEmployees(): Promise<Employee[]> {
  const { data, error } = await supabase.from('employees').select('*').order('first_name')
  if (error) throw error
  return (data as EmployeeRow[]).map(toEmployee)
}

export async function insertEmployee(emp: Omit<Employee, 'id'>): Promise<Employee> {
  const id = `emp-${Date.now()}`
  const row = fromEmployee({ ...emp, id })
  const { data, error } = await supabase.from('employees').insert(row).select().single()
  if (error) throw error
  return toEmployee(data as EmployeeRow)
}

export async function updateEmployee(id: string, updates: Partial<Employee>): Promise<Employee> {
  // Build only the changed snake_case fields
  const partial: Partial<EmployeeRow> = {}
  if (updates.firstName !== undefined) partial.first_name = updates.firstName
  if (updates.lastName !== undefined) partial.last_name = updates.lastName
  if (updates.email !== undefined) partial.email = updates.email
  if (updates.phone !== undefined) partial.phone = updates.phone
  if (updates.avatar !== undefined) partial.avatar = updates.avatar
  if (updates.position !== undefined) partial.position = updates.position
  if (updates.department !== undefined) partial.department = updates.department
  if (updates.departmentName !== undefined) partial.department_name = updates.departmentName
  if (updates.salary !== undefined) partial.salary = updates.salary
  if (updates.startDate !== undefined) partial.start_date = updates.startDate
  if (updates.status !== undefined) partial.status = updates.status
  if (updates.location !== undefined) partial.location = updates.location
  if (updates.manager !== undefined) partial.manager = updates.manager ?? null
  if (updates.skills !== undefined) partial.skills = updates.skills
  if (updates.performance !== undefined) partial.performance = updates.performance
  if (updates.attendanceRate !== undefined) partial.attendance_rate = updates.attendanceRate

  const { data, error } = await supabase.from('employees').update(partial).eq('id', id).select().single()
  if (error) throw error
  return toEmployee(data as EmployeeRow)
}

export async function deleteEmployee(id: string): Promise<void> {
  const { error } = await supabase.from('employees').delete().eq('id', id)
  if (error) throw error
}

// ─── Department CRUD ────────────────────────────────────────────────────────

export async function fetchDepartments(): Promise<Department[]> {
  const { data, error } = await supabase.from('departments').select('*').order('name')
  if (error) throw error
  return (data as DepartmentRow[]).map(toDepartment)
}

export async function upsertDepartments(depts: Department[]): Promise<void> {
  const { error } = await supabase.from('departments').upsert(depts.map(fromDepartment))
  if (error) throw error
}

// ─── Attendance CRUD ────────────────────────────────────────────────────────

export async function fetchAttendanceByDate(date: string): Promise<AttendanceRecord[]> {
  const { data, error } = await supabase
    .from('attendance_records')
    .select('*')
    .eq('date', date)
    .order('employee_name')
  if (error) throw error
  return (data as AttendanceRow[]).map(toAttendance)
}

export async function fetchAllAttendance(): Promise<AttendanceRecord[]> {
  const { data, error } = await supabase
    .from('attendance_records')
    .select('*')
    .order('date', { ascending: false })
  if (error) throw error
  return (data as AttendanceRow[]).map(toAttendance)
}

export async function upsertAttendance(records: AttendanceRecord[]): Promise<void> {
  const { error } = await supabase
    .from('attendance_records')
    .upsert(records.map(fromAttendance))
  if (error) throw error
}

// ─── Seed helpers ────────────────────────────────────────────────────────────

/** Returns true if the DB tables are empty and need seeding */
export async function isDatabaseEmpty(): Promise<boolean> {
  const { count } = await supabase
    .from('employees')
    .select('*', { count: 'exact', head: true })
  return (count ?? 0) === 0
}

/** Bulk-inserts all mock data. Call once on first boot. */
export async function seedDatabase(
  employees: Employee[],
  departments: Department[],
  attendance: AttendanceRecord[]
): Promise<void> {
  const { error: deptErr } = await supabase
    .from('departments')
    .insert(departments.map(fromDepartment))
  if (deptErr) throw deptErr

  const { error: empErr } = await supabase
    .from('employees')
    .insert(employees.map(emp => fromEmployee(emp) as EmployeeRow))
  if (empErr) throw empErr

  const { error: attErr } = await supabase
    .from('attendance_records')
    .insert(attendance.map(fromAttendance))
  if (attErr) throw attErr
}
