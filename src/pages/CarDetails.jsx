import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Users, Settings2, Gauge, Fuel, CalendarDays, CheckCircle2, ArrowLeft, ShieldCheck } from 'lucide-react'
import { getCar, cars, naira } from '../data/cars'
import { branches } from '../data/site'
import { CarCard, Stars, SectionHeading } from '../components/Sections'
import NotFound from './NotFound'

const CHAUFFEUR = 30000
const local = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 16)

function BookingForm({ car }) {
  const chauffeurOnly = car.price >= 1000000
  const [f, setF] = useState({
    name: '', phone: '', email: '',
    location: branches[0].city,
    from: local(new Date(Date.now() + 864e5)),
    to: local(new Date(Date.now() + 3 * 864e5)),
    chauffeur: chauffeurOnly,
  })
  const [ref, setRef] = useState(null)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })

  const days = Math.max(1, Math.ceil((new Date(f.to) - new Date(f.from)) / 864e5) || 1)
  const total = days * (car.price + (f.chauffeur ? CHAUFFEUR : 0))
  const invalid = new Date(f.to) <= new Date(f.from)

  if (ref) {
    return (
      <div className="booking booking--done">
        <CheckCircle2 size={48} />
        <h3>Booking request received!</h3>
        <p>Reference <b>{ref}</b>. Our team will call <b>{f.phone}</b> shortly to confirm your <b>{car.name}</b> for {days} day{days > 1 && 's'} in {f.location}.</p>
        <p className="booking__total">Estimated total: <b>{naira(total)}</b></p>
        <button className="btn btn--outline" onClick={() => setRef(null)}>Make another booking</button>
      </div>
    )
  }

  return (
    <form className="booking" id="book" onSubmit={(e) => { e.preventDefault(); if (!invalid) setRef('RCN-' + Math.random().toString(36).slice(2, 8).toUpperCase()) }}>
      <h3>Book this car</h3>
      <div className="form-grid">
        <label><span>Full name</span><input required value={f.name} onChange={set('name')} placeholder="Adaeze Okonkwo" /></label>
        <label><span>Phone</span><input required type="tel" value={f.phone} onChange={set('phone')} placeholder="+234 ..." /></label>
        <label className="span-2"><span>Email</span><input required type="email" value={f.email} onChange={set('email')} placeholder="you@email.com" /></label>
        <label className="span-2"><span>Pick-up city</span>
          <select value={f.location} onChange={set('location')}>{branches.map((b) => <option key={b.city}>{b.city}</option>)}</select>
        </label>
        <label><span>Pick-up</span><input type="datetime-local" required value={f.from} onChange={set('from')} /></label>
        <label><span>Drop-off</span><input type="datetime-local" required value={f.to} onChange={set('to')} /></label>
      </div>
      <label className="check">
        <input type="checkbox" checked={f.chauffeur} disabled={chauffeurOnly} onChange={set('chauffeur')} />
        Add professional chauffeur (+{naira(CHAUFFEUR)}/day){chauffeurOnly && ' — required for this car'}
      </label>
      {invalid && <p className="form-error">Drop-off must be after pick-up.</p>}
      <div className="booking__summary">
        <span>{days} day{days > 1 && 's'} × {naira(car.price + (f.chauffeur ? CHAUFFEUR : 0))}</span>
        <b>{naira(total)}</b>
      </div>
      <button className="btn btn--block" type="submit" disabled={invalid}>Request Booking</button>
      <p className="muted small"><ShieldCheck size={14} /> Free cancellation up to 24 hours before pick-up.</p>
    </form>
  )
}

export default function CarDetails() {
  const { id } = useParams()
  const car = getCar(id)
  const [view, setView] = useState('cutout')
  if (!car) return <NotFound />
  const related = cars.filter((c) => c.category === car.category && c.id !== car.id).slice(0, 3)

  return (
    <>
      <section className="detail">
        <div className="container">
          <Link to="/rental-deals" className="back"><ArrowLeft size={16} /> Back to all cars</Link>
          <div className="detail__grid">
            <div>
              <div className={`detail__media detail__media--${view}`}>
                <img src={car[view]} alt={car.name} />
              </div>
              <div className="detail__thumbs">
                {['cutout', 'photo'].map((v) => (
                  <button key={v} className={view === v ? 'active' : ''} onClick={() => setView(v)} aria-label={`Show ${v}`}>
                    <img src={car[v]} alt="" />
                  </button>
                ))}
              </div>
              <span className="tag">{car.category}</span>
              <h1>{car.name}</h1>
              <Stars n={car.rating} />
              <p className="detail__desc">{car.description}</p>
              <ul className="detail__specs">
                <li><Users /> <span>Seats</span><b>{car.seats}</b></li>
                <li><Settings2 /> <span>Gearbox</span><b>{car.transmission}</b></li>
                <li><Fuel /> <span>Fuel</span><b>{car.fuel}</b></li>
                <li><Gauge /> <span>Economy</span><b>{car.mileage}</b></li>
                <li><CalendarDays /> <span>Year</span><b>{car.year}</b></li>
              </ul>
              <p className="detail__price">{naira(car.price)}<small>/day</small></p>
            </div>
            <BookingForm car={car} />
          </div>
        </div>
      </section>
      <div className="book-bar">
        <div><b>{naira(car.price)}</b><span>/day</span></div>
        <button className="btn btn--sm" onClick={() => document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Book Now</button>
      </div>
      {related.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionHeading title="You May Also Like" />
            <div className="grid-3 rail">{related.map((c) => <CarCard key={c.id} car={c} />)}</div>
          </div>
        </section>
      )}
    </>
  )
}
