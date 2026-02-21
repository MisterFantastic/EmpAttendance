import { Employee, Department, AttendanceRecord } from '../types'

export const departments: Department[] = [
  { id: 'eng', name: 'Engineering', color: '#6366f1', headCount: 24, budget: 1200000, icon: '⚡' },
  { id: 'design', name: 'Design', color: '#a855f7', headCount: 8, budget: 480000, icon: '🎨' },
  { id: 'sales', name: 'Sales', color: '#06b6d4', headCount: 15, budget: 750000, icon: '📈' },
  { id: 'hr', name: 'Human Resources', color: '#10b981', headCount: 6, budget: 360000, icon: '👥' },
  { id: 'finance', name: 'Finance', color: '#f59e0b', headCount: 9, budget: 540000, icon: '💰' },
  { id: 'marketing', name: 'Marketing', color: '#ec4899', headCount: 11, budget: 660000, icon: '📣' },
  { id: 'ops', name: 'Operations', color: '#14b8a6', headCount: 7, budget: 420000, icon: '⚙️' },
]

export const employees: Employee[] = [
  {
    id: '1', firstName: 'Sarah', lastName: 'Chen', email: 'sarah.chen@nexhr.com',
    phone: '+1 (555) 234-5678', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    position: 'Senior Software Engineer', department: 'eng', departmentName: 'Engineering',
    salary: 145000, startDate: '2021-03-15', status: 'active', location: 'San Francisco, CA',
    manager: 'Alex Johnson', skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
    performance: 96, attendanceRate: 98,
  },
  {
    id: '2', firstName: 'Marcus', lastName: 'Rodriguez', email: 'marcus.r@nexhr.com',
    phone: '+1 (555) 345-6789', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    position: 'UX Design Lead', department: 'design', departmentName: 'Design',
    salary: 125000, startDate: '2020-07-01', status: 'active', location: 'New York, NY',
    manager: 'Emma Walsh', skills: ['Figma', 'Prototyping', 'User Research', 'Motion Design'],
    performance: 92, attendanceRate: 97,
  },
  {
    id: '3', firstName: 'Aisha', lastName: 'Patel', email: 'aisha.patel@nexhr.com',
    phone: '+1 (555) 456-7890', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha',
    position: 'Sales Director', department: 'sales', departmentName: 'Sales',
    salary: 165000, startDate: '2019-11-20', status: 'remote', location: 'Chicago, IL',
    manager: 'CEO', skills: ['Negotiation', 'CRM', 'Leadership', 'Analytics'],
    performance: 98, attendanceRate: 95,
  },
  {
    id: '4', firstName: 'James', lastName: 'Kim', email: 'james.kim@nexhr.com',
    phone: '+1 (555) 567-8901', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    position: 'DevOps Engineer', department: 'eng', departmentName: 'Engineering',
    salary: 138000, startDate: '2022-01-10', status: 'active', location: 'Austin, TX',
    manager: 'Sarah Chen', skills: ['Kubernetes', 'Terraform', 'CI/CD', 'Docker'],
    performance: 89, attendanceRate: 99,
  },
  {
    id: '5', firstName: 'Emily', lastName: 'Walsh', email: 'emily.walsh@nexhr.com',
    phone: '+1 (555) 678-9012', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    position: 'Head of Design', department: 'design', departmentName: 'Design',
    salary: 150000, startDate: '2018-05-14', status: 'active', location: 'Seattle, WA',
    manager: 'CEO', skills: ['Brand Strategy', 'Figma', 'Team Leadership', '3D Design'],
    performance: 94, attendanceRate: 96,
  },
  {
    id: '6', firstName: 'David', lastName: 'Thompson', email: 'david.t@nexhr.com',
    phone: '+1 (555) 789-0123', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    position: 'Financial Analyst', department: 'finance', departmentName: 'Finance',
    salary: 110000, startDate: '2021-09-01', status: 'active', location: 'Boston, MA',
    manager: 'CFO', skills: ['Excel', 'Financial Modeling', 'Python', 'Tableau'],
    performance: 87, attendanceRate: 98,
  },
  {
    id: '7', firstName: 'Luna', lastName: 'Park', email: 'luna.park@nexhr.com',
    phone: '+1 (555) 890-1234', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna',
    position: 'Marketing Manager', department: 'marketing', departmentName: 'Marketing',
    salary: 105000, startDate: '2022-04-18', status: 'on-leave', location: 'Los Angeles, CA',
    manager: 'CMO', skills: ['Content Strategy', 'SEO', 'Analytics', 'Social Media'],
    performance: 91, attendanceRate: 94,
  },
  {
    id: '8', firstName: 'Omar', lastName: 'Hassan', email: 'omar.h@nexhr.com',
    phone: '+1 (555) 901-2345', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar',
    position: 'HR Business Partner', department: 'hr', departmentName: 'Human Resources',
    salary: 95000, startDate: '2020-12-07', status: 'active', location: 'Denver, CO',
    manager: 'CHRO', skills: ['Talent Acquisition', 'HRIS', 'Labor Law', 'Coaching'],
    performance: 93, attendanceRate: 97,
  },
  {
    id: '9', firstName: 'Sofia', lastName: 'Martinez', email: 'sofia.m@nexhr.com',
    phone: '+1 (555) 012-3456', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia',
    position: 'Full Stack Engineer', department: 'eng', departmentName: 'Engineering',
    salary: 130000, startDate: '2023-02-28', status: 'active', location: 'Miami, FL',
    manager: 'Sarah Chen', skills: ['Vue.js', 'Python', 'PostgreSQL', 'GraphQL'],
    performance: 88, attendanceRate: 96,
  },
  {
    id: '10', firstName: 'Ryan', lastName: 'Cooper', email: 'ryan.c@nexhr.com',
    phone: '+1 (555) 123-4567', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan',
    position: 'Account Executive', department: 'sales', departmentName: 'Sales',
    salary: 90000, startDate: '2022-08-15', status: 'active', location: 'Phoenix, AZ',
    manager: 'Aisha Patel', skills: ['Salesforce', 'Prospecting', 'Negotiation', 'Demo'],
    performance: 85, attendanceRate: 93,
  },
  {
    id: '11', firstName: 'Nadia', lastName: 'Kovacs', email: 'nadia.k@nexhr.com',
    phone: '+1 (555) 234-5670', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nadia',
    position: 'Operations Manager', department: 'ops', departmentName: 'Operations',
    salary: 115000, startDate: '2019-06-10', status: 'active', location: 'Portland, OR',
    manager: 'COO', skills: ['Process Optimization', 'Supply Chain', 'Six Sigma', 'ERP'],
    performance: 95, attendanceRate: 99,
  },
  {
    id: '12', firstName: 'Liam', lastName: 'Foster', email: 'liam.f@nexhr.com',
    phone: '+1 (555) 345-6780', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Liam',
    position: 'Data Engineer', department: 'eng', departmentName: 'Engineering',
    salary: 135000, startDate: '2021-11-30', status: 'inactive', location: 'Atlanta, GA',
    manager: 'Sarah Chen', skills: ['Spark', 'Kafka', 'Airflow', 'Snowflake'],
    performance: 79, attendanceRate: 88,
  },
]

