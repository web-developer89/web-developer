import { Hero } from '../components/sections/Hero.tsx'
import { Services } from '../components/sections/Services.tsx'
import { Explorer } from '../components/sections/Explorer.tsx'
import { FeatureUniverse } from '../components/sections/FeatureUniverse.tsx'
import { Configurator } from '../components/sections/Configurator.tsx'
import { Process } from '../components/sections/Process.tsx'
import { Trust } from '../components/sections/Trust.tsx'
import { Portfolio } from '../components/sections/Portfolio.tsx'
import { BeforeAfter } from '../components/sections/BeforeAfter.tsx'
import { FAQ } from '../components/sections/FAQ.tsx'
import { Contact } from '../components/sections/Contact.tsx'
import { Seo } from '../components/Seo.tsx'

export function Home() {
  return (
    <>
      <Seo />
      <Hero />
      <Services />
      <Explorer />
      <FeatureUniverse />
      <Configurator />
      <Process />
      <Trust />
      <Portfolio />
      <BeforeAfter />
      <FAQ />
      <Contact />
    </>
  )
}
