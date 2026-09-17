import { Link } from 'react-router-dom'
import { siteConfig } from '../../siteConfig.ts'

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <p>
          © {new Date().getFullYear()} {siteConfig.brandName}. Webentwicklung ohne Baukasten-Feeling.
        </p>
        <p>
          <Link to="/impressum">Impressum</Link>
          <Link to="/datenschutz">Datenschutz</Link>
        </p>
      </div>
    </footer>
  )
}
