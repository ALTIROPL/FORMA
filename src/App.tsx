import { useState } from 'react';
import { BookOpen, ClipboardList, Home, User, History } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { StageList } from './components/StageList';
import { KnowledgeBase } from './components/KnowledgeBase';
import { Profile } from './components/Profile';
import { HistoryView } from './components/HistoryView';
import { useAppState } from './hooks/useAppState';

export type View = 'dashboard' | 'history' | 'stages' | 'knowledge' | 'profile';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const appState = useAppState();

  const navItems = [
    { id: 'dashboard', label: 'Start', shortLabel: 'Start', icon: Home },
    { id: 'history', label: 'Historia', shortLabel: 'Historia', icon: History },
    { id: 'stages', label: 'Plany Treningowe', shortLabel: 'Plany', icon: ClipboardList },
    { id: 'knowledge', label: 'Baza Wiedzy', shortLabel: 'Poradnik', icon: BookOpen },
    { id: 'profile', label: 'Profil', shortLabel: 'Profil', icon: User },
  ] as const;

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentView} appState={appState} />;
      case 'history':
        return <HistoryView appState={appState} />;
      case 'stages':
        return <StageList />;
      case 'knowledge':
        return <KnowledgeBase />;
      case 'profile':
        return <Profile appState={appState} onNavigate={setCurrentView} />;
      default:
        return <Dashboard onNavigate={setCurrentView} appState={appState} />;
    }
  };

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-50 font-sans overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-zinc-900 border-r border-white/10 z-50">
        <div className="p-6 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight text-emerald-500">
            FORMA 2.0
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors
                  ${isActive 
                    ? 'bg-emerald-500/10 text-emerald-500 font-medium' 
                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100'
                  }
                `}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/10">
          <p className="text-xs text-zinc-500">
            Ponadprzeciętna Forma 2.0<br/>
            Tomasz Strojny
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-full relative">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-center p-4 border-b border-white/10 bg-zinc-900 shrink-0">
          <h1 className="text-lg font-bold text-emerald-500">FORMA 2.0</h1>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 lg:pb-8">
          <div className="max-w-4xl mx-auto">
            {renderView()}
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-white/10 z-50 px-2 pb-[env(safe-area-inset-bottom)] pt-1">
          <div className="flex items-center justify-around h-16">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`
                    flex flex-col items-center justify-center w-full h-full transition-colors
                    ${isActive 
                      ? 'text-emerald-500' 
                      : 'text-zinc-400 hover:text-zinc-100'
                    }
                  `}
                >
                  <div className={`
                    p-1 rounded-full mb-0.5
                    ${isActive ? 'bg-emerald-500/10' : 'bg-transparent'}
                  `}>
                    <Icon size={20} />
                  </div>
                  <span className="text-[10px] font-medium tracking-tight truncate w-full text-center px-1">
                    {item.shortLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      </main>
    </div>
  );
}
