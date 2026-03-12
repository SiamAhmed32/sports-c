'use client'
import { usePathname } from 'next/navigation'
import { Menu, Bell, Search } from 'lucide-react'

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/player-analytics': 'Player Analytics',
  '/line-movement': 'Line Movement',
  '/sportsbook-comparison': 'Sportsbook Comparison',
  '/game-portfolio': 'Game Portfolio',
  '/insights': 'Analytics Insights',
  '/pricing': 'Pricing',
  '/profile': 'Profile',
  '/admin': 'Admin Dashboard',
}

export function TopBar({ onMenuToggle }: { onMenuToggle: () => void }) {
  const pathname = usePathname()
  const title = pageTitles[pathname] || 'PropEdge Intelligence'

  return (
    <header
      className="h-14 flex items-center justify-between px-4 border-b md:px-6 shrink-0"
      style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg transition-colors hover:opacity-70"
          style={{ color: 'var(--text-secondary)' }}
        >
          <Menu className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2 md:hidden">
          <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--emerald), #2F7D5B)' }}>
            <span className="text-white font-bold text-xs font-body">PE</span>
          </div>
          <span className="font-display text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>PropEdge</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--text-muted)' }}
        >
          <Search className="h-3.5 w-3.5" />
          <span className="text-xs font-body">Search players...</span>
          <kbd className="ml-4 text-[10px] px-1.5 py-0.5 rounded border font-body" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>⌘K</kbd>
        </div>

        <button
          className="relative w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:opacity-70"
          style={{ color: 'var(--text-secondary)' }}
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--coral)' }} />
        </button>

        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold font-body"
          style={{ backgroundColor: 'var(--emerald)' }}
        >
          JD
        </div>
      </div>
    </header>
  )
}
