import { siteConfig } from '../siteConfig.ts'

export function isHttpUrl(value: string) {
  return value.startsWith('https://') || value.startsWith('http://')
}

export function contactOptions() {
  const options: { id: string; label: string; href: string; external?: boolean }[] = []
  if (siteConfig.email) {
    options.push({
      id: 'email',
      label: 'E-Mail',
      href: `mailto:${siteConfig.email}`,
    })
  }
  if (siteConfig.phone) {
    options.push({
      id: 'phone',
      label: 'Anrufen',
      href: `tel:${siteConfig.phone.replace(/\s+/g, '')}`,
    })
  }
  if (siteConfig.whatsapp) {
    options.push({
      id: 'whatsapp',
      label: 'WhatsApp',
      href: `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, '')}`,
      external: true,
    })
  }
  return options
}
