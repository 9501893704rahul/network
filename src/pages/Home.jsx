import Header from '../components/Header'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Partners from '../components/Partners'
import Products from '../components/Products'
import FAQ from '../components/FAQ'
import Blog from '../components/Blog'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

function Home() {
  return (
    <div className="min-h-screen bg-[#0F0A1F]">
      <Header />
      <main>
        <Hero />
        <Features />
        <Partners />
        <Products />
        <FAQ />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default Home
