import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { cars, brands, categories } from '../data/cars'
import { CarCard, PageBanner } from '../components/Sections'

const sorts = {
  popular: (a, b) => b.rating - a.rating,
  low: (a, b) => a.price - b.price,
  high: (a, b) => b.price - a.price,
}

export default function RentalDeals() {
  const [params, setParams] = useSearchParams()
  const category = params.get('category') || ''
  const brand = params.get('brand') || ''
  const sort = params.get('sort') || 'popular'
  const location = params.get('location')

  const update = (k, v) => {
    const next = new URLSearchParams(params)
    v ? next.set(k, v) : next.delete(k)
    setParams(next, { replace: true })
  }

  const list = useMemo(
    () => cars.filter((c) => (!category || c.category === category) && (!brand || c.brand === brand)).sort(sorts[sort]),
    [category, brand, sort],
  )

  return (
    <>
      <PageBanner title="Rental Deals" text="Choose from our premium fleet of SUVs, luxury, off-road and sports cars. Best daily rates in Nigeria." image="/cars/cutout/bmw-m4.webp" />
      <section className="section">
        <div className="container">
          <div className="filters">
            <div className="chips chips--left">
              <button className={`chip ${!category ? 'chip--active' : ''}`} onClick={() => update('category', '')}>All</button>
              {categories.map((c) => (
                <button key={c} className={`chip ${category === c ? 'chip--active' : ''}`} onClick={() => update('category', c)}>{c}</button>
              ))}
            </div>
            <div className="filters__selects">
              <select value={brand} onChange={(e) => update('brand', e.target.value)} aria-label="Filter by brand">
                <option value="">All brands</option>
                {brands.map((b) => <option key={b}>{b}</option>)}
              </select>
              <select value={sort} onChange={(e) => update('sort', e.target.value)} aria-label="Sort">
                <option value="popular">Most popular</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
              </select>
            </div>
          </div>
          <p className="muted results">
            {list.length} car{list.length !== 1 && 's'} available{location && <> for pick-up in <b>{location}</b></>}
          </p>
          <div className="grid-3 fleet-grid">
            {list.map((c) => <CarCard key={c.id} car={c} />)}
          </div>
          {!list.length && <p className="center muted">No cars match these filters.</p>}
        </div>
      </section>
    </>
  )
}
