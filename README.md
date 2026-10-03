# RentCarsNG

Car rental website for Nigeria — built with React + Vite.

## Pages
- `/` Home (hero search, how it works, top rated cars, services, branches, testimonials, off-road fleet, blog)
- `/how-it-works`
- `/rental-deals` — full fleet with category / brand / price filters
- `/cars/:id` — car details with booking form & price calculator
- `/why-choose-us` — reasons, stats, FAQ
- `/contact` — contact form & branch map
- `/sign-in`, `/sign-up`

## Images
Car photos live in `public/cars/raw/`; background-removed versions (made with [rembg](https://github.com/danielgatis/rembg), `isnet-general-use` model) are in `public/cars/cutout/`. Fleet data is in `src/data/cars.js`.

## Develop
```bash
npm install
npm run dev
npm run build
```

Forms (booking, contact, sign in/up, newsletter) are front-end only for now — they show a confirmation but do not send data to a backend yet.
