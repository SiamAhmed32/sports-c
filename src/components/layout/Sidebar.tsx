'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import {
  LayoutDashboard, Users, TrendingUp, BarChart3, Briefcase,
  Lightbulb, CreditCard, UserCircle, Shield, Sun, Moon,
  ChevronLeft, ChevronRight, Lock,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, premium: false },
  { title: 'Player Analytics', href: '/player-analytics', icon: Users, premium: false },
  { title: 'Line Movement', href: '/line-movement', icon: TrendingUp, premium: true },
  { title: 'Sportsbook Compare', href: '/sportsbook-comparison', icon: BarChart3, premium: true },
  { title: 'Game Portfolio', href: '/game-portfolio', icon: Briefcase, premium: false },
  { title: 'Insights', href: '/insights', icon: Lightbulb, premium: false },
  { title: 'Pricing', href: '/pricing', icon: CreditCard, premium: false },
]

const bottomItems = [
  { title: 'Profile', href: '/profile', icon: UserCircle },
  { title: 'Admin', href: '/admin', icon: Shield },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  return (
    <aside
      className={cn(
        'relative flex flex-col h-screen transition-all duration-200 ease-in-out border-r',
        collapsed ? 'w-16' : 'w-60',
      )}
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Logo */}
      <div className={cn('flex items-center gap-3 p-4 border-b', collapsed && 'justify-center')} style={{ borderColor: 'var(--border)' }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--emerald), #2F7D5B)' }}>
          <span className="text-white font-bold text-sm font-body z-10">PE</span>
          <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 30% 30%, white, transparent)' }} />
        </div>
        {!collapsed && (
          <div>
            <span className="font-display text-base font-semibold" style={{ color: 'var(--text-primary)' }}>PropEdge</span>
            <span className="font-display text-base font-semibold ml-1" style={{ color: 'var(--gold)' }}>Intelligence</span>
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-16 w-6 h-6 rounded-full border flex items-center justify-center z-20 transition-colors"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>

      {/* Navigation */}
      <nav className="flex-1 py-3 overflow-y-auto">
        <div className="space-y-0.5 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group',
                  collapsed && 'justify-center',
                  isActive
                    ? 'font-semibold'
                    : 'hover:opacity-80',
                )}
                style={{
                  backgroundColor: isActive ? 'var(--emerald-light)' : 'transparent',
                  color: isActive ? 'var(--emerald)' : 'var(--text-secondary)',
                }}
                title={collapsed ? item.title : undefined}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed && (
                  <span className="text-sm font-body truncate flex-1">{item.title}</span>
                )}
                {!collapsed && item.premium && (
                  <Lock className="h-3 w-3 shrink-0" style={{ color: 'var(--gold)' }} />
                )}
              </Link>
            )
          })}
        </div>

        {/* Divider */}
        <div className="mx-4 my-3" style={{ height: 1, backgroundColor: 'var(--border)' }} />

        <div className="space-y-0.5 px-2">
          {bottomItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150',
                  collapsed && 'justify-center',
                  isActive ? 'font-semibold' : 'hover:opacity-80',
                )}
                style={{
                  backgroundColor: isActive ? 'var(--emerald-light)' : 'transparent',
                  color: isActive ? 'var(--emerald)' : 'var(--text-secondary)',
                }}
                title={collapsed ? item.title : undefined}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span className="text-sm font-body">{item.title}</span>}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Bottom: Theme + User */}
      <div className={cn('p-3 border-t space-y-2', collapsed && 'flex flex-col items-center')} style={{ borderColor: 'var(--border)' }}>
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className={cn('flex items-center gap-2 px-3 py-2 rounded-lg w-full transition-colors hover:opacity-80', collapsed && 'justify-center w-auto')}
          style={{ color: 'var(--text-secondary)' }}
        >
          {theme === 'light' ? <Moon className="h-4 w-4 shrink-0" /> : <Sun className="h-4 w-4 shrink-0" />}
          {!collapsed && <span className="text-sm font-body">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>}
        </button>

        {!collapsed && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: 'var(--bg-surface)' }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold font-body shrink-0" style={{ backgroundColor: 'var(--emerald)' }}>
              JD
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold font-body truncate" style={{ color: 'var(--text-primary)' }}>John Doe</p>
              <p className="text-[10px] font-body" style={{ color: 'var(--gold)' }}>Pro Plan</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
