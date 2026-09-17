import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { siteConfig } from '../../siteConfig.ts'
import { Button } from '../ui/Button.tsx'
import { ThemeSwitcher } from './ThemeSwitcher.tsx'
import { useLockBody } from '../../hooks/useLockBody.ts'
import { cn } from '../../utils/cn.ts'

export function Header() {
  const { pathname, hash } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useLockBody(open)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname, hash])

  return (
    <>
      <header className={cn('header', scrolled && 'is-scrolled')}>
        <div className="header-inner">
          <Link to="/" className="brand">
            <span className="brand-mark">{siteConfig.mark}</span>
            {siteConfig.brandName}
          </Link>
          <nav className="desktop-nav" aria-label="Hauptnavigation">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={hash && item.href.endsWith(hash) ? 'is-active' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <ThemeSwitcher />
            <Button to="/#konfigurator" magnetic>
              Projekt starten
            </Button>
            <button
              className="menu-toggle"
              aria-expanded={open}
              aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? '×' : '☰'}
            </button>
          </div>
        </div>
      </header>
      {open ? (
        <nav className="mobile-panel" aria-label="Mobilnavigation">
          {siteConfig.nav.map((item) => (
            <Link key={item.href} to={item.href}>
              {item.label}
            </Link>
          ))}
          <Button to="/#konfigurator">Projekt starten</Button>
        </nav>
      ) : null}
    </>
  )
}
