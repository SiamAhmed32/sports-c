'use client'
import { useState } from 'react'
import { OddsLineChart } from '@/components/charts/OddsLineChart'
import { PremiumLock } from '@/components/charts/PremiumLock'
import { RiskGauge } from '@/components/charts/RiskGauge'
import { lineMovementData, recentLineShifts, oddsGames } from '@/data/mockData'
import { TrendingUp, TrendingDown, ArrowUp, ArrowDown, Minus, Lock } from 'lucide-react'

const isPremium = true // Toggle to false to unlock during dev

export function LineMovementPage() {
  const [selectedGame, setSelectedGame] = useState(0)
  const game = oddsGames[selectedGame]

  return (
    <div className="p-4 md:p-6 space-y-5 max-w-[1440px] mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>Line Movement</h1>
          <p className="text-sm font-body mt-0.5" style={{ color: 'var(--text-muted)' }}>Track sharp money vs public betting lines in real time</p>
        </div>
        <span className="badge px-3 py-1.5 text-xs" style={{ backgroundColor: 'var(--gold-light)', color: 'var(--gold)', border: '1px solid var(--gold)' }}>
          <Lock className="h-3 w-3 inline mr-1" /> PRO FEATURE
        </span>
      </div>

      {/* Game Selector */}
      <div className="flex gap-2 flex-wrap">
        {oddsGames.map((g, i) => (
          <button
            key={g.id}
            onClick={() => setSelectedGame(i)}
            className="px-4 py-2 rounded-lg text-sm font-body font-medium transition-all border"
            style={{
              backgroundColor: selectedGame === i ? 'var(--emerald)' : 'var(--bg-card)',
              color: selectedGame === i ? 'white' : 'var(--text-secondary)',
              borderColor: selectedGame === i ? 'var(--emerald)' : 'var(--border)',
            }}
          >
            {g.away_team.split(' ').pop()} @ {g.home_team.split(' ').pop()}
          </button>
        ))}
      </div>

      {/* Premium wrapper */}
      <div className="relative">
        {isPremium && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 rounded-2xl"
            style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', backgroundColor: 'rgba(0,0,0,0.05)' }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--gold-light)', border: '2px solid var(--gold)' }}>
              <Lock className="h-7 w-7" style={{ color: 'var(--gold)' }} />
            </div>
            <div className="text-center">
              <h2 className="font-display text-2xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Line Movement Tracker</h2>
              <p className="font-body text-sm max-w-sm" style={{ color: 'var(--text-secondary)' }}>
                Track sharp vs public money, spot steam moves, and identify closing line value opportunities in real time.
              </p>
            </div>
            <div className="flex gap-3">
              <a href="/pricing" className="px-6 py-3 rounded-xl text-white font-body font-semibold text-sm transition-all hover:opacity-90" style={{ backgroundColor: 'var(--emerald)' }}>
                Upgrade to Pro — $20/mo
              </a>
              <button className="px-6 py-3 rounded-xl font-body font-medium text-sm border transition-all hover:opacity-80" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                View Pricing
              </button>
            </div>
            <div className="flex gap-6 text-xs font-body" style={{ color: 'var(--text-muted)' }}>
              {['Real-time Line Data', 'Sharp Money Alerts', 'Steam Move Detection', 'CLV Tracking'].map(f => (
                <span key={f} className="flex items-center gap-1"><span style={{ color: 'var(--emerald)' }}>✓</span> {f}</span>
              ))}
            </div>
          </div>
        )}

        {/* Page Content (blurred behind paywall) */}
        <div className={isPremium ? 'blur-sm pointer-events-none select-none' : ''}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Main Chart */}
            <div className="lg:col-span-2 space-y-4">
              <div className="card rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="font-display text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {game.away_team.split(' ').pop()} @ {game.home_team.split(' ').pop()} — Spread Movement
                    </h2>
                    <p className="text-xs font-body mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      Sharp line moved {lineMovementData[0].sharp} → {lineMovementData[lineMovementData.length - 1].sharp}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-semibold" style={{ backgroundColor: 'var(--coral-light)', color: 'var(--coral)' }}>
                    <TrendingDown className="h-3 w-3" /> Sharps Fading
                  </div>
                </div>
                <OddsLineChart
                  data={lineMovementData}
                  xKey="time"
                  line1Key="sharp"
                  line2Key="public"
                  line1Label="Sharp Line"
                  line2Label="Public Line"
                  height={240}
                  showLegend
                />
              </div>

              {/* Recent Shifts */}
              <div className="card rounded-xl p-5">
                <h3 className="font-display text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Recent Line Shifts</h3>
                <div className="space-y-2">
                  {recentLineShifts.map((shift, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
                      <div className={`w-2 h-2 rounded-full shrink-0`} style={{ backgroundColor: shift.type === 'sharp' ? 'var(--emerald)' : shift.type === 'public' ? 'var(--intel-blue)' : 'var(--coral)' }} />
                      <span className="text-xs font-body" style={{ color: 'var(--text-muted)' }}>{shift.time}</span>
                      <span className="text-sm font-body font-bold" style={{ color: 'var(--text-primary)' }}>{shift.odds}</span>
                      <span className="ml-auto text-xs font-body px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: shift.type === 'sharp' ? 'var(--emerald-light)' : shift.type === 'public' ? 'var(--intel-blue-light)' : 'var(--coral-light)',
                          color: shift.type === 'sharp' ? 'var(--emerald)' : shift.type === 'public' ? 'var(--intel-blue)' : 'var(--coral)',
                        }}>
                        {shift.action}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <div className="space-y-4">
              {/* Sharp Money Gauge */}
              <div className="card rounded-xl p-5 flex flex-col items-center">
                <h3 className="font-display text-sm font-semibold mb-3 self-start" style={{ color: 'var(--text-primary)' }}>Sharp Money Index</h3>
                <RiskGauge score={73} label="SHARP ACTION" />
                <p className="text-xs font-body text-center mt-2" style={{ color: 'var(--text-muted)' }}>
                  73% of tracked sharp accounts are betting {game.home_team.split(' ').pop()}
                </p>
              </div>

              {/* Public vs Sharp */}
              <div className="card rounded-xl p-5">
                <h3 className="font-display text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Money Split</h3>
                <div className="space-y-3">
                  {[
                    { label: game.home_team.split(' ').pop()!, sharp: 73, public: 38, positive: true },
                    { label: game.away_team.split(' ').pop()!, sharp: 27, public: 62, positive: false },
                  ].map((team, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs font-body mb-1.5">
                        <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{team.label}</span>
                        <span style={{ color: 'var(--text-muted)' }}>Sharp: <strong style={{ color: team.positive ? 'var(--emerald)' : 'var(--coral)' }}>{team.sharp}%</strong></span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)' }}>
                        <div className="h-full rounded-full" style={{ width: `${team.sharp}%`, backgroundColor: team.positive ? 'var(--emerald)' : 'var(--coral)' }} />
                      </div>
                      <div className="flex justify-end mt-1">
                        <span className="text-[10px] font-body" style={{ color: 'var(--text-muted)' }}>Public: {team.public}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Steam Move Alerts */}
              <div className="card rounded-xl p-5">
                <h3 className="font-display text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Steam Alerts</h3>
                <div className="space-y-2">
                  {[
                    { type: '🔥 Steam Move', time: '3:45 PM', desc: 'Multi-book sync on ' + game.home_team.split(' ').pop() + ' spread', urgent: true },
                    { type: '⚡ Reverse Line', time: '2:30 PM', desc: 'Public on Away, sharp on Home', urgent: false },
                    { type: '📊 CLV Spot', time: '1:00 PM', desc: 'Expected +2.1% closing line value', urgent: false },
                  ].map((alert, i) => (
                    <div key={i} className="rounded-lg p-3" style={{ backgroundColor: alert.urgent ? 'var(--coral-light)' : 'var(--bg-surface)', border: `1px solid ${alert.urgent ? 'var(--coral)' : 'var(--border)'}` }}>
                      <p className="text-xs font-body font-semibold" style={{ color: alert.urgent ? 'var(--coral)' : 'var(--text-primary)' }}>{alert.type}</p>
                      <p className="text-[10px] font-body mt-0.5" style={{ color: 'var(--text-muted)' }}>{alert.time} · {alert.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
