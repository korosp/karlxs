// pages/index.jsx
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import s from '../styles/Home.module.css'

/* ─── Reveal wrapper ─── */
function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    el.style.transitionDelay = delay + 'ms'
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )
    el.classList.add('reveal'); obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return <div ref={ref} style={style}>{children}</div>
}

/* ─── Typewriter ─── */
const ROLES = [
  'Fullstack Developer',
  'Next.js Engineer',
  'Python Developer',
  'Express.js Backend',
  'FastAPI Builder',
]
function Typewriter() {
  const [text, setText] = useState('')
  const [idx, setIdx]   = useState(0)
  const [del, setDel]   = useState(false)

  useEffect(() => {
    const current = ROLES[idx]
    const timeout = setTimeout(() => {
      if (!del) {
        setText(current.slice(0, text.length + 1))
        if (text.length + 1 === current.length) setTimeout(() => setDel(true), 1500)
      } else {
        setText(current.slice(0, text.length - 1))
        if (text.length - 1 === 0) {
          setDel(false)
          setIdx(i => (i + 1) % ROLES.length)
        }
      }
    }, del ? 40 : 70)
    return () => clearTimeout(timeout)
  }, [text, del, idx])

  return (
    <p className={s.heroRole}>
      {text}<span className={s.cursor} />
    </p>
  )
}

/* ─── SVG Icons ─── */
const IconGithub = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
)
const IconLinkedin = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)
const IconIG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
)
const IconTiktok = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.93a8.18 8.18 0 004.79 1.53V7.01a4.85 4.85 0 01-1.02-.32z"/>
  </svg>
)
const IconMail = ({ size = 20 }) => (
  <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)
const IconWa = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)
const IconArrow = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path d="M7 17L17 7M7 7h10v10"/>
  </svg>
)
const IconExternal = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
  </svg>
)

/* ─── Skill cards data (like hafidzhumaidi grid) ─── */
const SKILLS = [
  { icon: '⚛️', name: 'React',       sub: 'Frontend Lib' },
  { icon: '▲',  name: 'Next.js',     sub: 'Web Framework' },
  { icon: '⚡', name: 'Express',     sub: 'Node Backend' },
  { icon: '🐍', name: 'Python',      sub: 'Backend Lang' },
  { icon: '🚀', name: 'FastAPI',     sub: 'Python API' },
  { icon: '🐘', name: 'PostgreSQL',  sub: 'Database' },
  { icon: '🍃', name: 'MongoDB',     sub: 'NoSQL DB' },
  { icon: '🐳', name: 'Docker',      sub: 'Container' },
  { icon: '🔷', name: 'TypeScript',  sub: 'Typed JS' },
  { icon: '🎨', name: 'Tailwind',    sub: 'CSS Framework' },
  { icon: '⚙️', name: 'Git / GitHub',sub: 'Version Control' },
  { icon: '>_', name: 'VS Code',     sub: 'Code Editor' },
]

const PROJECTS = [
  {
    thumb: 't1', emoji: '🛒',
    title: 'ShopFlow E-Commerce',
    desc: 'Platform belanja online fullstack dengan sistem pembayaran, dashboard admin, dan real-time inventory management.',
    tags: ['Next.js', 'Express', 'PostgreSQL', 'Stripe'],
    demo: '#', github: '#',
  },
  {
    thumb: 't2', emoji: '📊',
    title: 'DataViz Dashboard',
    desc: 'Dashboard analitik real-time dengan visualisasi interaktif, laporan otomatis, dan fitur export PDF/Excel.',
    tags: ['React', 'FastAPI', 'Python', 'Chart.js'],
    demo: '#', github: '#',
  },
  {
    thumb: 't3', emoji: '🤖',
    title: 'AI Chat Assistant',
    desc: 'Chatbot berbasis AI dengan streaming responses, riwayat percakapan, dan interface yang smooth dan responsif.',
    tags: ['Next.js', 'Python', 'FastAPI', 'OpenAI API'],
    demo: '#', github: '#',
  },
]

