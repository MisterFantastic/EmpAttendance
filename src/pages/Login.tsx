import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { Shield, Zap, Users, BarChart3, Lock } from 'lucide-react'

type Provider = 'google' | 'microsoft' | 'github'

const providers = [
  {
    id: 'google' as Provider,
    name: 'Continue with Google',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
    ),
    bg: 'hover:bg-white/10',
    border: 'border-white/10 hover:border-white/20',
  },
  {
    id: 'microsoft' as Provider,
    name: 'Continue with Microsoft',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="#F25022" d="M11.4 11.4H0V0h11.4v11.4z"/>
        <path fill="#00A4EF" d="M24 11.4H12.6V0H24v11.4z"/>
        <path fill="#7FBA00" d="M11.4 24H0V12.6h11.4V24z"/>
        <path fill="#FFB900" d="M24 24H12.6V12.6H24V24z"/>
      </svg>
    ),
    bg: 'hover:bg-white/10',
    border: 'border-white/10 hover:border-white/20',
  },
  {
    id: 'github' as Provider,
    name: 'Continue with GitHub',
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    bg: 'hover:bg-white/10',
    border: 'border-white/10 hover:border-white/20',
  },
]

const features = [
  { icon: Users, text: 'Manage 80+ employees across 7 departments' },
  { icon: BarChart3, text: 'Real-time analytics and performance insights' },
  { icon: Shield, text: 'Enterprise-grade security with SSO' },
  { icon: Zap, text: 'Instant notifications and smart automation' },
]

export default function Login() {
  const { login, isLoading } = useAuth()
  const [activeProvider, setActiveProvider] = useState<Provider | null>(null)
  const [hoveredProvider, setHoveredProvider] = useState<Provider | null>(null)

  const handleLogin = async (provider: Provider) => {
    setActiveProvider(provider)
    await login(provider)
  }

  return (
    <div className="min-h-screen bg-dark-900 flex overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }} />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99,102,241,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99,102,241,0.15) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Left Panel - Branding */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative z-10"
      >
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-neon-purple">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-white font-['Space_Grotesk']">NexHR</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl font-extrabold text-white mb-6 leading-tight font-['Space_Grotesk']">
            The Future of
            <br />
            <span className="text-gradient">People Management</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-md">
            Empower your HR team with AI-driven insights, seamless attendance tracking,
            and beautiful analytics — all in one unified platform.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-4">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-slate-300 text-sm">{feature.text}</span>
            </motion.div>
          ))}
          <div className="pt-6 border-t border-white/5 flex items-center gap-4">
            <div className="flex -space-x-2">
              {['seed1','seed2','seed3','seed4'].map(s => (
                <img key={s} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${s}`}
                  className="w-8 h-8 rounded-full border-2 border-dark-900 bg-dark-600" alt="" />
              ))}
            </div>
            <p className="text-slate-400 text-sm">
              <span className="text-white font-semibold">2,400+</span> HR professionals trust NexHR
            </p>
          </div>
        </div>
      </motion.div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Card */}
          <div className="glass-card p-8 shadow-glass">
            {/* Mobile logo */}
            <div className="flex items-center gap-3 mb-8 lg:hidden">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white font-['Space_Grotesk']">NexHR</span>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2 font-['Space_Grotesk']">
                Welcome back
              </h2>
              <p className="text-slate-400 text-sm">
                Sign in with your federated identity to access your dashboard
              </p>
            </div>

            {/* SSO Providers */}
            <div className="space-y-3 mb-6">
              {providers.map((provider) => (
                <motion.button
                  key={provider.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleLogin(provider.id)}
                  onHoverStart={() => setHoveredProvider(provider.id)}
                  onHoverEnd={() => setHoveredProvider(null)}
                  disabled={isLoading}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border text-sm font-medium
                    text-slate-200 transition-all duration-200 relative overflow-hidden
                    ${provider.bg} ${provider.border}
                    ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  {/* Loading overlay */}
                  <AnimatePresence>
                    {activeProvider === provider.id && isLoading && (
                      <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1.8, ease: 'easeInOut' }}
                        className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-xl"
                      />
                    )}
                  </AnimatePresence>

                  <span className="relative z-10 flex-shrink-0">{provider.icon}</span>
                  <span className="relative z-10 flex-1 text-left">
                    {activeProvider === provider.id && isLoading
                      ? 'Authenticating...'
                      : provider.name}
                  </span>
                  {activeProvider === provider.id && isLoading && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className="relative z-10 w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full"
                    />
                  )}
                  {hoveredProvider === provider.id && !isLoading && (
                    <motion.div
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="relative z-10 text-purple-400"
                    >
                      →
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-slate-600">ENTERPRISE SSO</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Enterprise SSO input */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="your-company.com"
                className="glass-input pl-10 text-sm"
              />
            </div>

            <p className="text-center text-xs text-slate-600 mt-6">
              By signing in, you agree to our{' '}
              <span className="text-purple-400 cursor-pointer hover:underline">Terms of Service</span>
              {' '}and{' '}
              <span className="text-purple-400 cursor-pointer hover:underline">Privacy Policy</span>
            </p>
          </div>

          {/* Security badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-2 mt-6 text-slate-600 text-xs"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>256-bit SSL encryption · SOC 2 Type II Certified</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
