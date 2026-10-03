import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="section notfound">
      <div className="container center">
        <img src="/cars/cutout/lamborghini-huracan.webp" alt="" />
        <h1>404</h1>
        <p className="muted">Looks like this road leads nowhere.</p>
        <Link to="/" className="btn">Back to Home</Link>
      </div>
    </section>
  )
}