/* ══════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════ */
export default function Home() {
  const [formSent, setFormSent] = useState(false)
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormSent(true)
    setTimeout(() => setFormSent(false), 3000)
  }

  return (
    <>
      <Head>
        <title>Karlzy Portfolio | Fullstack Developer</title>
      </Head>

      <Navbar />

      {/* ══ HERO ══════════════════════════════════ */}
      <section id="beranda" className={s.hero}>
        <div className={s.heroBg} />
        <div className="container">
          <Reveal>
            <p className={s.heroLabel}>HALO SAYA</p>
            <h1 className={s.heroHeading}>
              Your<br/>Name
            </h1>
          </Reveal>

          <Reveal delay={80}>
            <Typewriter />
          </Reveal>

          <Reveal delay={120}>
            <div className={s.heroSocials}>
              <a href="https://github.com/korosp" target="_blank" rel="noreferrer" title="GitHub"><IconGithub /></a>
              <a href="https://linkedin.com/in/people" target="_blank" rel="noreferrer" title="LinkedIn"><IconLinkedin /></a>
              <a href="https://instagram.com/kkarlzy_" target="_blank" rel="noreferrer" title="Instagram"><IconIG /></a>
              <a href="https://tiktok.com/@karlzyy9" target="_blank" rel="noreferrer" title="TikTok"><IconTiktok /></a>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <p className={s.heroDesc}>
              Saya membantu bisnis dan individu mengubah ide menjadi solusi digital yang indah dan berfungsi.
            </p>

            <div className={s.heroBtns}>
              <a href="#proyek" className={s.btnCyan} onClick={e => { e.preventDefault(); scrollTo('proyek') }}>
                Lihat Proyek <IconArrow />
              </a>
              <a href="#kontak" className={s.btnGhost} onClick={e => { e.preventDefault(); scrollTo('kontak') }}>
                Kontak Saya
              </a>
            </div>
          </Reveal>

          {/* Photo card */}
          <Reveal delay={200}>
            <div className={s.heroCard}>
              <div className={s.photoWrap}>
                <div className={s.photoPlaceholder}>👨‍💻</div>
                <div className={s.photoOverlay} />
                <div className={s.photoInfo}>
                  <div className={s.photoName}>Your Name</div>
                  <div className={s.photoSub}>Fullstack Developer</div>
                </div>
                <div className={s.photoBadge}>
                  <div className={s.badgeLeft}>
                    <div className={s.badgeAvatar}>👨‍💻</div>
                    <div>
                      <div className={s.badgeHandle}>@karlzydevID</div>
                      <div className={s.badgeOnline}>Online</div>
                    </div>
                  </div>
                  <a href="#kontak" className={s.badgeCta} onClick={e => { e.preventDefault(); scrollTo('kontak') }}>
                    Contact Me
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ TENTANG SAYA ══════════════════════════ */}
      <section id="tentang" className={s.about}>
        <div className="container">
          <Reveal>
            <div className={s.aboutBox}>
              <h2 className={s.aboutTitle}>
                Tentang <span className={s.accentPurple}>Saya</span>
              </h2>
              <blockquote className={s.aboutQuote}>
                Perpaduan logika kode dan estetika desain.
              </blockquote>
              <p className={s.aboutText}>
                Perjalanan saya di dunia digital dimulai sejak bangku SMK. Sebagai seorang
                pelajar otodidak, saya terbiasa memecahkan masalah secara mandiri.
                Bagi saya, coding adalah seni menyusun logika yang hidup.
              </p>
              <p className={s.aboutText}>
                Saya spesialisasi di ekosistem JavaScript (Next.js, React, Express) dan
                Python (FastAPI, Django) — membangun aplikasi dari frontend yang indah
                hingga backend API yang robust dan scalable.
              </p>

              <div className={s.aboutStats}>
                <div className={s.stat}>
                  <div className={s.statNum}>3+</div>
                  <div className={s.statLabel}>Tahun Pengalaman</div>
                </div>
                <div className={s.stat}>
                  <div className={s.statNum}>20+</div>
                  <div className={s.statLabel}>Proyek Selesai</div>
                </div>
                <div className={s.stat}>
                  <div className={s.statNum}>10+</div>
                  <div className={s.statLabel}>Klien Puas</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ SKILLS ════════════════════════════════ */}
      <section id="skills" className={s.skills}>
        <div className="container">
          <Reveal>
            <div className={s.sectionHead}>
              <h2 className={s.sectionTitle}>Creative &amp; Tech Stack</h2>
              <span className={s.sectionLine} />
              <p className={s.sectionSub}>Tools &amp; teknologi yang saya gunakan sehari-hari</p>
            </div>
          </Reveal>

          <div className={s.skillGrid}>
            {SKILLS.map((sk, i) => (
              <Reveal key={sk.name} delay={i * 50}>
                <div className={s.skillCard}>
                  <div className={s.skillIconWrap}>{sk.icon}</div>
                  <div>
                    <div className={s.skillName}>{sk.name}</div>
                    <div className={s.skillSub}>{sk.sub}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROJECTS ══════════════════════════════ */}
      <section id="proyek" className={s.projects}>
        <div className="container">
          <Reveal>
            <div className={s.sectionHead}>
              <h2 className={s.sectionTitle}>
                Proyek <span className={s.accentCyan}>Terpilih</span>
              </h2>
              <span className={s.sectionLine} />
              <p className={s.sectionSub}>Beberapa karya yang menyoroti keahlian saya.</p>
            </div>
          </Reveal>

          <div className={s.projectList}>
            {PROJECTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className={s.projectCard}>
                  <div className={`${s.projectThumb} ${s[p.thumb]}`}>
                    <span style={{ fontSize: '4rem' }}>{p.emoji}</span>
                  </div>
                  <div className={s.projectBody}>
                    <div className={s.projectTitle}>{p.title}</div>
                    <div className={s.projectDesc}>{p.desc}</div>
                    <div className={s.projectTags}>
                      {p.tags.map(t => <span key={t} className={s.ptag}>{t}</span>)}
                    </div>
                    <div className={s.projectLinks}>
                      <a href={p.demo} target="_blank" rel="noreferrer" className={s.plinkFill}>
                        Live Demo <IconExternal />
                      </a>
                      <a href={p.github} target="_blank" rel="noreferrer" className={s.plinkOut}>
                        <IconGithub /> GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className={s.viewAllWrap}>
              <a href="https://github.com/korosp" target="_blank" rel="noreferrer" className={s.btnViewAll}>
                Lihat Semua Proyek
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ CONTACT ═══════════════════════════════ */}
      <section id="kontak" className={s.contact}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <h2 className={s.contactTitle}>
                Mari <span className={s.accentCyan}>Terhubung</span>
              </h2>
              <p className={s.contactSub}>
                Saya selalu terbuka untuk proyek baru atau sekadar obrolan. Kirimkan sinyal Anda.
              </p>
            </div>
          </Reveal>

          {/* Info card */}
          <Reveal>
            <div className={s.contactBox}>
              <div className={s.statusBadge}>
                <span className={s.statusDot} />
                System Status: Online
              </div>

              <div className={s.contactLinks}>
                <a href="karl:dev@starwarks.com" className={s.contactLink}>
                  <div className={s.contactLinkIcon}><IconMail size={22} /></div>
                  <div>
                    <div className={s.contactLinkLabel}>Email Me</div>
                    <div className={s.contactLinkVal}>karl@starwarks.com</div>
                  </div>
                </a>
                <a href="https://wa.me/6283198131547" target="_blank" rel="noreferrer" className={s.contactLink}>
                  <div className={s.contactLinkIcon}><IconWa size={22} /></div>
                  <div>
                    <div className={s.contactLinkLabel}>Chat WhatsApp</div>
                    <div className={s.contactLinkVal}>+62 812 3456 7890</div>
                  </div>
                </a>
              </div>

              <div className={s.uplink}>
                <span className={s.uplinkDot}>📶</span>
                <span>((•))</span>
                <span>ESTABLISHING UPLINK...</span>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={100}>
            <div className={s.contactForm}>
              <div className={s.formTitle}>
                <span style={{ color: 'var(--pink)' }}>➤</span>
                INITIATE DATA TRANSMISSION
              </div>
              <div className={s.formSub}>Isi form berikut untuk menghubungi saya</div>

              <form onSubmit={handleSubmit}>
                <div className={s.formGroup}>
                  <span className={s.formIcon}>
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"/>
                    </svg>
                  </span>
                  <input className={s.formInput} type="text" placeholder="ID Pengirim / Nama" required />
                </div>

                <div className={s.formGroup}>
                  <span className={s.formIcon}><IconMail size={18} /></span>
                  <input className={s.formInput} type="email" placeholder="Frekuensi Email" required />
                </div>

                <textarea
                  className={s.formTextarea}
                  placeholder="Data Transmisi Pesan"
                  rows={5}
                  required
                />

                <button type="submit" className={s.formSubmit}>
                  {formSent ? '✅ TERKIRIM!' : <>INISIASI TRANSMISI <IconArrow /></>}
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ FOOTER ════════════════════════════════ */}
      <footer className={s.footer}>
        <div className={`container ${s.footerInner}`}>
          <div>
            <div className={s.footerLogo}>dev<span>.</span></div>
            <div className={s.footerCopy}>© {new Date().getFullYear()} — Dibuat dengan codeX &amp; Next.js</div>
          </div>

          <div className={s.footerSocials}>
            <a href="https://github.com/korosp" target="_blank" rel="noreferrer" className={s.footerSocial} title="GitHub">
              <IconGithub />
            </a>
            <a href="https://tiktok.com/@karlzyy9" target="_blank" rel="noreferrer" className={s.footerSocial} title="TikTok">
              <IconTiktok />
            </a>
            <a href="https://instagram.com/kkarlzy_" target="_blank" rel="noreferrer" className={s.footerSocial} title="Instagram">
              <IconIG />
            </a>
            <a href="#proyek" className={s.footerSocial} title="Portfolio"
               onClick={e => { e.preventDefault(); scrollTo('proyek') }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <ScrollTop />
    </>
  )
}

/* ─── Scroll to top button (cyan, like hafidzhumaidi) ─── */
function ScrollTop() {
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const fn = () => setVis(window.scrollY > 400)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      style={{
        position: 'fixed',
        bottom: 28, right: 28,
        width: 48, height: 48,
        borderRadius: '50%',
        background: 'var(--cyan)',
        border: 'none',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--bg)',
        boxShadow: '0 4px 20px var(--cyan-glow)',
        transition: 'opacity .3s, transform .3s',
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(16px)',
        pointerEvents: vis ? 'auto' : 'none',
        zIndex: 900,
      }}
    >
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    </button>
  )
}
