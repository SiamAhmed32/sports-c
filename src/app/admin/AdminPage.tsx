'use client'
import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { adminUsers, adminStats, revenueData, playerProps } from '@/data/mockData'
import { Users, DollarSign, TrendingUp, BarChart3, Search, MoreHorizontal } from 'lucide-react'

type Tab = 'overview' | 'users' | 'subscriptions' | 'prop-setter'

export function AdminPage() {
  const [tab, setTab] = useState<Tab>('overview')
  const [search, setSearch] = useState('')
  const [propLine, setPropLine] = useState('29.5')
  const [propPlayer, setPropPlayer] = useState('LeBron James')
  const [propStat, setPropStat] = useState('Points')

  const filteredUsers = adminUsers.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'overview', label: 'Overview', icon: <BarChart3 className="h-4 w-4" /> },
    { key: 'users', label: 'User Management', icon: <Users className="h-4 w-4" /> },
    { key: 'subscriptions', label: 'Subscriptions', icon: <DollarSign className="h-4 w-4" /> },
    { key: 'prop-setter', label: 'Prop of the Day', icon: <TrendingUp className="h-4 w-4" /> },
  ]

  return (
    <div className="p-4 md:p-6 space-y-5 max-w-[1440px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>Admin Dashboard</h1>
          <p className="text-sm font-body mt-0.5" style={{ color: 'var(--text-muted)' }}>Platform management & analytics</p>
        </div>
        <span className="badge px-3 py-1.5 text-xs" style={{ backgroundColor: 'var(--coral-light)', color: 'var(--coral)', border: '1px solid var(--coral)' }}>
          🔒 Admin Only
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b" style={{ borderColor: 'var(--border)' }}>
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-body font-medium transition-all border-b-2 -mb-px"
            style={{
              borderBottomColor: tab === t.key ? 'var(--emerald)' : 'transparent',
              color: tab === t.key ? 'var(--emerald)' : 'var(--text-muted)',
            }}
          >
            {t.icon}
            <span className="hidden sm:inline">{t.label}</span>
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {tab === 'overview' && (
        <div className="space-y-5">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {adminStats.map((s, i) => (
              <div key={i} className="card rounded-xl p-5">
                <p className="text-xs font-body" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
                <p className="font-display text-2xl font-bold mt-1" style={{ color: 'var(--text-primary)' }}>{s.value}</p>
                <p className="text-xs font-body mt-1" style={{ color: s.positive ? 'var(--emerald)' : 'var(--coral)' }}>{s.change} vs last month</p>
              </div>
            ))}
          </div>

          {/* Revenue Chart */}
          <div className="card rounded-xl p-5">
            <h2 className="font-display text-base font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Revenue & Users — 2025-26</h2>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={revenueData} margin={{ top: 5, right: 8, bottom: 5, left: 0 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--emerald)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--emerald)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'Inter' }} axisLine={false} tickLine={false} width={50} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12, fontFamily: 'Inter' }}
                  formatter={(v: number, name: string) => [name === 'revenue' ? `$${v.toLocaleString()}` : v.toLocaleString(), name === 'revenue' ? 'Revenue' : 'Users']} />
                <Area type="monotone" dataKey="revenue" name="revenue" stroke="var(--emerald)" strokeWidth={2.5} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {tab === 'users' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'var(--text-muted)' }} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search users..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm font-body outline-none"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              />
            </div>
            <span className="text-sm font-body" style={{ color: 'var(--text-muted)' }}>{filteredUsers.length} users</span>
          </div>
          <div className="card rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-body">
                <thead>
                  <tr style={{ backgroundColor: 'var(--bg-surface)', borderBottom: '1px solid var(--border)' }}>
                    {['Name', 'Email', 'Plan', 'Status', 'Joined', 'Revenue', ''].map((h, i) => (
                      <th key={i} className="text-left py-3 px-4 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id} className="hover:opacity-80 transition-opacity" style={{ borderBottom: '1px solid var(--border)' }}>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: 'var(--emerald)' }}>
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{user.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4" style={{ color: 'var(--text-muted)' }}>{user.email}</td>
                      <td className="py-3 px-4">
                        <span className="badge text-[10px] px-2"
                          style={{
                            backgroundColor: user.plan === 'Institutional' ? 'var(--intel-blue-light)' : user.plan === 'Pro' ? 'var(--gold-light)' : 'var(--bg-surface)',
                            color: user.plan === 'Institutional' ? 'var(--intel-blue)' : user.plan === 'Pro' ? 'var(--gold)' : 'var(--text-muted)',
                            border: `1px solid ${user.plan === 'Institutional' ? 'var(--intel-blue)' : user.plan === 'Pro' ? 'var(--gold)' : 'var(--border)'}`,
                          }}>
                          {user.plan}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="badge text-[10px] px-2"
                          style={{
                            backgroundColor: user.status === 'Active' ? 'var(--emerald-light)' : 'var(--coral-light)',
                            color: user.status === 'Active' ? 'var(--emerald)' : 'var(--coral)',
                          }}>
                          ● {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs" style={{ color: 'var(--text-muted)' }}>{user.joined}</td>
                      <td className="py-3 px-4 font-semibold" style={{ color: 'var(--text-primary)' }}>{user.revenue}</td>
                      <td className="py-3 px-4">
                        <button style={{ color: 'var(--text-muted)' }}><MoreHorizontal className="h-4 w-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Subscriptions Tab */}
      {tab === 'subscriptions' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { plan: 'Free', count: 8241, revenue: '$0', color: 'var(--text-muted)', pct: 66 },
              { plan: 'Pro', count: 3892, revenue: '$77,840', color: 'var(--gold)', pct: 31 },
              { plan: 'Institutional', count: 350, revenue: '$34,650', color: 'var(--intel-blue)', pct: 3 },
            ].map((s, i) => (
              <div key={i} className="card rounded-xl p-5">
                <div className="flex justify-between items-start mb-3">
                  <p className="font-display text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{s.plan}</p>
                  <span className="text-sm font-body font-semibold" style={{ color: s.color }}>{s.pct}%</span>
                </div>
                <p className="font-display text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>{s.count.toLocaleString()}</p>
                <p className="text-xs font-body mt-1" style={{ color: 'var(--text-muted)' }}>users</p>
                <div className="h-2 rounded-full mt-3 overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)' }}>
                  <div className="h-full rounded-full" style={{ width: `${s.pct}%`, backgroundColor: s.color }} />
                </div>
                <p className="text-sm font-body font-semibold mt-2" style={{ color: 'var(--emerald)' }}>{s.revenue}</p>
              </div>
            ))}
          </div>

          <div className="card rounded-xl p-5">
            <h3 className="font-display text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Recent Subscription Activity</h3>
            <div className="space-y-3">
              {[
                { action: '✅ New Pro', user: 'Jessica Martinez', time: '2 hours ago', amount: '+$20/mo' },
                { action: '⬆️ Upgraded', user: 'Robert Taylor', time: '5 hours ago', amount: 'Free → Pro' },
                { action: '❌ Cancelled', user: 'Emily Brown', time: '1 day ago', amount: '-$20/mo' },
                { action: '✅ New Institutional', user: 'Mike Williams Inc.', time: '2 days ago', amount: '+$99/mo' },
              ].map((ev, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
                  <p className="text-sm font-body font-medium flex-1" style={{ color: 'var(--text-primary)' }}>
                    {ev.action} — {ev.user}
                  </p>
                  <span className="text-xs font-body" style={{ color: 'var(--text-muted)' }}>{ev.time}</span>
                  <span className="text-sm font-body font-bold" style={{ color: ev.amount.startsWith('+') ? 'var(--emerald)' : ev.amount.startsWith('-') ? 'var(--coral)' : 'var(--gold)' }}>{ev.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Prop Setter Tab */}
      {tab === 'prop-setter' && (
        <div className="max-w-lg space-y-5">
          <div className="card rounded-xl p-6 space-y-4">
            <h3 className="font-display text-base font-semibold" style={{ color: 'var(--text-primary)' }}>Set Today&apos;s Prop of the Day</h3>
            <div className="gold-divider" />

            {[
              { label: 'Player Name', value: propPlayer, onChange: setPropPlayer, placeholder: 'e.g. LeBron James' },
              { label: 'Stat Type', value: propStat, onChange: setPropStat, placeholder: 'e.g. Points' },
              { label: 'Line', value: propLine, onChange: setPropLine, placeholder: 'e.g. 29.5' },
            ].map((field, i) => (
              <div key={i} className="space-y-1.5">
                <label className="text-sm font-body font-medium" style={{ color: 'var(--text-secondary)' }}>{field.label}</label>
                <input
                  value={field.value}
                  onChange={e => field.onChange(e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 rounded-xl border text-sm font-body outline-none"
                  style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                />
              </div>
            ))}

            <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--emerald-light)', border: '1px solid var(--emerald)' }}>
              <p className="text-sm font-body" style={{ color: 'var(--text-primary)' }}>
                Preview: <strong>{propPlayer}</strong> Over {propLine} {propStat}
              </p>
            </div>

            <button className="w-full py-3 rounded-xl text-white font-body font-semibold text-sm transition-all hover:opacity-90"
              style={{ backgroundColor: 'var(--emerald)' }}>
              Publish Prop of the Day
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
