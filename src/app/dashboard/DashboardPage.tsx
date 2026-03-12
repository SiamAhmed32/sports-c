'use client'
import { PlayerCard } from '@/components/charts/PlayerCard'
import { OddsLineChart } from '@/components/charts/OddsLineChart'
import { RiskGauge } from '@/components/charts/RiskGauge'
import {
  propOfTheDay, playerOddsData, playerProps, marketEfficiencyData, oddsGames,
} from '@/data/mockData'
import { formatOdds } from '@/lib/utils'
import { TrendingUp, Activity, Clock } from 'lucide-react'

const books = ['FanDuel', 'DraftKings', 'BetMGM']

export function DashboardPage() {
  const game = oddsGames[0]
  const h2hMarket = (book: typeof game.bookmakers[0]) =>
    book.markets.find(m => m.key === 'h2h')
  const spreadMarket = (book: typeof game.bookmakers[0]) =>
    book.markets.find(m => m.key === 'spreads')
  const totalMarket = (book: typeof game.bookmakers[0]) =>
    book.markets.find(m => m.key === 'totals')

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1440px] mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            Dashboard
          </h1>
          <p className="text-sm font-body mt-1" style={{ color: 'var(--text-muted)' }}>
            Real-time betting intelligence — March 12, 2026
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-semibold" style={{ backgroundColor: 'var(--emerald-light)', color: 'var(--emerald)' }}>
          <Activity className="h-3 w-3 animate-pulse" />
          LIVE
        </div>
      </div>

      {/* Top Row: Player Card + Odds Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Prop of the Day */}
        <PlayerCard
          name={propOfTheDay.playerName}
          team={propOfTheDay.team}
          jerseyNumber={propOfTheDay.jerseyNumber}
          photoUrl={propOfTheDay.photoUrl}
          bet={propOfTheDay.bet}
          projection={propOfTheDay.projection}
          stat={propOfTheDay.stat}
          odds={propOfTheDay.odds}
          confidence={propOfTheDay.confidence}
          hitRate={propOfTheDay.hitRate}
          hitFraction={propOfTheDay.hitFraction}
        />

        {/* Player Odds Chart */}
        <div className="lg:col-span-2 card rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display text-lg font-medium" style={{ color: 'var(--text-primary)' }}>
                Player Odds Movement
              </h2>
              <p className="text-xs font-body mt-0.5" style={{ color: 'var(--text-muted)' }}>LeBron James — Points Market</p>
            </div>
            <div className="flex gap-3 text-xs font-body">
              <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 rounded inline-block" style={{ backgroundColor: 'var(--emerald)' }} /> Sharp</span>
              <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 rounded inline-block" style={{ backgroundColor: 'var(--coral)', borderTop: '2px dashed var(--coral)' }} /> Public</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <OddsLineChart
                data={playerOddsData}
                xKey="day"
                line1Key="optimal"
                line2Key="public"
                line1Label="Sharp Line"
                line2Label="Public Line"
                height={200}
              />
            </div>
            {/* Prop Odds Cards */}
            <div className="md:w-44 space-y-2">
              {[
                { label: 'Over 29.5 PTS', odds: '-120' },
                { label: 'Over 8.5 AST', odds: '+190' },
                { label: 'Triple Double', odds: '+480' },
              ].map((p, i) => (
                <div key={i} className="rounded-lg px-3 py-2.5" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
                  <p className="text-[11px] font-body" style={{ color: 'var(--text-muted)' }}>{p.label}</p>
                  <p className="text-lg font-body font-bold mt-0.5" style={{ color: p.odds.startsWith('+') ? 'var(--emerald)' : 'var(--coral)' }}>
                    {p.odds}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row: Risk + Market Efficiency + Top Props */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Betting Risk Engine */}
        <div className="card rounded-xl p-5">
          <h2 className="font-display text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
            Betting Risk Engine
          </h2>
          <RiskGauge score={62} />
          <p className="text-center text-xs font-body mt-2" style={{ color: 'var(--text-muted)' }}>
            Based on today&apos;s market conditions
          </p>
        </div>

        {/* Market Efficiency */}
        <div className="card rounded-xl p-5">
          <h2 className="font-display text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
            Player Market Efficiency
          </h2>
          <OddsLineChart
            data={marketEfficiencyData}
            xKey="game"
            line1Key="optimal"
            line2Key="public"
            line1Label="Model"
            line2Label="Market"
            height={140}
          />
        </div>

        {/* Top 3 Player Props */}
        <div className="card rounded-xl p-5">
          <h2 className="font-display text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Top Player Props
          </h2>
          <div className="space-y-3">
            {playerProps.slice(0, 3).map((p, i) => (
              <div key={i} className="flex items-center gap-3">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-body shrink-0"
                  style={{ backgroundColor: 'var(--emerald-light)', color: 'var(--emerald)' }}
                >
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{p.player}</p>
                  <p className="text-[11px] font-body truncate" style={{ color: 'var(--text-muted)' }}>{p.prop}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-body font-bold" style={{ color: p.positive ? 'var(--emerald)' : 'var(--coral)' }}>{p.odds}</p>
                  <p className="text-[10px] font-body" style={{ color: p.hitRate >= 50 ? 'var(--emerald)' : 'var(--coral)' }}>{p.hitRate}% HR</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Games */}
        <div className="card rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Tonight&apos;s Games</h2>
            <span className="badge text-white text-[9px]" style={{ backgroundColor: 'var(--coral)' }}>3 GAMES</span>
          </div>
          <div className="space-y-3">
            {oddsGames.map((g) => (
              <div key={g.id} className="rounded-lg px-3 py-2" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-body font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {g.away_team.split(' ').pop()} @ {g.home_team.split(' ').pop()}
                  </p>
                  <span className="flex items-center gap-1 text-[10px] font-body" style={{ color: 'var(--text-muted)' }}>
                    <Clock className="h-2.5 w-2.5" />
                    {new Date(g.commence_time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                  </span>
                </div>
                {g.bookmakers[0] && h2hMarket(g.bookmakers[0]) && (
                  <div className="flex gap-3 mt-1">
                    {h2hMarket(g.bookmakers[0])!.outcomes.map((o) => (
                      <span key={o.name} className="text-[10px] font-body font-semibold" style={{ color: o.price > 0 ? 'var(--emerald)' : 'var(--coral)' }}>
                        {o.name.split(' ').pop()} {formatOdds(o.price)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Sportsbook Odds Table */}
      <div className="card rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-medium" style={{ color: 'var(--text-primary)' }}>Current Sportsbook Odds</h2>
          <span className="text-xs font-body px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-muted)' }}>
            LAL vs BOS · Tonight 7:30 PM ET
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-body">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th className="text-left py-3 px-4 font-semibold" style={{ color: 'var(--text-muted)' }}>Sportsbook</th>
                <th className="text-center py-3 px-4 font-semibold" style={{ color: 'var(--text-muted)' }}>Home ML</th>
                <th className="text-center py-3 px-4 font-semibold" style={{ color: 'var(--text-muted)' }}>Away ML</th>
                <th className="text-center py-3 px-4 font-semibold" style={{ color: 'var(--text-muted)' }}>Spread</th>
                <th className="text-center py-3 px-4 font-semibold" style={{ color: 'var(--text-muted)' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {game.bookmakers.map((bk) => {
                const h2h = h2hMarket(bk)
                const spread = spreadMarket(bk)
                const total = totalMarket(bk)
                return (
                  <tr key={bk.key} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td className="py-3 px-4 font-semibold" style={{ color: 'var(--text-primary)' }}>{bk.title}</td>
                    <td className="py-3 px-4 text-center font-bold" style={{ color: h2h?.outcomes[0]?.price && h2h.outcomes[0].price > 0 ? 'var(--emerald)' : 'var(--coral)' }}>
                      {h2h ? formatOdds(h2h.outcomes[0].price) : '—'}
                    </td>
                    <td className="py-3 px-4 text-center font-bold" style={{ color: h2h?.outcomes[1]?.price && h2h.outcomes[1].price > 0 ? 'var(--emerald)' : 'var(--coral)' }}>
                      {h2h ? formatOdds(h2h.outcomes[1].price) : '—'}
                    </td>
                    <td className="py-3 px-4 text-center" style={{ color: 'var(--text-primary)' }}>
                      {spread ? `${spread.outcomes[0].point} (${formatOdds(spread.outcomes[0].price)})` : '—'}
                    </td>
                    <td className="py-3 px-4 text-center" style={{ color: 'var(--text-primary)' }}>
                      {total ? `O${total.outcomes[0].point} (${formatOdds(total.outcomes[0].price)})` : '—'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
