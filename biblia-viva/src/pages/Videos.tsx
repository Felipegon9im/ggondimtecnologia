export default function Videos() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Feed de Vídeos</h1>
      <div className="grid gap-4">
        {/* Placeholder de Vídeo */}
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="aspect-video bg-muted flex items-center justify-center relative">
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
              <span className="bg-white/90 text-primary w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                ▶
              </span>
            </div>
            <img src="https://images.unsplash.com/photo-1438283173091-5dbf5c5a3206?w=800&q=80" alt="Thumbnail" className="w-full h-full object-cover" />
          </div>
          <div className="p-4">
            <span className="text-[10px] font-bold uppercase text-primary mb-1 block">Pregação</span>
            <h2 className="font-semibold leading-tight mb-2">A Importância da Oração na Família</h2>
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>Por Pr. Exemplo</span>
              <span>1.2k visualizações</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
