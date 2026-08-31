export default function Devotional() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Devocional Diário</h1>
      <div className="bg-card border border-border p-6 rounded-xl">
        <span className="text-sm text-primary font-medium mb-1 block">Hoje, 22 de Agosto</span>
        <h2 className="text-xl font-bold mb-4">A Paz que Excede o Entendimento</h2>
        <p className="text-muted-foreground text-sm mb-4">
          Nesta área você encontrará uma reflexão diária com base na Palavra de Deus, 
          ajudando a fortalecer sua fé.
        </p>
        <button className="bg-primary/10 text-primary w-full py-2.5 rounded-xl font-semibold mb-2">
          Compartilhar
        </button>
        <button className="bg-primary text-primary-foreground w-full py-2.5 rounded-xl font-semibold">
          Marcar como lido (+10 pts)
        </button>
      </div>
    </div>
  );
}
