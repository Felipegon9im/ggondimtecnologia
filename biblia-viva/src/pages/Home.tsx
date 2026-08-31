export default function Home() {
  return (
    <div className="p-4 space-y-6">
      {/* Header / Boas-vindas */}
      <header className="flex justify-between items-center mt-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Bíblia Viva</h1>
          <p className="text-sm text-muted-foreground">Leia. Compartilhe. Viva a Palavra.</p>
        </div>
        <div className="flex gap-2">
           <button className="text-sm font-medium px-3 py-1.5 text-primary border border-primary rounded-full hover:bg-primary/10 transition-colors">Entrar</button>
        </div>
      </header>

      {/* Destaque: Devocional do Dia */}
      <section className="bg-primary text-primary-foreground p-6 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <span className="text-xs font-semibold uppercase tracking-wider mb-2 block text-primary-foreground/80">Devocional do Dia</span>
          <h2 className="text-xl font-bold mb-2">A Paz que Excede o Entendimento</h2>
          <p className="text-sm opacity-90 line-clamp-2">E a paz de Deus, que excede todo o entendimento, guardará os vossos corações...</p>
          <button className="mt-4 bg-background text-primary px-4 py-2 rounded-full text-sm font-bold shadow hover:bg-background/90 transition-colors">Ler agora</button>
        </div>
        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      </section>

      {/* Versículo do Dia */}
      <section className="bg-card border border-border p-5 rounded-2xl">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
          📖 Versículo do Dia
        </h3>
        <p className="text-lg italic font-serif mb-2">"Lâmpada para os meus pés é tua palavra e luz para o meu caminho."</p>
        <span className="text-xs font-medium text-primary">— Salmos 119:105</span>
      </section>

      {/* Comunidade e Embaixadores */}
      <section className="bg-accent/50 p-5 rounded-2xl border border-border/50 text-center">
         <h3 className="font-bold mb-1">Programa de Embaixadores</h3>
         <p className="text-sm text-muted-foreground mb-4">Mais de 1.500 irmãos já fazem parte. Ajude outras pessoas a descobrir a Bíblia e cresça com a comunidade.</p>
         <button className="bg-primary text-primary-foreground w-full py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors">Saber mais</button>
      </section>
    </div>
  );
}
