import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { Logo } from '../components/Layout'

export default function Auth({ mode }) {
  const signup = mode === 'signup'
  const [done, setDone] = useState(false)
  return (
    <section className="auth">
      <div className="auth__art">
        <img src="/cars/cutout/corvette-c8.webp" alt="" />
        <h2>{signup ? 'Join RentCarsNG' : 'Welcome back'}</h2>
        <p>{signup ? 'Create an account to book faster, track rentals and get member-only deals.' : 'Sign in to manage your bookings and saved cars.'}</p>
      </div>
      <div className="auth__form">
        <Logo />
        {done ? (
          <div className="booking--done">
            <CheckCircle2 size={48} />
            <h3>{signup ? 'Account created!' : 'Signed in!'}</h3>
            <p className="muted">Online accounts are launching soon — we’ve saved your details. Meanwhile you can book any car directly.</p>
            <Link to="/rental-deals" className="btn">Browse Cars</Link>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setDone(true) }}>
            <h1>{signup ? 'Sign Up' : 'Sign In'}</h1>
            {signup && <label><span>Full name</span><input required placeholder="Your name" /></label>}
            <label><span>Email</span><input type="email" required placeholder="you@email.com" /></label>
            {signup && <label><span>Phone</span><input type="tel" required placeholder="+234 ..." /></label>}
            <label><span>Password</span><input type="password" required minLength={6} placeholder="••••••••" /></label>
            <button className="btn btn--block" type="submit">{signup ? 'Create Account' : 'Sign In'}</button>
            <p className="muted small center">
              {signup ? <>Already have an account? <Link to="/sign-in">Sign in</Link></> : <>New here? <Link to="/sign-up">Create an account</Link></>}
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
