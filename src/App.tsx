import Header from './components/Header';
import Hero from './components/Hero';
import QuotesMarquee from './components/QuotesMarquee';
import About from './components/About';
import WebDev from './components/WebDev';
import CustomSystems from './components/CustomSystems';
import DashboardsBI from './components/DashboardsBI';
import InteractiveWidget from './components/InteractiveWidget';
import Automations from './components/Automations';
import Integrations from './components/Integrations';
import TechStack from './components/TechStack';
import HowWeWork from './components/HowWeWork';
import Portfolio from './components/Portfolio';
import Diferenciais from './components/Diferenciais';
import Services from './components/Services';
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
      <main style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Hero />
        <QuotesMarquee />
        
        {/* Divider 1 */}
        <BibleDivider 
          verse="Consagre ao Senhor tudo o que você faz, e os seus planos serão bem-sucedidos." 
          reference="Provérbios 16:3" 
        />
        
        {/* 1. Sobre */}
        <About />
        
        {/* Divider 2 */}
        <BibleDivider 
          verse="Tudo o que fizerem, façam de todo o coração, como para o Senhor, e não para os homens." 
          reference="Colossenses 3:23" 
        />
        
        {/* 2. Desenvolvimento de Sites */}
        <WebDev />
        
        {/* Divider 3 */}
        <BibleDivider 
          verse="Tudo posso naquele que me fortalece." 
          reference="Filipenses 4:13" 
        />
        
        {/* 3. Sistemas Sob Medida */}
        <CustomSystems />
        
        {/* Divider 4 */}
        <BibleDivider 
          verse="Tudo o que a sua mão achar para fazer, faça-o com todas as suas forças." 
          reference="Eclesiastes 9:10" 
        />
        
        {/* 4. Dashboards e Business Intelligence */}
        <DashboardsBI />
        
        {/* Interactive Playground extension */}
        <InteractiveWidget />
        
        {/* Divider 5 */}
        <BibleDivider 
          verse="Seja forte e corajoso! Não se apavore nem desanime, pois o Senhor, o seu Deus, estará com você por onde você andar." 
          reference="Josué 1:9" 
        />
        
        {/* 5. Automações e Integrações */}
        <Automations />
        
        {/* Bling Integration visual diagram */}
        <Integrations />
        
        {/* Divider 6 */}
        <BibleDivider 
          verse="O Senhor é a minha força e o meu escudo; nele o meu coração confia, e dele recebo ajuda." 
          reference="Salmo 28:7" 
        />
        
        {/* 6. Tecnologias */}
        <TechStack />
        
        {/* Divider 7 */}
        <BibleDivider 
          verse="Seja sobre nós a graça do Senhor, nosso Deus; confirma sobre nós a obra das nossas mãos; sim, confirma a obra das nossas mãos." 
          reference="Salmo 90:17" 
        />
        
        {/* 7. Como Trabalhamos */}
        <HowWeWork />
        
        {/* Divider 8 */}
        <BibleDivider 
          verse="Os passos de um homem bom são confirmados pelo Senhor, e ele deleita-se no seu caminho." 
          reference="Salmo 37:23" 
        />
        
        {/* 8. Sistemas em Produção (Vitrine) */}
        <Portfolio />
        
        {/* Divider 9 */}
        <BibleDivider 
          verse="Confie no Senhor de todo o seu coração e não se apoie em seu próprio entendimento; reconheça o Senhor em todos os seus caminhos, e ele endireitará as suas veredas." 
          reference="Provérbios 3:5-6" 
        />
        
        {/* 9. Diferenciais */}
        <Diferenciais />
        
        {/* Cases de sucesso visual list */}
        <Services />
        
        {/* FAQ Area */}
        <FAQ />
        
        {/* Divider 10 */}
        <BibleDivider 
          verse="Para o homem isso é impossível, mas para Deus todas as coisas são possíveis." 
          reference="Mateus 19:26" 
        />
      </main>
      
      {/* 10. Chamada Final & Contato */}
      <Footer />
    </>
  );
}
