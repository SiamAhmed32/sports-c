'use client'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { volatilityHeatmap, evFeed, marketTimingSignals, capitalMomentumData } from '@/data/mockData'
import { Clock, Zap, TrendingUp, AlertTriangle } from 'lucide-react'
import { volatilityColor } from '@/lib/utils'

export function AnalyticsInsightsPage() {
  return (
    <div className="p-4 md:p-6 space-y-5 max-w-[1440px] mx-auto">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>Analytics Insights</h1>
        <p className="text-sm font-body mt-0.5" style={{ color: 'var(--text-muted)' }}>AI-powered market intelligence and betting signals</p>
      </div>
      <div className="gold-divider w-24" />

      {/* Morning Briefing */}
      <div className="card rounded-xl p-5" style={{ borderLeft: '4px solid var(--gold)' }}>
        <div className="flex items-start gap-3">
          <Zap className="h-5 w-5 mt-0.5 shrink-0" style={{ color: 'var(--gold)' }} />
          <div>
            <h2 className="font-display text-base font-semibold" style={{ color: 'var(--text-primary)' }}>Morning Briefing — March 12, 2026</h2>
            <p className="text-sm font-body mt-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Sharp money is heavily targeting the <strong style={{ color: 'var(--text-primary)' }}>Lakers spread</strong> tonight, 
              with the line moving from -3.5 to -5.25 since open. The GSW-DEN game is near a pick&apos;em after 
              a late <strong style={{ color: 'var(--text-primary)' }}>Curry injury update</strong>. 
              Top EV props today: <strong style={{ color: 'var(--emerald)' }}>Curry Over 4.5 3PM (+8.2% EV)</strong> 
              and <strong style={{ color: 'var(--emerald)' }}>Tatum Over 27.5 PTS (+5.1% EV)</strong>.
            </p>
            <div className="flex items-center gap-2 mt-3">
              <Clock className="h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
              <span className="text-xs font-body" style={{ color: 'var(--text-muted)' }}>Updated 6:00 AM ET</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Heatmap + EV Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Volatility Heatmap */}
        <div className="card rounded-xl p-5">
          <h2 className="font-display text-base font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Volatility Heatmap</h2>
          <div className="space-y-3">
            {volatilityHeatmap.map((item, i) => {
              const colors = volatilityColor(item.volatility)
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-body font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{item.game}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`badge text-[9px] ${colors.bg} ${colors.text}`} style={{ border: `1px solid`, borderColor: colors.border.replace('border-', '') }}>
                          {item.volatility.toUpperCase()}
                        </span>
                        <span className="text-xs font-body" style={{ color: item.change.startsWith('+') ? 'var(--emerald)' : 'var(--coral)' }}>{item.change}</span>
                      </div>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)' }}>
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${item.pct}%`,
                          backgroundColor: item.volatility === 'high' ? 'var(--coral)' : item.volatility === 'moderate' ? 'var(--gold)' : 'var(--emerald)',
                        }}
                      />
                    </div>
                    <div className="flex justify-between mt-0.5">
                      <span className="text-[10px] font-body" style={{ color: 'var(--text-muted)' }}>Volatility Index</span>
                      <span className="text-[10px] font-body font-semibold" style={{ color: 'var(--text-primary)' }}>{item.pct}/100</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Live EV Feed */}
        <div className="card rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="font-display text-base font-semibold" style={{ color: 'var(--text-primary)' }}>Live +EV Feed</h2>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-body font-semibold" style={{ backgroundColor: 'var(--coral-light)', color: 'var(--coral)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--coral)' }} />
              LIVE
            </span>
          </div>
          <div className="space-y-2">
            {evFeed.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ backgroundColor: 'var(--emerald)' }}>
                  {item.player.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-body font-semibold" style={{ color: 'var(--text-primary)' }}>{item.player} <span style={{ color: 'var(--text-muted)' }}>({item.team})</span></p>
                  <p className="text-[10px] font-body truncate" style={{ color: 'var(--text-muted)' }}>{item.prop} · {item.book}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-body font-bold text-profit">{item.ev}</p>
                  <p className="text-[10px] font-body" style={{ color: 'var(--text-muted)' }}>{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Capital Momentum Visualization */}
      <div className="card rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display text-base font-semibold" style={{ color: 'var(--text-primary)' }}>Capital Momentum Visualization</h2>
            <p className="text-xs font-body mt-0.5" style={{ color: 'var(--text-muted)' }}>Real-time flow of sharp, public, and expected-value capital throughout the day</p>
          </div>
          <div className="flex gap-4 text-xs font-body">
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 inline-block rounded" style={{ backgroundColor: 'var(--emerald)' }} />Sharp</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 inline-block rounded" style={{ backgroundColor: 'var(--coral)' }} />Public</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 inline-block rounded" style={{ backgroundColor: 'var(--gold)' }} />EV</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={capitalMomentumData} margin={{ top: 5, right: 8, bottom: 5, left: 0 }}>
            <defs>
              <linearGradient id="sharpGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--emerald)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--emerald)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="publicGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--coral)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="var(--coral)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="evGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--gold)" stopOpacity={0.25} />
                <stop offset="95%" stopColor="var(--gold)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="hour" tick={{ fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'Inter' }} axisLine={false} tickLine={false} width={30} />
            <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12, fontFamily: 'Inter' }} />
            <Area type="monotone" dataKey="sharp" name="Sharp $" stroke="var(--emerald)" strokeWidth={2.5} fill="url(#sharpGrad)" />
            <Area type="monotone" dataKey="public" name="Public $" stroke="var(--coral)" strokeWidth={2} fill="url(#publicGrad)" />
            <Area type="monotone" dataKey="ev" name="EV Capital" stroke="var(--gold)" strokeWidth={2} fill="url(#evGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Market Timing Signals */}
      <div className="card rounded-xl p-5">
        <h2 className="font-display text-base font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Market Timing Signals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {marketTimingSignals.map((signal, i) => {
            const iconMap: Record<string, React.ReactNode> = {
              clock: <Clock className="h-5 w-5" />,
              trending: <TrendingUp className="h-5 w-5" />,
              alert: <AlertTriangle className="h-5 w-5" />,
            }
            const colorMap: Record<string, string> = { emerald: 'var(--emerald)', intel: 'var(--intel-blue)', coral: 'var(--coral)' }
            const c = colorMap[signal.color]
            return (
              <div key={i} className="rounded-xl p-4" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${c}20`, color: c }}>
                    {iconMap[signal.icon]}
                  </div>
                  <p className="text-sm font-body font-semibold" style={{ color: 'var(--text-primary)' }}>{signal.type}</p>
                </div>
                <p className="text-xs font-body leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{signal.desc}</p>
                <div className="flex gap-1.5 mt-2.5 flex-wrap">
                  {signal.games.map(g => (
                    <span key={g} className="badge text-[9px] px-2 py-0.5" style={{ backgroundColor: `${c}18`, color: c, border: `1px solid ${c}40` }}>{g}</span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
