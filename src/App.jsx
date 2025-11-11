import { useEffect, useMemo, useRef, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { ArrowRight, Check, ChevronDown, PhoneCall, ShoppingCart, Truck, Play, Sparkles } from 'lucide-react'

function useOnScroll() {
  const [y, setY] = useState(0)
  useEffect(() => {
    const onScroll = () => setY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return y
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleBookDemo = () => {
    if (window.gtag) {
      window.gtag('event', 'book_demo_click', { location: 'navbar' })
    }
    if (window.fbq) {
      window.fbq('trackCustom', 'BookDemoClick', { location: 'navbar' })
    }
    const modal = document.getElementById('calendly-modal')
    if (modal) modal.dispatchEvent(new CustomEvent('open-calendly'))
  }

  const nav = [
    { href: '#problem', label: 'Problem' },
    { href: '#solution', label: 'Solution' },
    { href: '#impact', label: 'Results' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#faq', label: 'FAQ' },
  ]

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? 'backdrop-blur-md bg-[#0a0a0f]/70 border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00FFB2] to-[#0070F3] shadow-[0_0_30px_#00FFB2]" />
            <span className="text-white font-semibold tracking-tight">Recover Agent</span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-sm text-white/70 hover:text-white transition-colors">{n.label}</a>
            ))}
            <button onClick={handleBookDemo} className="relative inline-flex items-center rounded-md bg-[#00FFB2] text-black font-semibold px-4 py-2 overflow-hidden">
              <span className="relative z-10">Book Demo</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#00FFB2] to-[#0070F3] opacity-0 hover:opacity-100 transition-opacity"></span>
              <span className="absolute -inset-px rounded-md shadow-[0_0_30px_5px_#00FFB266]" />
            </button>
          </nav>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-white/80">
            <span className="sr-only">Menu</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#0a0a0f]/90 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-4">
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="text-white/80">{n.label}</a>
            ))}
            <button onClick={handleBookDemo} className="w-full rounded-md bg-[#00FFB2] text-black font-semibold px-4 py-2">Book Demo</button>
          </div>
        </div>
      )}
    </header>
  )
}

