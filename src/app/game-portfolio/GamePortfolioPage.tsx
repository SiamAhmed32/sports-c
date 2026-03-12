'use client'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts'
import { portfolioKPIs, portfolioChartData, leagueExposure, institutionalMetrics, riskyGames } from '@/data/mockData'
import { TrendingUp, TrendingDown } from 'lucide-react'

export function GamePortfolioPage() {
  return (
    <div className="p-4 md:p-6 space-y-5 max-w-[1440px] mx-auto">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>Game Portfolio</h1>
        <p className="text-sm font-body mt-0.5" style={{ color: 'var(--text-muted)' }}>Institutional-grade portfolio analytics & risk management</p>
      </div>

      {/* Gold Divider */}
      <div className="gold-divider w-24" />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {portfolioKPIs.map((kpi) => (
          <div key={kpi.key} className="card rounded-xl p-5">
            <p className="text-xs font-body" style={{ color: 'var(--text-muted)' }}>{kpi.label}</p>
            <p className="font-display text-2xl font-bold mt-1" style={{ color: kpi.positive ? 'var(--emerald)' : 'var(--coral)' }}>{kpi.value}</p>
            <div className="flex items-center gap-1 mt-1.5">
              {kpi.positive ? <TrendingUp className="h-3 w-3" style={{ color: 'var(--emerald)' }} /> : <TrendingDown className="h-3 w-3" style={{ color: 'var(--coral)' }} />}
              <span className="text-[11px] font-body" style={{ color: kpi.positive ? 'var(--emerald)' : 'var(--coral)' }}>{kpi.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Cumulative P&L */}
        <div className="lg:col-span-2 card rounded-xl p-5">
          <h2 className="font-display text-base font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Cumulative P&L — 2025-26 Season</h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={portfolioChartData} margin={{ top: 5, right: 8, bottom: 5, left: 0 }}>
              <defs>
                <linearGradient id="cumulGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--emerald)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="var(--emerald)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'Inter' }} axisLine={false} tickLine={false} width={36} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12, fontFamily: 'Inter' }} formatter={(v: number) => [`${v > 0 ? '+' : ''}${v.toFixed(1)}%`]} />
              <Area type="monotone" dataKey="cumulative" stroke="var(--emerald)" strokeWidth={2.5} fill="url(#cumulGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* League Exposure */}
        <div className="card rounded-xl p-5">
          <h2 className="font-display text-base font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>League Exposure</h2>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={leagueExposure} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, value }) => `${name} ${value}%`} labelLine={false}
                fontSize={10}>
                {leagueExposure.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11, fontFamily: 'Inter' }} formatter={(v: number) => [`${v}%`]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {leagueExposure.map((l, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs font-body">
                <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: l.color }} />
                <span style={{ color: 'var(--text-secondary)' }}>{l.name}</span>
                <span className="font-semibold ml-auto" style={{ color: 'var(--text-primary)' }}>{l.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly P&L Bars */}
      <div className="card rounded-xl p-5">
        <h2 className="font-display text-base font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Monthly Profit & Loss</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={portfolioChartData} margin={{ top: 5, right: 8, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'Inter' }} axisLine={false} tickLine={false} width={36} />
            <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12, fontFamily: 'Inter' }} />
            <Bar dataKey="profit" name="Profit" fill="var(--emerald)" radius={[3, 3, 0, 0]} />
            <Bar dataKey="loss" name="Loss" fill="var(--coral)" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Institutional Metrics */}
        <div className="card rounded-xl p-5">
          <h2 className="font-display text-base font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Institutional Metrics</h2>
          <div className="grid grid-cols-2 gap-3">
            {institutionalMetrics.map((m, i) => (
              <div key={i} className="rounded-xl p-4" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
                <p className="text-xs font-body" style={{ color: 'var(--text-muted)' }}>{m.label}</p>
                <p className="font-display text-xl font-bold mt-1" style={{ color: m.positive ? 'var(--emerald)' : 'var(--coral)' }}>{m.value}</p>
                <p className="text-[10px] font-body mt-0.5" style={{ color: 'var(--text-muted)' }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* High Risk Games */}
        <div className="card rounded-xl p-5">
          <h2 className="font-display text-base font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>High-Risk Upcoming Games</h2>
          <div className="space-y-3">
            {riskyGames.map((g, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{g.matchup}</p>
                  <p className="text-xs font-body" style={{ color: 'var(--text-muted)' }}>{g.date}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="h-1.5 w-24 rounded-full overflow-hidden mb-1" style={{ backgroundColor: 'var(--border)' }}>
                    <div className="h-full rounded-full" style={{ width: `${g.riskScore}%`, backgroundColor: g.risk === 'High' ? 'var(--coral)' : 'var(--gold)' }} />
                  </div>
                  <span className="badge text-white text-[9px]" style={{ backgroundColor: g.risk === 'High' ? 'var(--coral)' : 'var(--gold)' }}>
                    {g.risk} ({g.riskScore})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
