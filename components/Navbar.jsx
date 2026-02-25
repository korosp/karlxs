// components/Navbar.jsx
import { useState, useEffect } from 'react'
import s from '../styles/Navbar.module.css'

const LINKS = [
  { href: '#beranda',  label: 'Beranda' },
  { href: '#tentang',  label: 'Tentang' },
  { href: '#proyek',   label: 'Proyek' },
  { href: '#kontak',   label: 'Kontak' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const [active, setActive]     = useState('#beranda')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)
      const ids = ['beranda', 'tentang', 'proyek', 'kontak']
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActive('#' + id)
          return
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (href) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className={`${s.nav} ${scrolled ? s.scrolled : ''}`}>
        <div className={`container ${s.inner}`}>
          <span className={s.logo}>Hafidz<span className={s.logoDot}>.</span></span>

          <ul className={s.links}>
            {LINKS.map(l => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={active === l.href ? s.active : ''}
                  onClick={e => { e.preventDefault(); go(l.href) }}
                >{l.label}</a>
              </li>
            ))}
          </ul>

          <button className={`${s.ham} ${open ? s.open : ''}`} onClick={() => setOpen(!open)} aria-label="menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`${s.drawer} ${open ? s.open : ''}`}>
        {LINKS.map(l => (
          <a key={l.href} href={l.href} className={active === l.href ? s.active : ''}
             onClick={e => { e.preventDefault(); go(l.href) }}>{l.label}</a>
        ))}
      </div>
    </>
  )
}
