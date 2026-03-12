'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Check, X, Zap } from 'lucide-react'

type Billing = 'monthly' | 'annual'

const plans = [
  {
    name: 'Free',
    price: { monthly: 0, annual: 0 },
    desc: 'For casual bettors getting started',
    badge: null,
    color: 'var(--border)',
    features: [
      { text: '5 player lookups / day', included: true },
      { text: 'Basic hit rate data', included: true },
      { text: 'Today\'s top props (limited)', included: true },
      { text: 'Dashboard overview', included: true },
      { text: 'Line Movement Tracker', included: false },
      { text: 'Sportsbook Comparison', included: false },
      { text: 'Defensive Intelligence', included: false },
      { text: 'Similar Players', included: false },
      { text: 'Portfolio Analytics', included: false },
      { text: 'Capital Momentum', included: false },
    ],
    cta: 'Get Started Free',
    ctaHref: '/register',
    ctaStyle: 'outline' as const,
  },
  {
    name: 'Pro',
    price: { monthly: 20, annual: 15 },
    desc: 'For serious bettors who want every edge',
    badge: 'MOST POPULAR',
    color: 'var(--gold)',
    features: [
      { text: 'Unlimited player lookups', included: true },
      { text: 'Full hit rate & game log data', included: true },
      { text: 'All player props & lines', included: true },
      { text: 'Dashboard + all pages', included: true },
      { text: 'Line Movement Tracker', included: true },
      { text: 'Sportsbook Comparison', included: true },
      { text: 'Defensive Intelligence', included: true },
      { text: 'Similar Players', included: true },
      { text: 'Portfolio Analytics', included: true },
      { text: 'Live +EV Feed', included: true },
    ],
    cta: 'Start Pro — 7 Day Free Trial',
    ctaHref: '/register',
    ctaStyle: 'primary' as const,
  },
  {
    name: 'Institutional',
    price: { monthly: 99, annual: 79 },
    desc: 'For syndicates, funds, and professional bettors',
    badge: null,
    color: 'var(--intel-blue)',
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'API access (backend)', included: true },
      { text: 'Custom model integrations', included: true },
      { text: 'Sharpe ratio & drawdown reports', included: true },
      { text: 'Capital Momentum dashboard', included: true },
      { text: 'Multi-user team accounts', included: true },
      { text: 'Priority data refresh', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'Custom alerts & webhooks', included: true },
      { text: 'White-glove onboarding', included: true },
    ],
    cta: 'Contact Sales',
    ctaHref: 'mailto:sales@propedge.io',
    ctaStyle: 'intel' as const,
  },
]

export function PricingPage() {
  const [billing, setBilling] = useState<Billing>('monthly')

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="font-display text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
          The Bloomberg Terminal for Sports Betting
        </h1>
        <p className="text-base font-body max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
          Institutional-grade analytics for every level of bettor. No fluff, pure edge.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <span className="text-sm font-body" style={{ color: billing === 'monthly' ? 'var(--text-primary)' : 'var(--text-muted)' }}>Monthly</span>
          <button
            onClick={() => setBilling(billing === 'monthly' ? 'annual' : 'monthly')}
            className="relative w-12 h-6 rounded-full transition-colors"
            style={{ backgroundColor: billing === 'annual' ? 'var(--emerald)' : 'var(--border)' }}
          >
            <span className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform shadow-sm"
              style={{ transform: billing === 'annual' ? 'translateX(24px)' : 'translateX(0)' }} />
          </button>
          <span className="text-sm font-body" style={{ color: billing === 'annual' ? 'var(--text-primary)' : 'var(--text-muted)' }}>
            Annual <span className="ml-1 badge text-white text-[9px]" style={{ backgroundColor: 'var(--emerald)' }}>SAVE 25%</span>
          </span>
        </div>
      </div>

      {/* Gold Divider */}
      <div className="gold-divider w-24 mx-auto" />

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="relative card rounded-2xl p-6 flex flex-col"
            style={{
              borderColor: plan.badge ? 'var(--gold)' : 'var(--border)',
              borderWidth: plan.badge ? 2 : 1,
            }}
          >
            {plan.badge && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="badge text-white text-[10px] px-3 py-1" style={{ backgroundColor: 'var(--gold)' }}>
                  {plan.badge}
                </span>
              </div>
            )}

            <div className="mb-5">
              <h2 className="font-display text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{plan.name}</h2>
              <p className="text-sm font-body mt-1" style={{ color: 'var(--text-muted)' }}>{plan.desc}</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  ${plan.price[billing]}
                </span>
                {plan.price[billing] > 0 && (
                  <span className="text-sm font-body" style={{ color: 'var(--text-muted)' }}>/mo</span>
                )}
              </div>
              {billing === 'annual' && plan.price.annual > 0 && (
                <p className="text-xs font-body mt-1" style={{ color: 'var(--text-muted)' }}>
                  Billed annually · ${plan.price.annual * 12}/yr
                </p>
              )}
            </div>

            {/* Gold divider */}
            <div className="gold-divider mb-5" style={{ opacity: 0.5 }} />

            {/* Features */}
            <ul className="flex-1 space-y-2.5 mb-6">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm font-body">
                  {f.included
                    ? <Check className="h-4 w-4 shrink-0" style={{ color: 'var(--emerald)' }} />
                    : <X className="h-4 w-4 shrink-0" style={{ color: 'var(--border)' }} />
                  }
                  <span style={{ color: f.included ? 'var(--text-primary)' : 'var(--text-muted)' }}>{f.text}</span>
                </li>
              ))}
            </ul>

            <Link
              href={plan.ctaHref}
              className="w-full py-3 rounded-xl text-center font-body font-semibold text-sm transition-all hover:opacity-90"
              style={
                plan.ctaStyle === 'primary'
                  ? { backgroundColor: 'var(--emerald)', color: 'white' }
                  : plan.ctaStyle === 'intel'
                  ? { backgroundColor: 'var(--intel-blue)', color: 'white' }
                  : { backgroundColor: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border)' }
              }
            >
              {plan.ctaStyle === 'primary' && <Zap className="h-4 w-4 inline mr-1.5" />}
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      {/* FAQ / Guarantee */}
      <div className="card rounded-2xl p-6 text-center">
        <h3 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>30-Day Money-Back Guarantee</h3>
        <p className="text-sm font-body max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
          Not gaining an edge? Get a full refund within 30 days — no questions asked. We&apos;re confident PropEdge Intelligence will change how you bet.
        </p>
      </div>
    </div>
  )
}
