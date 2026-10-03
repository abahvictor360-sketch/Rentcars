import { Link } from 'react-router-dom'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { HowItWorks, PageBanner, SearchForm, SectionHeading, BrandStrip } from '../components/Sections'

const details = [
  {
    title: '1. Choose your location',
    img: '/cars/raw/escalade-2025.webp',
    points: ['Five cities: Lagos, Abuja, Port Harcourt, Ibadan & Enugu', 'Airport desks at LOS, ABV, PHC and ENU', 'Doorstep delivery to your home, hotel or office'],
  },
  {
    title: '2. Pick your dates',
    img: '/cars/raw/lexus-gx-tan.webp',
    points: ['Hourly, daily, weekly and monthly rentals', 'Flexible pick-up and drop-off times, 7 days a week', 'Free cancellation up to 24 hours before pick-up'],
  },
  {
    title: '3. Book & drive',
    img: '/cars/raw/fortuner-white.webp',
    points: ['Verified, insured and freshly cleaned cars', 'Pay securely by card or bank transfer', 'Self-drive or add a professional chauffeur'],
  },
]

export default function HowItWorksPage() {
  return (
    <>
      <PageBanner title="How It Works" text="From search to keys in hand — renting with RentCarsNG is simple, transparent and fast." image="/cars/cutout/lexus-gx-white.webp" />
      <HowItWorks />
      <section className="section">
        <div className="container">
          {details.map((d, i) => (
            <div key={d.title} className={`split ${i % 2 ? 'split--rev' : ''}`}>
              <div className="split__img"><img src={d.img} alt="" loading="lazy" /></div>
              <div>
                <h2 className="h2-left">{d.title}</h2>
                <ul className="checklist">
                  {d.points.map((p) => <li key={p}><CheckCircle2 /> {p}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading title="Ready to get started?" text="Find available cars for your dates right now." />
          <div className="search-wrap"><SearchForm /></div>
          <div className="center mt"><Link to="/rental-deals" className="btn btn--outline">Browse all cars <ArrowRight size={16} /></Link></div>
        </div>
      </section>
      <BrandStrip />
    </>
  )
}
