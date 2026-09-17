import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './theme/ThemeProvider.tsx'
import { HashScroll } from './components/HashScroll.tsx'
import { ScrollProgress } from './components/layout/ScrollProgress.tsx'
import { CursorGlow } from './components/layout/CursorGlow.tsx'
import { Header } from './components/layout/Header.tsx'
import { Footer } from './components/layout/Footer.tsx'
import { FloatingContact } from './components/layout/FloatingContact.tsx'
import { CommandPalette } from './components/layout/CommandPalette.tsx'
import { Home } from './pages/Home.tsx'
import { Impressum } from './pages/Impressum.tsx'
import { Datenschutz } from './pages/Datenschutz.tsx'
import { NotFound } from './pages/NotFound.tsx'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <HashScroll />
        <a className="skip-link" href="#top">
          Zum Inhalt
        </a>
        <div className="mesh" aria-hidden="true" />
        <div className="noise" aria-hidden="true" />
        <CursorGlow />
        <ScrollProgress />
        <div className="app-shell" id="top">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <FloatingContact />
        </div>
        <CommandPalette />
      </BrowserRouter>
    </ThemeProvider>
  )
}
