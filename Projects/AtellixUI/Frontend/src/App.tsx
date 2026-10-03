import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Footer from './components/Footer.tsx'
import Button from './components/Button.tsx'

function App() {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-between text-white">
      <section id="center" className="w-full">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="Hero" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
      </section>

      <header>
        {/* Your header content here */}
      </header>

      <main className="flex-1 w-full py-4">
        {/* Your main content here */}
      </main>

      <Footer />
      <Button>Click me</Button>

      <div className="ticks" />
      <section id="spacer" />
    </div>
  )
}

export default App
