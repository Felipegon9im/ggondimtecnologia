import { Outlet, NavLink } from 'react-router-dom';
import { Home, Book, PlaySquare, CalendarHeart, User } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { path: '/', label: 'Início', icon: Home },
  { path: '/biblia', label: 'Bíblia', icon: Book },
  { path: '/videos', label: 'Vídeos', icon: PlaySquare },
  { path: '/devocional', label: 'Devocional', icon: CalendarHeart },
  { path: '/perfil', label: 'Perfil', icon: User },
];

export function MobileLayout() {
  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Conteúdo Principal (scrollável) */}
      <main className="flex-1 overflow-y-auto pb-16">
        <Outlet />
      </main>

      {/* Navegação Inferior */}
      <nav className="fixed bottom-0 w-full bg-background border-t border-border px-4 py-2 flex justify-between items-center z-50">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center justify-center w-16 h-14 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              <Icon size={24} className="mb-1" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