export const attendanceRecords: AttendanceRecord[] = [
  { id: 'a1', employeeId: '1', employeeName: 'Sarah Chen', date: '2026-02-19', checkIn: '09:02', checkOut: '18:15', status: 'present', hoursWorked: 9.2 },
  { id: 'a2', employeeId: '2', employeeName: 'Marcus Rodriguez', date: '2026-02-19', checkIn: '08:45', checkOut: '17:30', status: 'present', hoursWorked: 8.75 },
  { id: 'a3', employeeId: '3', employeeName: 'Aisha Patel', date: '2026-02-19', checkIn: '10:00', checkOut: '18:00', status: 'remote', hoursWorked: 8 },
  { id: 'a4', employeeId: '4', employeeName: 'James Kim', date: '2026-02-19', checkIn: '09:30', checkOut: '19:00', status: 'present', hoursWorked: 9.5 },
  { id: 'a5', employeeId: '5', employeeName: 'Emily Walsh', date: '2026-02-19', checkIn: '08:55', checkOut: '17:45', status: 'present', hoursWorked: 8.83 },
  { id: 'a6', employeeId: '6', employeeName: 'David Thompson', date: '2026-02-19', checkIn: '09:15', checkOut: '18:30', status: 'present', hoursWorked: 9.25 },
  { id: 'a7', employeeId: '7', employeeName: 'Luna Park', date: '2026-02-19', checkIn: '', checkOut: '', status: 'absent', hoursWorked: 0 },
  { id: 'a8', employeeId: '8', employeeName: 'Omar Hassan', date: '2026-02-19', checkIn: '09:45', checkOut: '18:00', status: 'late', hoursWorked: 8.25 },
  { id: 'a9', employeeId: '9', employeeName: 'Sofia Martinez', date: '2026-02-19', checkIn: '09:00', checkOut: '17:30', status: 'present', hoursWorked: 8.5 },
  { id: 'a10', employeeId: '10', employeeName: 'Ryan Cooper', date: '2026-02-19', checkIn: '09:00', checkOut: '13:00', status: 'half-day', hoursWorked: 4 },
]

export const monthlyHeadcountData = [
  { month: 'Aug', count: 68 },
  { month: 'Sep', count: 72 },
  { month: 'Oct', count: 75 },
  { month: 'Nov', count: 74 },
  { month: 'Dec', count: 76 },
  { month: 'Jan', count: 79 },
  { month: 'Feb', count: 80 },
]

export const attendanceTrendData = [
  { day: 'Mon', present: 74, remote: 8, absent: 4 },
  { day: 'Tue', present: 71, remote: 10, absent: 5 },
  { day: 'Wed', present: 76, remote: 7, absent: 3 },
  { day: 'Thu', present: 69, remote: 12, absent: 5 },
  { day: 'Fri', present: 65, remote: 14, absent: 7 },
  { day: 'Mon', present: 73, remote: 9, absent: 4 },
  { day: 'Tue', present: 77, remote: 6, absent: 3 },
]

export const salaryByDepartment = [
  { dept: 'Eng', avg: 136000 },
  { dept: 'Design', avg: 137500 },
  { dept: 'Sales', avg: 127500 },
  { dept: 'Finance', avg: 110000 },
  { dept: 'Marketing', avg: 105000 },
  { dept: 'HR', avg: 95000 },
  { dept: 'Ops', avg: 115000 },
]
