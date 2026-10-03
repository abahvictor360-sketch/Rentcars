import { useState } from 'react'
import { ShieldCheck, Wallet, Clock, Award, UserRound, Route, ChevronDown } from 'lucide-react'
import { PageBanner, SectionHeading, Services, Testimonials, OffRoad, Stats } from '../components/Sections'
import { faqs } from '../data/site'

const reasons = [
  { icon: ShieldCheck, title: 'Fully Insured Cars', text: 'Every vehicle is comprehensively insured, tracked and inspected before each rental.' },
  { icon: Wallet, title: 'Transparent Pricing', text: 'The price you see is the price you pay. No hidden fees, no surprises at drop-off.' },
  { icon: Clock, title: '24/7 Roadside Help', text: 'Breakdown or flat tyre? Our roadside team is one call away, any time of day.' },
  { icon: Award, title: 'Premium Fleet', text: 'Late-model cars from Mercedes, Lexus, Cadillac, Toyota, BMW and more.' },
  { icon: UserRound, title: 'Trained Chauffeurs', text: 'Vetted, uniformed drivers who know every city route and value your privacy.' },
  { icon: Route, title: 'Interstate Ready', text: 'Take our SUVs and 4x4s across states for business trips and family holidays.' },
]

function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="section" id="faq">
      <div className="container narrow">
        <SectionHeading title="Frequently Asked Questions" text="Terms, cancellations and everything else you need to know." />
        <div className="faq">
          {faqs.map((f, i) => (
            <div key={f.q} className={`faq__item ${open === i ? 'open' : ''}`}>
              <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                {f.q} <ChevronDown />
              </button>
              {open === i && <p>{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function WhyChooseUs() {
  return (
    <>
      <PageBanner title="Why Choose Us" text="Nigeria’s most trusted premium car rental — built around safety, comfort and honest pricing." image="/cars/cutout/mercedes-gle-pink.webp" />
      <section className="section">
        <div className="container">
          <Stats />
          <SectionHeading title="The RentCarsNG Difference" text="Six reasons thousands of customers keep coming back." />
          <div className="reasons">
            {reasons.map(({ icon: Icon, title, text }) => (
              <div key={title} className="reason">
                <span className="icon-box icon-box--orange"><Icon /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Services />
      <OffRoad />
      <Testimonials />
      <Faq />
    </>
  )
}
