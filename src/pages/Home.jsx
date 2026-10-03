import { HowItWorks, TopRated, Services, Branches, Testimonials, OffRoad, Blog, BrandStrip, SearchForm } from '../components/Sections'

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__bgtext" aria-hidden="true">RCN</div>
        <div className="hero__panel" aria-hidden="true" />
        <div className="container hero__inner">
          <div className="hero__copy">
            <h1>Fast And Easy Way<br />To Rent A Car</h1>
            <p>
              Luxury SUVs, rugged 4x4s and head-turning supercars across Lagos, Abuja, Port Harcourt and beyond.
              Self-drive or chauffeur-driven — book in minutes.
            </p>
            <SearchForm />
          </div>
          <img className="hero__car" src="/cars/cutout/g63-black.webp" alt="Black Mercedes-AMG G63" fetchpriority="high" />
        </div>
      </section>
      <HowItWorks />
      <TopRated />
      <Services />
      <Branches />
      <Testimonials />
      <OffRoad />
      <Blog />
      <BrandStrip />
    </>
  )
}
