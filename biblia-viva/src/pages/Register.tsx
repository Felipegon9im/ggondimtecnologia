import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center p-6">
      <div className="w-full max-w-sm mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">Bíblia Viva</h1>
          <p className="text-muted-foreground mt-2">Junte-se à comunidade</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-sm font-medium">Nome completo</label>
            <input 
              type="text" 
              className="w-full p-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Seu nome"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">E-mail</label>
            <input 
              type="email" 
              className="w-full p-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="seu@email.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Senha</label>
            <input 
              type="password" 
              className="w-full p-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Código de indicação (opcional)</label>
            <input 
              type="text" 
              className="w-full p-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ex: JOAO123"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors mt-6"
          >
            Cadastrar
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Já tem uma conta? <Link to="/login" className="text-primary font-bold">Entrar</Link>
        </p>
      </div>
    </div>
  );
}
