import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '../types'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (provider: 'google' | 'microsoft' | 'github') => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

// Mock user profiles for each provider
const mockProfiles: Record<string, User> = {
  google: {
    id: 'google-001',
    name: 'Alex Johnson',
    email: 'alex.johnson@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexJ',
    provider: 'google',
    role: 'admin',
  },
  microsoft: {
    id: 'ms-001',
    name: 'Sam Taylor',
    email: 'sam.taylor@company.onmicrosoft.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SamT',
    provider: 'microsoft',
    role: 'hr',
  },
  github: {
    id: 'gh-001',
    name: 'Jordan Lee',
    email: 'jordan.lee@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JordanL',
    provider: 'github',
    role: 'manager',
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Restore session from localStorage
    const savedUser = localStorage.getItem('nexhr_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch {
        localStorage.removeItem('nexhr_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (provider: 'google' | 'microsoft' | 'github') => {
    setIsLoading(true)
    // Simulate OAuth redirect + callback flow
    await new Promise(resolve => setTimeout(resolve, 1800))
    const profile = mockProfiles[provider]
    setUser(profile)
    localStorage.setItem('nexhr_user', JSON.stringify(profile))
    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('nexhr_user')
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
