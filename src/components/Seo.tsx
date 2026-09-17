import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { siteConfig } from '../siteConfig.ts'

type SeoProps = {
  title?: string
  description?: string
}

export function Seo({ title, description }: SeoProps) {
  const { pathname } = useLocation()
  const fullTitle = title ?? `${siteConfig.brandName} — Websites, die etwas können.`
  const desc =
    description ??
    'Webentwickler für One-Pages, Unternehmensseiten, Ferienwohnungen und individuelle Web-Plattformen.'

  useEffect(() => {
    document.title = fullTitle
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', desc)
  }, [fullTitle, desc, pathname])

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: siteConfig.brandName,
          url: siteConfig.siteUrl,
          email: siteConfig.email,
          areaServed: 'DE',
          serviceType: ['Webentwicklung', 'Webdesign', 'Individuelle Websites'],
          description: desc,
        }),
      }}
    />
  )
}
