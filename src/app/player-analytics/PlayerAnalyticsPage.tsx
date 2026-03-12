'use client'
import { useState } from 'react'
import Link from 'next/link'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts'
import { StatTooltip } from '@/components/charts/StatTooltip'
import { PremiumLock } from '@/components/charts/PremiumLock'
import { players, gameLog, hitRateBarData, playerProps, similarPlayers, defensiveIntel, markets } from '@/data/mockData'
import { Search, Filter, ChevronDown, TrendingUp, TrendingDown } from 'lucide-react'

const statFilters = ['Points', 'Assists', 'Rebounds', 'Threes', 'Pts+Ast', 'Pts+Reb']

export function PlayerAnalyticsPage() {
  const [selectedPlayer, setSelectedPlayer] = useState(players[0])
  const [selectedStat, setSelectedStat] = useState('Points')
  const [viewMode, setViewMode] = useState<'avg' | 'median'>('avg')
  const [searchQuery, setSearchQuery] = useState('')
  const [h2hFilter, setH2hFilter] = useState(false)
  const [b2bFilter, setB2bFilter] = useState(false)
  const [showPlayerDropdown, setShowPlayerDropdown] = useState(false)

  const filteredPlayers = players.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const avgPts = gameLog.reduce((sum, g) => sum + g.pts, 0) / gameLog.length
  const sortedPts = [...gameLog].sort((a, b) => a.pts - b.pts)
  const medianPts = sortedPts[Math.floor(sortedPts.length / 2)].pts
  const displayLine = viewMode === 'avg' ? avgPts : medianPts

  const hitCount = hitRateBarData.filter(d => d.hit).length
  const hitRate = Math.round((hitCount / hitRateBarData.length) * 100)

  return (
    <div className="p-4 md:p-6 space-y-5 max-w-[1440px] mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>Player Analytics</h1>
          <p className="text-sm font-body mt-0.5" style={{ color: 'var(--text-muted)' }}>Prop research & historical performance</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2 items-center">
        {/* Player Search */}
        <div className="relative">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-body font-medium border transition-colors"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            onClick={() => setShowPlayerDropdown(!showPlayerDropdown)}
          >
            <Search className="h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
            {selectedPlayer.name}
            <ChevronDown className="h-3.5 w-3.5 ml-1" style={{ color: 'var(--text-muted)' }} />
          </button>
          {showPlayerDropdown && (
            <div className="absolute top-full left-0 mt-1 z-20 w-64 rounded-xl border shadow-lg overflow-hidden"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
              <div className="p-2 border-b" style={{ borderColor: 'var(--border)' }}>
                <input
                  className="w-full px-3 py-1.5 rounded-lg text-sm font-body outline-none"
                  style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)' }}
                  placeholder="Search players..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="max-h-52 overflow-y-auto py-1">
                {filteredPlayers.map(p => (
                  <button
                    key={p.id}
                    className="w-full flex items-center gap-3 px-3 py-2 text-left hover:opacity-80 transition-colors"
                    style={{ backgroundColor: selectedPlayer.id === p.id ? 'var(--emerald-light)' : 'transparent', color: selectedPlayer.id === p.id ? 'var(--emerald)' : 'var(--text-primary)' }}
                    onClick={() => { setSelectedPlayer(p); setShowPlayerDropdown(false); setSearchQuery('') }}
                  >
                    <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-body shrink-0" style={{ backgroundColor: 'var(--bg-surface)' }}>
                      #{p.number}
                    </span>
                    <div>
                      <p className="text-sm font-body font-semibold">{p.name}</p>
                      <p className="text-[10px] font-body" style={{ color: 'var(--text-muted)' }}>{p.team} · {p.position}</p>
                    </div>
                    <span className={`ml-auto text-[10px] badge ${p.status === 'Active' ? 'bg-emerald/20 text-profit' : p.status === 'Questionable' ? '' : 'bg-coral/20 text-loss'}`}
                      style={p.status === 'Questionable' ? { backgroundColor: 'var(--gold-light)', color: 'var(--gold)' } : {}}>
                      {p.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Market filters */}
        <div className="flex gap-1.5 flex-wrap">
          {statFilters.map(s => (
            <button
              key={s}
              onClick={() => setSelectedStat(s)}
              className="px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-all"
              style={{
                backgroundColor: selectedStat === s ? 'var(--emerald)' : 'var(--bg-card)',
                color: selectedStat === s ? 'white' : 'var(--text-secondary)',
                border: `1px solid ${selectedStat === s ? 'var(--emerald)' : 'var(--border)'}`,
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Context Filters */}
        <div className="flex gap-1.5 ml-auto">
          {[
            { label: 'H2H', key: 'h2h', active: h2hFilter, set: setH2hFilter },
            { label: 'B2B', key: 'b2b', active: b2bFilter, set: setB2bFilter },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => f.set(!f.active)}
              className="px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-all"
              style={{
                backgroundColor: f.active ? 'var(--gold-light)' : 'var(--bg-card)',
                color: f.active ? 'var(--gold)' : 'var(--text-secondary)',
                border: `1px solid ${f.active ? 'var(--gold)' : 'var(--border)'}`,
              }}
            >
              <StatTooltip stat={f.label}><span>{f.label}</span></StatTooltip>
            </button>
          ))}
        </div>
      </div>

      {/* Avg / Median Toggle */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-body font-medium" style={{ color: 'var(--text-muted)' }}>View mode:</span>
        <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
          {(['avg', 'median'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className="px-4 py-1.5 text-xs font-body font-semibold transition-colors capitalize"
              style={{
                backgroundColor: viewMode === mode ? 'var(--emerald)' : 'var(--bg-card)',
                color: viewMode === mode ? 'white' : 'var(--text-secondary)',
              }}
            >
              {mode === 'avg' ? 'Average' : 'Median'}
            </button>
          ))}
        </div>
        <span className="text-xs font-body px-2 py-1 rounded-lg" style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-muted)' }}>
          {viewMode === 'avg' ? 'Avg' : 'Median'}: <strong style={{ color: 'var(--text-primary)' }}>{displayLine.toFixed(1)} PTS</strong>
        </span>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Player Info + Stats */}
        <div className="space-y-4">
          {/* Player Card */}
          <div className="card rounded-xl p-5">
            <div className="flex gap-4">
              <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0" style={{ border: '2px solid var(--border)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={selectedPlayer.photo} alt={selectedPlayer.name} className="w-full h-full object-cover"
                  onError={e => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80x80/1E4D3A/fff?text=' + selectedPlayer.name.charAt(0) }} />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-display text-xl font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{selectedPlayer.name}</h2>
                <p className="text-sm font-body" style={{ color: 'var(--text-muted)' }}>{selectedPlayer.team} · {selectedPlayer.position} · #{selectedPlayer.number}</p>
                <span className="mt-1.5 badge text-xs"
                  style={{
                    backgroundColor: selectedPlayer.status === 'Active' ? 'var(--emerald-light)' : selectedPlayer.status === 'Questionable' ? 'var(--gold-light)' : 'var(--coral-light)',
                    color: selectedPlayer.status === 'Active' ? 'var(--emerald)' : selectedPlayer.status === 'Questionable' ? 'var(--gold)' : 'var(--coral)',
                  }}>
                  ● {selectedPlayer.status}
                </span>
              </div>
            </div>

            {/* Season Averages */}
            <div className="mt-4 grid grid-cols-4 gap-2">
              {[
                { label: 'PTS', value: '31.2' },
                { label: 'AST', value: '8.4' },
                { label: 'REB', value: '7.1' },
                { label: <StatTooltip stat="USG%"><span>USG%</span></StatTooltip>, value: '31.5' },
              ].map((s, i) => (
                <div key={i} className="rounded-lg p-2 text-center" style={{ backgroundColor: 'var(--bg-surface)' }}>
                  <p className="text-xs font-body" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
                  <p className="text-lg font-body font-bold" style={{ color: 'var(--text-primary)' }}>{s.value}</p>
                </div>
              ))}
            </div>

            <Link href={`/player/${selectedPlayer.id}`} className="mt-3 w-full py-2 rounded-lg border text-xs font-body font-medium flex items-center justify-center gap-1.5 hover:opacity-80 transition-opacity"
              style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
              View Full Profile →
            </Link>
          </div>

          {/* Top Player Props */}
          <div className="card rounded-xl p-5">
            <h3 className="font-display text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Prop Lines</h3>
            <div className="space-y-2">
              {playerProps.filter(p => p.player === selectedPlayer.name || playerProps.indexOf(p) < 3).slice(0, 4).map((p, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-body font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{p.prop}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] font-body" style={{ color: 'var(--text-muted)' }}>Proj: {p.projection}</span>
                      <span className="text-[10px] font-body px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: p.positive ? 'var(--emerald-light)' : 'var(--coral-light)', color: p.positive ? 'var(--emerald)' : 'var(--coral)' }}>
                        {p.confidence}% conf
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-body font-bold" style={{ color: p.positive ? 'var(--emerald)' : 'var(--coral)' }}>{p.odds}</p>
                    <p className="text-[10px] font-body" style={{ color: p.hitRate >= 50 ? 'var(--emerald)' : 'var(--coral)' }}>{p.hitRate}% HR</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center: Hit Rate Chart */}
        <div className="space-y-4">
          <div className="card rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-display text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Hit Rate — Last 12 Games</h3>
                <p className="text-xs font-body mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  {selectedStat} vs 29.5 line · <span style={{ color: hitRate >= 50 ? 'var(--emerald)' : 'var(--coral)' }}>{hitRate}% ({hitCount}/{hitRateBarData.length})</span>
                </p>
              </div>
              <div className="flex gap-2 text-xs font-body">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: 'var(--emerald)' }} /> Hit</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: 'var(--coral)' }} /> Miss</span>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={hitRateBarData} margin={{ top: 5, right: 8, bottom: 5, left: 0 }}>
                <XAxis dataKey="game" tick={{ fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'Inter' }} axisLine={false} tickLine={false} width={28} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11, fontFamily: 'Inter' }}
                  formatter={(value: number, _: string, entry: { payload?: { hit?: boolean } }) => [value + ' PTS', entry.payload?.hit ? '✅ Hit' : '❌ Miss']}
                />
                <ReferenceLine y={displayLine} stroke="var(--gold)" strokeDasharray="4 3" strokeWidth={2} label={{ value: `${viewMode === 'avg' ? 'AVG' : 'MED'} ${displayLine.toFixed(1)}`, fontSize: 9, fill: 'var(--gold)', fontFamily: 'Inter' }} />
                <Bar dataKey="value" radius={[3, 3, 0, 0]}>
                  {hitRateBarData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.hit ? 'var(--emerald)' : 'var(--coral)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Similar Players — Locked */}
          <div className="card rounded-xl p-5 relative overflow-hidden" style={{ minHeight: 200 }}>
            <h3 className="font-display text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Similar Players</h3>
            <div className="space-y-2 blur-sm pointer-events-none">
              <div className="grid grid-cols-5 gap-2 text-xs font-body font-semibold pb-1.5 border-b" style={{ color: 'var(--text-muted)', borderColor: 'var(--border)' }}>
                <span className="col-span-2">Player</span><span className="text-center">PTS</span><span className="text-center">HR%</span><span className="text-center">Sim</span>
              </div>
              {similarPlayers.map((p, i) => (
                <div key={i} className="grid grid-cols-5 gap-2 text-xs font-body py-1.5 border-b" style={{ borderColor: 'var(--border)' }}>
                  <span className="col-span-2 font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{p.name}</span>
                  <span className="text-center" style={{ color: 'var(--text-secondary)' }}>{p.pts}</span>
                  <span className="text-center text-profit">62%</span>
                  <span className="text-center font-bold" style={{ color: 'var(--intel-blue)' }}>{p.similarity}%</span>
                </div>
              ))}
            </div>
            <PremiumLock title="Similar Players" message="Compare player profiles and hit rates across the league" />
          </div>
        </div>

        {/* Right: Game Log + Defensive Intel */}
        <div className="space-y-4">
          {/* Game Log */}
          <div className="card rounded-xl p-5">
            <h3 className="font-display text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Game Log</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-body">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    {['Game', 'Date', 'PTS', 'AST', 'REB',
                      <StatTooltip key="cl" stat="CL"><span>CL</span></StatTooltip>,
                      <StatTooltip key="usg" stat="USG%"><span>USG%</span></StatTooltip>
                    ].map((h, i) => (
                      <th key={i} className="text-left py-2 px-2 font-semibold" style={{ color: 'var(--text-muted)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {gameLog.slice(0, 8).map((row, i) => (
                    <tr key={i} className="transition-colors hover:opacity-80" style={{ borderBottom: '1px solid var(--border)' }}>
                      <td className="py-2 px-2 font-semibold" style={{ color: 'var(--text-primary)' }}>{row.game}</td>
                      <td className="py-2 px-2" style={{ color: 'var(--text-muted)' }}>{row.date}</td>
                      <td className="py-2 px-2 font-bold" style={{ color: row.pts > 29.5 ? 'var(--emerald)' : 'var(--coral)' }}>{row.pts}</td>
                      <td className="py-2 px-2" style={{ color: 'var(--text-primary)' }}>{row.ast}</td>
                      <td className="py-2 px-2" style={{ color: 'var(--text-primary)' }}>{row.reb}</td>
                      <td className="py-2 px-2" style={{ color: 'var(--text-muted)' }}>{row.cl}</td>
                      <td className="py-2 px-2" style={{ color: 'var(--text-muted)' }}>{row.usg}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Defensive Intelligence — Locked */}
          <div className="card rounded-xl p-5 relative overflow-hidden" style={{ minHeight: 220 }}>
            <h3 className="font-display text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Defensive Intelligence</h3>
            <div className="space-y-2 blur-sm pointer-events-none">
              {[
                { label: 'DEF vs Position', value: defensiveIntel.defVsPosition },
                { label: <StatTooltip stat="PITP"><span>Pts Allowed (PITP)</span></StatTooltip>, value: defensiveIntel.paintPointsAllowed },
                { label: 'Matchup Score', value: defensiveIntel.matchupScore },
                { label: 'Opponent DEF RTG', value: defensiveIntel.opponentDefRating },
                { label: 'Opponent', value: defensiveIntel.opponent },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-1.5 border-b text-xs font-body" style={{ borderColor: 'var(--border)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{item.label}</span>
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{item.value}</span>
                </div>
              ))}
            </div>
            <PremiumLock title="Defensive Intelligence" message="Opponent defensive matchup data and paint coverage analysis" />
          </div>
        </div>
      </div>
    </div>
  )
}