function GlowOrbs() {
  const y = useOnScroll()
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-32 -left-20 w-[40rem] h-[40rem] rounded-full bg-[#0070F3]/20 blur-3xl" style={{ transform: `translateY(${y * 0.05}px)` }} />
      <div className="absolute top-40 -right-24 w-[36rem] h-[36rem] rounded-full bg-[#00FFB2]/20 blur-3xl" style={{ transform: `translateY(${y * -0.03}px)` }} />
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[50rem] h-[50rem] rounded-full bg-[#6b21a8]/20 blur-3xl" style={{ transform: `translateY(${y * 0.02}px)` }} />
    </div>
  )
}

function CalendlyModal() {
  const ref = useRef(null)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const el = document.getElementById('calendly-modal')
    const openHandler = () => setOpen(true)
    el?.addEventListener('open-calendly', openHandler)
    return () => el?.removeEventListener('open-calendly', openHandler)
  }, [])
  return (
    <div id="calendly-modal" ref={ref}>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70">
          <div className="relative w-[95vw] max-w-3xl h-[80vh] rounded-2xl bg-[#0F0F16]/95 border border-white/10 overflow-hidden shadow-[0_0_80px_#00FFB233]">
            <button onClick={() => setOpen(false)} className="absolute top-3 right-3 text-white/60 hover:text-white">✕</button>
            <div className="h-full w-full">
              <iframe title="Book a demo" src="https://calendly.com/" className="w-full h-full" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Hero() {
  const handleBookDemo = () => {
    if (window.gtag) window.gtag('event', 'book_demo_click', { location: 'hero' })
    if (window.fbq) window.fbq('trackCustom', 'BookDemoClick', { location: 'hero' })
    const modal = document.getElementById('calendly-modal')
    if (modal) modal.dispatchEvent(new CustomEvent('open-calendly'))
  }
  const handleScrollToVideo = () => {
    const el = document.getElementById('demo')
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return (
    <section id="top" className="relative min-h-[100svh] flex items-center justify-center text-center">
      <GlowOrbs />
      <div className="absolute inset-0 bg-[radial-gradient(100%_100%_at_50%_0%,#15151F_0%,#0A0A0F_60%)]" />
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-24">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs mb-6">
          <Sparkles size={14} className="text-[#00FFB2]" /> AI Voice + WhatsApp for eCommerce
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Recover Lost Revenue. Instantly. Automatically.
        </h1>
        <p className="mt-5 text-lg text-white/70">
          AI Voice + WhatsApp automation built for eCommerce brands. Confirm COD orders, recover abandoned carts, and stop fake NDRs — without your team lifting a finger.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={handleBookDemo} className="group relative inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold text-black bg-[#00FFB2] shadow-[0_0_30px_#00FFB255]">
            <span className="relative z-10">Book Demo</span>
            <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#00FFB2] to-[#0070F3] opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button onClick={handleScrollToVideo} className="inline-flex items-center gap-2 text-white/80 hover:text-white">
            See It in Action <ArrowRight className="transition-transform group-hover:translate-x-0.5" size={18} />
          </button>
        </div>
        <p className="mt-6 text-sm text-white/50">Trusted by forward-thinking D2C brands across India.</p>
      </div>
    </section>
  )
}

function Problem() {
  const Card = ({ icon: Icon, title, desc }) => (
    <div className="group relative rounded-2xl p-6 bg-white/5 backdrop-blur border border-white/10 hover:border-white/20 transition-all">
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_60px_#00FFB222]" />
      <Icon className="text-[#00FFB2]" />
      <h3 className="mt-4 text-white font-semibold">{title}</h3>
      <p className="mt-2 text-white/70 text-sm">{desc}</p>
    </div>
  )
  return (
    <section id="problem" className="relative py-20 sm:py-28 bg-[#0E0E13]">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff0d 1px, transparent 1px)', backgroundSize: '16px 16px', opacity: 0.2 }} />
      <div className="relative max-w-6xl mx-auto px-6">
        <h2 className="text-center text-3xl sm:text-4xl font-bold text-white">Manual follow-ups don’t scale.</h2>
        <p className="mt-4 text-center text-white/70 max-w-2xl mx-auto">Missed confirmations. Unanswered carts. Fake NDRs. Every lost follow-up quietly eats your profit margin.</p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card icon={PhoneCall} title="COD Failures" desc="12% of orders never confirmed." />
          <Card icon={ShoppingCart} title="Abandoned Checkouts" desc="70% of users drop off before purchase." />
          <Card icon={Truck} title="Fake NDRs" desc="Couriers mark ‘not responding’ even when customers wait." />
        </div>
        <p className="mt-8 text-center text-white/80">Recover Agent automates what your team can’t.</p>
      </div>
    </section>
  )
}

function Solution() {
  const Step = ({ title, desc }) => (
    <div className="relative pl-6">
      <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-[#00FFB2] shadow-[0_0_20px_#00FFB2]" />
      <h4 className="text-white font-semibold">{title}</h4>
      <p className="text-white/70 text-sm mt-1">{desc}</p>
    </div>
  )
  return (
    <section id="solution" className="relative py-24 bg-gradient-to-b from-[#0B0B10] to-[#0A0A0F]">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Meet your AI Recovery Assistant.</h2>
          <p className="mt-3 text-white/70">One platform to confirm, recover, and retain — on autopilot.</p>
          <div className="mt-8 flex flex-col gap-6">
            <Step title="Voice AI Confirmation" desc="Calls customers instantly to confirm COD orders." />
            <Step title="WhatsApp Automation" desc="Recovers abandoned carts and NDRs." />
            <Step title="Smart Dashboard" desc="Tracks ROI and recovery rate in real-time." />
          </div>
        </div>
        <div className="relative">
          <div className="aspect-video rounded-2xl bg-white/5 border border-white/10 backdrop-blur overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00FFB2]/10 to-[#0070F3]/10" />
            <div className="absolute inset-0 grid place-items-center text-white/60">Interactive previews</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Impact() {
  const items = [
    { label: 'RTO Reduction', value: '↓ 40%' },
    { label: 'Abandoned Cart Recovery', value: '↑ 25%' },
    { label: 'Manual Workload', value: '↓ 80%' },
    { label: 'Prepaid Conversions', value: '💰 Higher' },
  ]
  return (
    <section id="impact" className="relative py-24">
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,#11111A_0%,#0A0A0F_60%)]" />
      <div className="relative max-w-6xl mx-auto px-6">
        <h2 className="text-center text-3xl sm:text-4xl font-bold text-white">Results that speak for themselves.</h2>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((it) => (
            <div key={it.label} className="group relative rounded-2xl p-6 text-center bg-white/5 border border-white/10 hover:border-[#00FFB2]/40 transition-all">
              <div className="text-2xl font-bold text-white">{it.value}</div>
              <div className="mt-2 text-white/60 text-sm">{it.label}</div>
              <div className="absolute inset-0 rounded-2xl pointer-events-none shadow-[0_0_40px_#00FFB233] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-white/70">Plug it once. Watch the recovery curve climb.</p>
      </div>
    </section>
  )
}

function Demo() {
  return (
    <section id="demo" className="relative py-24 bg-gradient-to-b from-[#0A0A0F] to-[#0F0F16]">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-center text-3xl sm:text-4xl font-bold text-white">See Recover Agent in Action.</h2>
        <p className="mt-3 text-center text-white/70">Watch how AI calls and WhatsApp flows bring your lost revenue back to life.</p>
        <div className="mt-10 relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black">
          <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-[#00FFB2]/30" />
          <iframe className="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0" title="Product Demo" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
        <div className="mt-6 text-center">
          <a href="#demo" className="inline-flex items-center gap-2 text-[#00FFB2] hover:text-white"><Play size={16} /> Watch Demo</a>
        </div>
      </div>
    </section>
  )
}

function CaseStudies() {
  const Card = ({ logo, title, quote }) => (
    <div className="relative rounded-2xl p-6 bg-white/5 border border-white/10 hover:border-white/20 transition-all">
      <div className="text-white font-semibold">{title}</div>
      <p className="mt-2 text-white/70 text-sm">“{quote}”</p>
      <div className="mt-4 text-white/60 text-xs">— Founder, {logo}</div>
    </div>
  )
  return (
    <section id="cases" className="relative py-24 bg-[#09090D]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center">Proof from real D2C stores.</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card logo="BabyCo.in" title="Reduced RTO from 14% → 7% in 2 weeks." quote="Recover Agent called every COD buyer within minutes. Our returns dropped immediately." />
          <Card logo="UrbanTees" title="Recovered ₹3.4L in lost carts last month." quote="WhatsApp flows nudged fence-sitters to finish checkout without discounts." />
        </div>
        <div className="mt-8 text-center">
          <a href="#top" className="text-white/80 hover:text-white">View More Stories →</a>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const plans = [
    { name: 'Starter', price: '₹2,999/mo', features: ['500 calls', '1 WhatsApp flow', 'Dashboard access'] },
    { name: 'Growth', price: '₹6,999/mo', features: ['2,000 calls', 'Multi-store', 'NDR automation'] },
    { name: 'Enterprise', price: 'Custom', features: ['API access', 'White-label', 'Dedicated support'] },
  ]
  const handleTrial = (plan) => {
    if (window.gtag) window.gtag('event', 'start_trial_click', { plan })
    if (window.fbq) window.fbq('track', 'Lead', { plan })
    const modal = document.getElementById('calendly-modal')
    if (modal) modal.dispatchEvent(new CustomEvent('open-calendly'))
  }
  return (
    <section id="pricing" className="relative py-24 bg-gradient-to-b from-[#0F0F16] to-[#0B0B10]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center">Plans that grow with you.</h2>
        <p className="mt-3 text-center text-white/70">Start small. Scale fast. Pay only for what you use.</p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div key={p.name} className="group relative rounded-2xl p-6 bg-white/5 border border-white/10 hover:border-[#00FFB2]/40 transition-all">
              <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_60px_#00FFB233]" />
              <div className="text-white font-semibold">{p.name}</div>
              <div className="mt-2 text-2xl text-white">{p.price}</div>
              <ul className="mt-4 space-y-2 text-white/70 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2"><Check size={16} className="text-[#00FFB2]" /> {f}</li>
                ))}
              </ul>
              <button onClick={() => handleTrial(p.name)} className="mt-6 w-full rounded-md bg-[#00FFB2] text-black font-semibold px-4 py-2">Start Free Trial</button>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-white/60">No setup fee. Cancel anytime.</p>
      </div>
    </section>
  )
}

function BannerCTA() {
  const openDemo = () => {
    const modal = document.getElementById('calendly-modal')
    if (modal) modal.dispatchEvent(new CustomEvent('open-calendly'))
  }
  return (
    <section className="relative py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-[#0070F3] to-[#00FFB2]">
          <div className="absolute inset-0 pointer-events-none opacity-50" style={{ backgroundImage: 'linear-gradient(120deg, #fff6 0 10%, transparent 10% 20%, #fff6 20% 30%, transparent 30% 40%, #fff6 40% 50%, transparent 50% 100%)', backgroundSize: '200% 100%', animation: 'shimmer 8s linear infinite' }} />
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-black font-semibold text-lg">Stop losing money to missed confirmations. Let AI handle it.</p>
            <button onClick={openDemo} className="inline-flex items-center gap-2 rounded-md bg-black text-white px-4 py-2 font-semibold">
              Book a Demo <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const items = [
    { q: 'Does it work with Indian couriers?', a: 'Yes — integrates with Delhivery, Bluedart, and Shiprocket.' },
    { q: 'Do I need a WhatsApp Business API?', a: 'No. Recover Agent includes official connectivity.' },
    { q: 'Can it speak in Hindi or Tamil?', a: 'Absolutely. Multi-language AI voices supported.' },
    { q: 'Will it integrate with Shopify?', a: '100%. One-click connection.' },
  ]
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="relative py-24 bg-[#0E0E13]">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center">Questions, answered.</h2>
        <div className="mt-10 divide-y divide-white/10 rounded-2xl border border-white/10 overflow-hidden">
          {items.map((it, i) => (
            <div key={it.q} className="bg-white/5">
              <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between px-4 sm:px-6 py-5 text-left">
                <span className="text-white font-medium">{it.q}</span>
                <ChevronDown className={`text-white/70 transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && (
                <div className="px-6 pb-6 text-white/70">{it.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  const openDemo = () => {
    const modal = document.getElementById('calendly-modal')
    if (modal) modal.dispatchEvent(new CustomEvent('open-calendly'))
  }
  return (
    <section className="relative py-24 bg-black">
      <GlowOrbs />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Ready to recover what’s yours?</h2>
        <p className="mt-4 text-white/70">Start automating COD confirmations, reduce RTO, and recover lost revenue — today.</p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={openDemo} className="rounded-lg bg-[#00FFB2] text-black font-semibold px-6 py-3">Start Free Trial</button>
          <button onClick={openDemo} className="text-white/80 hover:text-white">Book a 15-Minute Demo →</button>
        </div>
        <p className="mt-6 text-white/60 text-sm">Built for eCommerce founders who are done leaving money on the table.</p>
      </div>
    </section>
  )
}

function WhatsAppButton() {
  const click = () => {
    const url = 'https://wa.me/919999999999?text=Hi%20Recover%20Agent%2C%20I%27d%20like%20a%20demo.'
    window.open(url, '_blank')
  }
  return (
    <button onClick={click} className="fixed z-50 bottom-5 right-5 rounded-full bg-[#25D366] text-white w-14 h-14 shadow-lg flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="w-7 h-7"><path d="M19.11 17.34c-.3-.17-1.75-.96-2.02-1.07-.27-.1-.47-.17-.67.17-.2.33-.77 1.07-.95 1.3-.17.23-.35.26-.65.09-.3-.17-1.26-.46-2.4-1.46-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.47.15-.64.16-.16.36-.42.53-.64.17-.23.23-.36.35-.6.12-.23.06-.43-.03-.6-.09-.17-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5-.17 0-.36-.02-.55-.02-.2 0-.52.08-.79.38-.27.3-1.03 1-1.03 2.45 0 1.44 1.06 2.83 1.21 3.02.15.2 2.09 3.2 5.06 4.48.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.19-.57-.36z"/><path d="M16.02 3.2C9.27 3.2 3.8 8.66 3.8 15.4c0 2.72.99 5.22 2.63 7.16L5.2 28.8l6.4-1.68a12.16 12.16 0 0 0 4.41.81c6.75 0 12.22-5.47 12.22-12.22 0-6.75-5.47-12.22-12.22-12.22zm0 22.15c-1.75 0-3.38-.44-4.82-1.22l-.34-.19-3.8.99 1.02-3.7-.2-.35a10.07 10.07 0 1 1 8.13 4.47z"/></svg>
    </button>
  )
}

export default function App() {
  useEffect(() => {
    // Smooth scroll for older browsers if needed
    if ('scrollBehavior' in document.documentElement.style === false) {
      const hash = window.location.hash
      if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <Impact />
      <Demo />
      <CaseStudies />
      <Pricing />
      <BannerCTA />
      <FAQ />
      <FinalCTA />
      <WhatsAppButton />
      <CalendlyModal />
      <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
    </div>
  )
}
