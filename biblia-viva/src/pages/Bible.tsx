export default function Bible() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bíblia Sagrada</h1>
      <div className="bg-card border border-border p-4 rounded-xl flex flex-col gap-4">
        <p className="text-muted-foreground">Em breve: Navegação por livros e capítulos, com opção de favoritar e marcar leitura.</p>
        <button className="bg-primary text-primary-foreground py-2 rounded-xl text-sm font-semibold">
          Continuar Leitura
        </button>
      </div>
    </div>
  );
}
