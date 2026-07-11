import Header from './components/Header';
import Hero from './components/Hero';
import QuotesMarquee from './components/QuotesMarquee';
import Stats from './components/Stats';
import Services from './components/Services';
import Integrations from './components/Integrations';
import InteractiveWidget from './components/InteractiveWidget';
import Portfolio from './components/Portfolio';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import CanvasBackground from './components/CanvasBackground';

export default function App() {
  return (
    <>
      <CanvasBackground />
      <Header />
      <main style={{ flexGrow: 1 }}>
        <Hero />
        <QuotesMarquee />
        <Stats />
        <Services />
        <Integrations />
        <InteractiveWidget />
        <Portfolio />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
