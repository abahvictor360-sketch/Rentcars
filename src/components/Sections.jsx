import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  MapPin, CalendarDays, CarFront, Headset, BadgePercent, Search, Star, Quote, Users, Settings2, Gauge, ArrowRight,
} from 'lucide-react'
import { cars, naira, brands } from '../data/cars'
import { CountUp } from './Motion'
import { branches, testimonials, posts, steps, services, partnerBrands } from '../data/site'

export function SectionHeading({ title, text, light = false }) {
  return (
    <div className={`heading ${light ? 'heading--light' : ''}`}>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  )
}

/* ---------- Search / quick booking ---------- */
const today = () => new Date().toISOString().slice(0, 16)
const plusDays = (d) => new Date(Date.now() + d * 864e5).toISOString().slice(0, 16)

export function SearchForm({ compact = false }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ type: '', location: '', from: today(), to: plusDays(2) })
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    const q = new URLSearchParams()
    if (form.type) q.set('category', form.type)
    if (form.location) q.set('location', form.location)
    q.set('from', form.from)
    q.set('to', form.to)
    navigate(`/rental-deals?${q}`)
  }
  return (
    <form className={`search ${compact ? 'search--compact' : ''}`} onSubmit={submit}>
      <label>
        <span>Select Your Car Type</span>
        <select value={form.type} onChange={set('type')}>
          <option value="">All Types</option>
          <option>SUV</option>
          <option>Luxury</option>
          <option>Off-Road</option>
          <option>Sports</option>
        </select>
      </label>
      <label>
        <span>Where to Pick-Up</span>
        <select value={form.location} onChange={set('location')}>
          <option value="">Any city</option>
          {branches.map((b) => <option key={b.city}>{b.city}</option>)}
        </select>
      </label>
      <label>
        <span>Date of Pick-Up/Time</span>
        <input type="datetime-local" value={form.from} min={today()} onChange={set('from')} required />
      </label>
      <label>
        <span>Date of Drop-Off/Time</span>
        <input type="datetime-local" value={form.to} min={form.from} onChange={set('to')} required />
      </label>
      <button className="btn search__btn" type="submit"><Search size={16} /> Search</button>
    </form>
  )
}

