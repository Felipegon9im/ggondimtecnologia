export default function Profile() {
  return (
    <div className="p-4">
      <header className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xl font-bold">
          FV
        </div>
        <div>
          <h1 className="text-xl font-bold">Felipe (Você)</h1>
          <p className="text-sm text-primary font-medium">Nível 2: Compartilhador</p>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-card border border-border p-4 rounded-xl text-center">
          <span className="text-2xl font-bold text-primary block">340</span>
          <span className="text-xs text-muted-foreground font-medium uppercase">Pontos</span>
        </div>
        <div className="bg-card border border-border p-4 rounded-xl text-center">
          <span className="text-2xl font-bold text-primary block">12</span>
          <span className="text-xs text-muted-foreground font-medium uppercase">Dias Seguidos</span>
        </div>
      </div>

      <section className="bg-accent/50 p-5 rounded-2xl border border-border/50">
        <h3 className="font-bold mb-2">Programa de Embaixadores</h3>
        <p className="text-sm text-muted-foreground mb-4">Você indicou 3 pessoas. Falta pouco para o próximo nível!</p>
        <button className="bg-background text-primary w-full py-2.5 rounded-xl text-sm font-semibold shadow hover:bg-background/90 transition-colors">
          Meu Link de Indicação
        </button>
      </section>
      
      <button className="mt-8 text-sm text-destructive font-medium w-full text-center">
        Sair da conta
      </button>
    </div>
  );
}
