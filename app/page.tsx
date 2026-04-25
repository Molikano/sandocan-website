import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Features from '@/components/Features'
import CodeShowcase from '@/components/CodeShowcase'
import Performance from '@/components/Performance'
import Install from '@/components/Install'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Stats />
      <Features />
      <CodeShowcase />
      <Performance />
      <Install />
      <Footer />
    </>
  )
}
