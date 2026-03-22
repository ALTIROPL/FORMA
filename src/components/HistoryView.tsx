import { Clock, Calendar as CalendarIcon, History, Activity } from 'lucide-react';
import { AppState } from '../hooks/useAppState';

interface HistoryViewProps {
  appState: {
    state: AppState;
  };
}

export function HistoryView({ appState }: HistoryViewProps) {
  const { history } = appState.state;

  const totalMinutes = history.reduce((acc, curr) => acc + curr.durationMinutes, 0);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          Twoja Historia
        </h1>
        <p className="text-zinc-400 text-lg">
          Przegląd aktywności
        </p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-zinc-900 rounded-2xl p-6 border border-white/5">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Ukończone Treningi</h3>
          <div className="text-4xl font-black text-white">{history.length}</div>
        </div>
        <div className="bg-zinc-900 rounded-2xl p-6 border border-white/5">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Czas Łącznie</h3>
          <div className="text-4xl font-black text-white">
            {hours}h <span className="text-xl text-zinc-500">{minutes}m</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Ostatnie Aktywności</h2>
        
        <div className="bg-zinc-900 rounded-2xl border border-white/5 overflow-hidden min-h-[200px]">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-zinc-500">
              <History size={48} className="mb-4 opacity-20" />
              <p>Brak zapisanych treningów.</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {history.map((record) => (
                <div key={record.id} className="p-4 flex items-center justify-between hover:bg-zinc-800/30 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${record.type === 'plan' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}>
                      {record.type === 'plan' ? <CalendarIcon size={20} /> : <Activity size={20} />}
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{record.name}</h4>
                      <p className="text-xs text-zinc-400 flex items-center mt-1">
                        {new Date(record.date).toLocaleDateString('pl-PL', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-zinc-300 font-mono text-sm">
                    <Clock size={14} className="mr-1.5 text-zinc-500" />
                    {record.durationMinutes} min
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
