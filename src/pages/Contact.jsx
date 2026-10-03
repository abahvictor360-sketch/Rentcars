import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react'
import { PageBanner, Branches } from '../components/Sections'
import { contact } from '../data/site'

export default function Contact() {
  const [sent, setSent] = useState(false)
  return (
    <>
      <PageBanner title="Contact Us" text="Questions, corporate rentals or special requests? We’d love to hear from you." image="/cars/cutout/fortuner-white.webp" />
      <section className="section">
        <div className="container contact">
          <div className="contact__info">
            <h2 className="h2-left">Get in touch</h2>
            <p className="muted">Our team responds within one hour during opening times. For urgent bookings, call or WhatsApp us.</p>
            <ul>
              <li><span className="icon-box"><MapPin /></span><div><b>Head Office</b>{contact.address}</div></li>
              <li><span className="icon-box"><Phone /></span><div><b>Phone / WhatsApp</b><a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a></div></li>
              <li><span className="icon-box"><Mail /></span><div><b>Email</b><a href={`mailto:${contact.email}`}>{contact.email}</a></div></li>
              <li><span className="icon-box"><Clock /></span><div><b>Opening Hours</b>{contact.hours}</div></li>
            </ul>
          </div>
          {sent ? (
            <div className="booking booking--done">
              <CheckCircle2 size={48} />
              <h3>Message sent!</h3>
              <p>Thanks for reaching out. We’ll get back to you shortly.</p>
              <button className="btn btn--outline" onClick={() => setSent(false)}>Send another message</button>
            </div>
          ) : (
            <form className="booking" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
              <h3>Send us a message</h3>
              <div className="form-grid">
                <label><span>Full name</span><input required placeholder="Your name" /></label>
                <label><span>Phone</span><input type="tel" placeholder="+234 ..." /></label>
                <label className="span-2"><span>Email</span><input type="email" required placeholder="you@email.com" /></label>
                <label className="span-2"><span>Subject</span>
                  <select><option>General enquiry</option><option>Booking</option><option>Corporate / fleet rental</option><option>Weddings &amp; events</option><option>Feedback</option></select>
                </label>
                <label className="span-2"><span>Message</span><textarea required rows={5} placeholder="How can we help?" /></label>
              </div>
              <button className="btn btn--block" type="submit">Send Message</button>
            </form>
          )}
        </div>
      </section>
      <Branches />
    </>
  )
}