/* ---------- How it works ---------- */
const stepIcons = [MapPin, CalendarDays, CarFront]
export function HowItWorks({ heading = true }) {
  return (
    <section className="section" id="how-it-works">
      <div className="container">
        {heading && (
          <SectionHeading title="How it Work" text="Renting a car with RentCarsNG takes just three simple steps. No paperwork stress, no hidden charges." />
        )}
        <div className="steps">
          {steps.map((s, i) => {
            const Icon = stepIcons[i]
            return (
              <div key={s.title} className={`step ${i === 1 ? 'step--active' : ''}`}>
                <div className="step__icon"><Icon /></div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------- Car card ---------- */
export function CarCard({ car }) {
  return (
    <article className="car-card">
      <span className={`tag tag--${car.fuel.toLowerCase()}`}>{car.fuel}</span>
      <Link to={`/cars/${car.id}`} className="car-card__img">
        <img src={car.cutout} alt={car.name} loading="lazy" />
      </Link>
      <h3>{car.name}</h3>
      <ul className="specs">
        <li><Users size={15} /> {car.seats} Seater</li>
        <li><Settings2 size={15} /> {car.transmission}</li>
        <li><Gauge size={15} /> {car.mileage}</li>
      </ul>
      <p className="car-card__price">Starting at <b>{naira(car.price)}</b>/Day</p>
      <div className="car-card__actions">
        <Link to={`/cars/${car.id}`} className="btn btn--sm">Details</Link>
        <Link to={`/cars/${car.id}#book`} className="btn btn--sm btn--soft">Book Now</Link>
      </div>
    </article>
  )
}

export function TopRated() {
  const tabs = ['Mercedes', 'Cadillac', 'Lexus', 'Toyota', 'Ford', 'Chevrolet']
  const [tab, setTab] = useState(tabs[0])
  const list = cars.filter((c) => c.brand === tab).slice(0, 3)
  return (
    <section className="section" id="top-rated">
      <div className="container">
        <SectionHeading title={<>Top Rated<br />Rented Cars</>} text="Our most-booked rides this month, loved by customers across Nigeria for comfort, style and reliability." />
        <div className="chips" role="tablist">
          {tabs.map((t) => (
            <button key={t} role="tab" aria-selected={tab === t} className={`chip ${tab === t ? 'chip--active' : ''}`} onClick={() => setTab(t)}>
              <CarFront size={14} /> {t}
            </button>
          ))}
        </div>
        <div className="grid-3">
          {list.map((c) => <CarCard key={c.id} car={c} />)}
        </div>
        <div className="center mt">
          <Link to="/rental-deals" className="btn btn--outline">View All Cars <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  )
}

/* ---------- Services ---------- */
const serviceIcons = [Headset, MapPin, BadgePercent]
export function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <SectionHeading title={<>Best Services and<br />Luxuries Cars</>} text="We go beyond the car. Every rental comes with premium support, flexible locations and peace of mind." />
        <div className="services">
          <img className="services__car" data-parallax="0.06" src="/cars/cutout/chevy-blazer.webp" alt="Chevrolet Blazer" loading="lazy" />
          <ul className="services__list">
            {services.map((s, i) => {
              const Icon = serviceIcons[i]
              return (
                <li key={s.title}>
                  <span className="icon-box"><Icon /></span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ---------- Branches ---------- */
export function Branches() {
  const [city, setCity] = useState(branches[0].city)
  const [query, setQuery] = useState('')
  const branch = branches.find((b) => b.city === city)
  const search = (e) => {
    e.preventDefault()
    const q = query.trim().toLowerCase()
    const hit = branches.find((b) => b.city.toLowerCase().includes(q) || b.locations.some((l) => l.toLowerCase().includes(q)))
    if (hit) setCity(hit.city)
  }
  return (
    <section className="section" id="branches">
      <div className="container">
        <SectionHeading title={<>Find RentCarsNG Branches<br />Across Nigeria</>} text="Pick up from any of our branches or airport desks — or let us deliver straight to your door." />
        <form className="branch-search" onSubmit={search}>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search a city or area, e.g. Lekki" aria-label="Search branch" />
          <button className="btn btn--sm" type="submit">Search</button>
        </form>
        <div className="cities">
          {branches.map((b) => (
            <button key={b.city} className={`city ${city === b.city ? 'city--active' : ''}`} onClick={() => setCity(b.city)}>
              <span><MapPin /></span>
              {b.city}
            </button>
          ))}
        </div>
        <div className="map">
          <iframe
            key={branch.city}
            title={`Map of ${branch.city} branch`}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(branch.address)}&z=12&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="map__card">
            <h3>RentCarsNG {branch.city}</h3>
            <p><MapPin size={14} /> {branch.address}</p>
            <p className="muted">Pick-up points: {branch.locations.join(' • ')}</p>
            <a className="btn btn--sm" href={`tel:${branch.phone.replace(/\s/g, '')}`}>Call {branch.phone}</a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Testimonials ---------- */
export function Stars({ n = 5 }) {
  return (
    <span className="stars" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => <Star key={i} size={13} fill={i < n ? 'currentColor' : 'none'} />)}
      <b>{n.toFixed(1)}</b>
    </span>
  )
}

export function Testimonials({ count = 3 }) {
  return (
    <section className="section" id="testimonials">
      <div className="container">
        <SectionHeading title={<>What People Say<br />About Us?</>} text="Thousands of happy drivers across Nigeria trust RentCarsNG for business, weddings, holidays and everything in between." />
        <div className="grid-3">
          {testimonials.slice(0, count).map((t) => (
            <figure key={t.name} className="review">
              <header>
                <span className="avatar">{t.name.split(' ').map((w) => w[0]).join('')}</span>
                <div>
                  <h3>{t.name}</h3>
                  <Stars n={t.rating} />
                </div>
                <Quote className="review__quote" />
              </header>
              <blockquote>{t.text}</blockquote>
              <figcaption>{t.role}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Off-road ---------- */
export function OffRoad() {
  const lineup = ['lexus-gx-white', 'ford-f150', 'g63-black', 'gwagon-pink', 'lexus-gx-tan']
  return (
    <section className="section offroad" id="off-road">
      <div className="container">
        <SectionHeading title={<>We Rent a Powerful<br />Machines too</>} text="Built for Nigerian roads and beyond. Our 4x4 and off-road fleet is ready for interstate trips, farm visits and adventure." />
        <h2 className="offroad__title">OFF ROAD CARS</h2>
        <div className="offroad__lineup">
          {lineup.map((slug, i) => (
            <img key={slug} src={`/cars/cutout/${slug}.webp`} alt="" loading="lazy" className={`lineup lineup--${i}`} />
          ))}
        </div>
        <div className="center">
          <Link to="/rental-deals?category=Off-Road" className="btn">Explore Off-Road Fleet <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  )
}

/* ---------- Blog ---------- */
export function Blog() {
  return (
    <section className="section" id="blog">
      <div className="container">
        <SectionHeading title={<>Know More to<br />Choose</>} text="Reviews, road-trip stories and tips to help you pick the perfect car for every occasion." />
        <div className="grid-3">
          {posts.map((p) => (
            <article key={p.slug} className="post">
              <div className="post__img"><img src={p.image} alt="" loading="lazy" /></div>
              <p className="post__date"><CalendarDays size={14} /> {p.date}</p>
              <h3>{p.title}</h3>
              <p className="muted">{p.excerpt}</p>
              <Link to="/rental-deals" className="post__more">Read More</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Brand strip ---------- */
export function BrandStrip() {
  return (
    <div className="brand-strip">
      <div className="brand-strip__track">
        {[...partnerBrands, ...partnerBrands].map((b, i) => <span key={i}>{b}</span>)}
      </div>
    </div>
  )
}

/* ---------- Inner page banner ---------- */
export function PageBanner({ title, text, image = '/cars/cutout/escalade-2025.webp' }) {
  return (
    <section className="banner">
      <div className="container banner__inner">
        <div>
          <h1>{title}</h1>
          {text && <p>{text}</p>}
        </div>
        <img src={image} alt="" data-parallax="0.2" />
      </div>
    </section>
  )
}

/* ---------- Stats ---------- */
export function Stats() {
  const data = useMemo(() => [
    { n: '12k+', l: 'Happy Customers' },
    { n: `${cars.length}+`, l: 'Premium Cars' },
    { n: `${branches.length}`, l: 'Cities' },
    { n: `${brands.length}`, l: 'Top Brands' },
  ], [])
  return (
    <div className="stats">
      {data.map((s) => (
        <div key={s.l}><CountUp value={s.n} /><span>{s.l}</span></div>
      ))}
    </div>
  )
}

