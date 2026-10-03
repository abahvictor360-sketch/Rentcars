import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Elements that animate in as they scroll into view, and the reveal style for each.
const REVEAL = [
  ['.heading', 'up'],
  ['.step', 'up'],
  ['.chips', 'up'],
  ['.car-card', 'up'],
  ['.services__car', 'left'],
  ['.services__list li', 'right'],
  ['.branch-search, .city', 'up'],
  ['.map', 'zoom'],
  ['.review', 'up'],
  ['.offroad__title', 'zoom'],
  ['.post', 'up'],
  ['.reason', 'up'],
  ['.split__img', 'left'],
  ['.split > div:not(.split__img)', 'right'],
  ['.faq__item', 'up'],
  ['.stats', 'zoom'],
  ['.contact__info', 'left'],
  ['.contact > .booking', 'right'],
  ['.detail__media', 'zoom'],
  ['.detail__grid > .booking', 'right'],
  ['.search-wrap', 'up'],
  ['.footer__grid > div', 'up'],
  ['.filters, .results', 'up'],
]

function useReveal(pathname) {
  useEffect(() => {
    const root = document.querySelector('main')?.parentElement
    if (!root) return
    if (reduced() || !('IntersectionObserver' in window)) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target
            el.classList.add('is-visible')
            io.unobserve(el)
            // hand control back to the element's own hover transitions once revealed
            const wait = 900 + (parseInt(el.style.getPropertyValue('--delay')) || 0)
            setTimeout(() => { el.removeAttribute('data-reveal'); el.style.removeProperty('--delay') }, wait)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    const scan = () => {
      REVEAL.forEach(([sel, kind]) => {
        root.querySelectorAll(sel).forEach((el) => {
          if (el.dataset.reveal || el.classList.contains('is-visible')) return
          el.dataset.reveal = kind
          // stagger siblings of the same kind
          const sibs = [...el.parentElement.children].filter((c) => c.matches(sel))
          el.style.setProperty('--delay', `${Math.min(sibs.indexOf(el), 5) * 90}ms`)
          io.observe(el)
        })
      })
      // off-road lineup "drives in" as a group
      root.querySelectorAll('.offroad__lineup:not([data-seen])').forEach((el) => {
        el.dataset.seen = '1'
        io.observe(el)
      })
    }

    scan()
    // pick up elements rendered later (tab switches, filters, form success states)
    const mo = new MutationObserver(scan)
    mo.observe(root, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [pathname])
}

function useParallax(pathname) {
  useEffect(() => {
    if (reduced()) return
    let raf = 0
    const items = () => document.querySelectorAll('[data-parallax]')
    const update = () => {
      raf = 0
      const vh = window.innerHeight
      items().forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.bottom < -200 || r.top > vh + 200) return
        const speed = parseFloat(el.dataset.parallax) || 0.15
        const offset = (r.top + r.height / 2 - vh / 2) * speed
        el.style.setProperty('--py', `${(-offset).toFixed(1)}px`)
      })
      const h = document.documentElement
      const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)
      h.style.setProperty('--scroll', p.toFixed(4))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [pathname])
}

export function Motion() {
  const { pathname } = useLocation()
  const [top, setTop] = useState(false)
  useReveal(pathname)
  useParallax(pathname)

  useEffect(() => {
    const onScroll = () => setTop(window.scrollY > 700)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <button
        className={`to-top ${top ? 'to-top--show' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>
    </>
  )
}

/** Counts up from 0 to the number inside `value` (e.g. "12k+") when scrolled into view. */
export function CountUp({ value, duration = 1400 }) {
  const ref = useRef(null)
  const match = String(value).match(/^(\D*)(\d+)(.*)$/)
  const [n, setN] = useState(match && !reduced() ? 0 : null)

  useEffect(() => {
    if (!match || reduced()) return
    const target = +match[2]
    const el = ref.current
    let raf
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (t) => {
        const k = Math.min(1, (t - start) / duration)
        setN(Math.round(target * (1 - Math.pow(1 - k, 3))))
        if (k < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [value])

  return <b ref={ref}>{n === null ? value : `${match[1]}${n}${match[3]}`}</b>
}
