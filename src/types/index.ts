// Odds API Types (mirrors real API response)
export interface Outcome {
  name: string
  price: number
  point?: number
}

export interface Market {
  key: 'h2h' | 'spreads' | 'totals' | 'player_props'
  last_update: string
  outcomes: Outcome[]
}

export interface Bookmaker {
  key: string
  title: string
  last_update: string
  markets: Market[]
}

export interface OddsGame {
  id: string
  sport_key: string
  sport_title: string
  commence_time: string
  home_team: string
  away_team: string
  bookmakers: Bookmaker[]
}

// Player Types
export interface Player {
  id: number
  name: string
  team: string
  position: string
  number: number
  photo: string
  status: 'Active' | 'Questionable' | 'Out'
}

export interface GameLog {
  game: string
  date: string
  pts: number
  ast: number
  reb: number
  threes: number
  min: number
  usg: number
  fga: number
  cl: number // Closing Line
}

export interface PlayerProp {
  player: string
  team: string
  prop: string
  line: number
  stat: string
  odds: string
  projection: number
  confidence: number
  hitRate: number
  hitFraction: string
  positive: boolean
}

// Portfolio Types
export interface KPI {
  label: string
  value: string
  change: string
  positive: boolean
  key: string
}

// Admin Types
export interface AdminUser {
  id: number
  name: string
  email: string
  plan: 'Free' | 'Pro' | 'Institutional'
  status: 'Active' | 'Suspended'
  joined: string
  revenue: string
}

// Line Movement
export interface LinePoint {
  time: string
  sharp: number
  public: number
}

// Navigation
export interface NavItem {
  title: string
  href: string
  icon: string
  premium?: boolean
}
