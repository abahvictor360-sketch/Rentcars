const P = {
  facebook: 'M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H7v4h2v8h4v-8h3l1-4h-4V9c0-.6.4-1 1-1z',
  instagram: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm5.5-1.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z',
  x: 'M4 4h4.5l4 5.6L17.5 4H20l-6.3 7.3L20.5 20H16l-4.4-6L6.3 20H4l6.4-7.4z',
  tiktok: 'M16 3c.4 2.4 2 4 4.5 4.2v3.3c-1.7 0-3.2-.5-4.5-1.4V15a6 6 0 1 1-6-6v3.4a2.6 2.6 0 1 0 2.6 2.6V3z',
}
export default function Social({ name, size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={name === 'instagram' ? 'none' : 'currentColor'} stroke={name === 'instagram' ? 'currentColor' : 'none'} strokeWidth="2" aria-hidden="true">
      <path d={P[name]} />
    </svg>
  )
}
