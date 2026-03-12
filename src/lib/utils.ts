import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatOdds(price: number): string {
  return price > 0 ? `+${price}` : `${price}`
}

export function formatTime(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'America/New_York' }) + ' ET'
}

export function formatDate(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function oddsColor(odds: string): string {
  return odds.startsWith('+') ? 'text-profit' : 'text-loss'
}

export function hitRateColor(rate: number): string {
  return rate >= 50 ? 'text-profit' : 'text-loss'
}

export function riskColor(level: string): string {
  if (level === 'High') return 'bg-coral text-white'
  if (level === 'Elevated') return 'bg-gold text-white'
  return 'bg-emerald text-white'
}

export function volatilityColor(vol: string): { bg: string; text: string; border: string } {
  if (vol === 'high') return { bg: 'bg-coral/10', text: 'text-loss', border: 'border-coral/30' }
  if (vol === 'moderate') return { bg: 'bg-gold/10', text: 'text-gold', border: 'border-gold/30' }
  return { bg: 'bg-emerald/10', text: 'text-profit', border: 'border-emerald/30' }
}
