import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Menu, X, MapPin, Phone, Mail } from 'lucide-react'
import Social from './Social'
import { Motion } from './Motion'
import { contact } from '../data/site'

export function Logo({ light = false }) {
  return (
    <Link to="/" className={`logo ${light ? 'logo--light' : ''}`} aria-label="RentCarsNG home">
      <span className="logo__mark">
        <svg viewBox="0 0 64 28" aria-hidden="true">
          <path d="M4 20c0-3 2-5 5-5.6L20 12l8-6c2-1.4 4-2 6-2h10c2.5 0 4.6 1 6.2 2.8L56 12c3 .6 5 2.6 5 5.4V20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <circle cx="16" cy="21" r="4.5" fill="var(--orange)" />
          <circle cx="48" cy="21" r="4.5" fill="var(--orange)" />
        </svg>
      </span>
      <span className="logo__text">
        <span>RENT<b>CARS</b>NG</span>
        <small>Drive Nigeria in style</small>
      </span>
    </Link>
  )
}

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/how-it-works', label: 'How It Work' },
  { to: '/rental-deals', label: 'Rental Deal' },
  { to: '/why-choose-us', label: 'Why Choose Us' },
  { to: '/contact', label: 'Contact Us' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="container nav__inner">
        <Logo />
        <nav className="nav__links" aria-label="Main">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="nav__actions">
          <Link to="/sign-in" className="nav__signin">Sign In</Link>
          <Link to="/sign-up" className="btn btn--sm">Sign Up</Link>
        </div>
        <button className="nav__toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <Logo />
          <p className="footer__about">
            RentCarsNG is Nigeria’s premium car rental service. From everyday SUVs to exotic supercars, we make renting
            fast, safe and easy — self-drive or chauffeur-driven.
          </p>
        </div>
        <div>
          <h4>Contact Info</h4>
          <ul className="footer__contact">
            <li><MapPin size={18} /> {contact.address}</li>
            <li><Phone size={18} /> <span>{contact.phone}<br />{contact.phone2}</span></li>
            <li><Mail size={18} /> {contact.email}</li>
          </ul>
        </div>
        <div>
          <h4>Information Links</h4>
          <ul className="footer__links">
            <li><Link to="/rental-deals">Book Now</Link></li>
            <li><Link to="/contact#branches">Our Locations</Link></li>
            <li><Link to="/why-choose-us#faq">Terms &amp; Conditions</Link></li>
            <li><Link to="/why-choose-us#faq">Cancellation</Link></li>
            <li><Link to="/why-choose-us#faq">Privacy Policy</Link></li>
          </ul>
        </div>
        <div>
          <h4>Subscribe To Our Newsletter</h4>
          <Newsletter />
          <div className="footer__social">
            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noreferrer"><Social name="facebook" /></a>
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer"><Social name="instagram" /></a>
            <a href="https://x.com" aria-label="X / Twitter" target="_blank" rel="noreferrer"><Social name="x" /></a>
            <a href="https://tiktok.com" aria-label="TikTok" target="_blank" rel="noreferrer"><Social name="tiktok" /></a>
          </div>
        </div>
      </div>
      <p className="footer__copy">Copyright © {new Date().getFullYear()} RentCarsNG. All rights reserved.</p>
    </footer>
  )
}

function Newsletter() {
  const [done, setDone] = useState(false)
  if (done) return <p className="form-success">Thanks! You’re subscribed.</p>
  return (
    <form className="newsletter" onSubmit={(e) => { e.preventDefault(); setDone(true) }}>
      <input type="email" required placeholder="Email Address" aria-label="Email address" />
      <button className="btn btn--sm" type="submit">Submit</button>
    </form>
  )
}

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50)
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function Layout() {
  return (
    <>
      <ScrollManager />
      <Motion />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
