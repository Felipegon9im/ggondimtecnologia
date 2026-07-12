import Header from './components/Header';
import Hero from './components/Hero';
import QuotesMarquee from './components/QuotesMarquee';
import Stats from './components/Stats';
import Services from './components/Services';
import Integrations from './components/Integrations';
import InteractiveWidget from './components/InteractiveWidget';
import Portfolio from './components/Portfolio';
import TechStack from './components/TechStack';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import CanvasBackground from './components/CanvasBackground';
import BibleDivider from './components/BibleDivider';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  return (
    <>
      <CanvasBackground />
      <WhatsAppButton />
      <Header />
      <main style={{ flexGrow: 1 }}>
        <Hero />
        <QuotesMarquee />
        
        <BibleDivider 
          verse="Consagre ao Senhor tudo o que você faz, e os seus planos serão bem-sucedidos." 
          reference="Provérbios 16:3" 
        />
        
        <Stats />
        
        <BibleDivider 
          verse="Tudo o que fizerem, façam de todo o coração, como para o Senhor, e não para os homens." 
          reference="Colossenses 3:23" 
        />
        
        <Services />
        
        <BibleDivider 
          verse="Tudo posso naquele que me fortalece." 
          reference="Filipenses 4:13" 
        />
        
        <Integrations />
        
        <BibleDivider 
          verse="Tudo o que a sua mão achar para fazer, faça-o com todas as suas forças." 
          reference="Eclesiastes 9:10" 
        />
        
        <TechStack />
        
        <BibleDivider 
          verse="Seja forte e corajoso! Não se apavore nem desanime, pois o Senhor, o seu Deus, estará com você por onde você andar." 
          reference="Josué 1:9" 
        />
        
        <InteractiveWidget />
        
        <BibleDivider 
          verse="Seja sobre nós a graça do Senhor, nosso Deus; confirma sobre nós a obra das nossas mãos; sim, confirma a obra das nossas mãos." 
          reference="Salmo 90:17" 
        />
        
        <Portfolio />
        
        <BibleDivider 
          verse="Confie no Senhor de todo o seu coração e não se apoie em seu próprio entendimento; reconheça o Senhor em todos os seus caminhos, e ele endireitará as suas veredas." 
          reference="Provérbios 3:5-6" 
        />
        
        <FAQ />
        
        <BibleDivider 
          verse="Para o homem isso é impossível, mas para Deus todas as coisas são possíveis." 
          reference="Mateus 19:26" 
        />
      </main>
      <Footer />
    </>
  );
}
