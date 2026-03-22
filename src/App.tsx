import { useState } from 'react';
import { BookOpen, ClipboardList, Home, Menu, X, User, History } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { StageList } from './components/StageList';
import { KnowledgeBase } from './components/KnowledgeBase';
import { Profile } from './components/Profile';
import { HistoryView } from './components/HistoryView';
import { useAppState } from './hooks/useAppState';

export type View = 'dashboard' | 'history' | 'stages' | 'knowledge' | 'profile';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const appState = useAppState();

  const navItems = [
    { id: 'dashboard', label: 'Start', icon: Home },
    { id: 'history', label: 'Historia', icon: History },
    { id: 'stages', label: 'Plany Treningowe', icon: ClipboardList },
    { id: 'knowledge', label: 'Baza Wiedzy', icon: BookOpen },
    { id: 'profile', label: 'Profil', icon: User },
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
    <div className="flex h-screen bg-zinc-950 text-zinc-50 font-sans">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-zinc-900 border-r border-white/10
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center justify-between">
            <h1 className="text-xl font-bold tracking-tight text-emerald-500">
              FORMA 2.0
            </h1>
            <button 
              className="lg:hidden text-zinc-400 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    setIsMobileMenuOpen(false);
                  }}
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
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-white/10 bg-zinc-900">
          <h1 className="text-lg font-bold text-emerald-500">FORMA 2.0</h1>
          <button 
            className="text-zinc-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            {renderView()}
          </div>
        </div>
      </main>
    </div>
  );
}
