import { useState } from 'react';
import { Clock, Calendar as CalendarIcon, History, Activity, X, ChevronRight, CheckCircle2, Plus } from 'lucide-react';
import { AppState, ActivityRecord } from '../hooks/useAppState';
import { stages } from '../data/program';
import { CalendarWidget } from './CalendarWidget';

interface HistoryViewProps {
  appState: {
    state: AppState;
    addActivity: (activity: Omit<ActivityRecord, 'id'>) => void;
  };
}

export function HistoryView({ appState }: HistoryViewProps) {
  const { history, profile } = appState.state;
  const [selectedActivity, setSelectedActivity] = useState<ActivityRecord | null>(null);
  
  const [isManualLogOpen, setIsManualLogOpen] = useState(false);
  const [manualDate, setManualDate] = useState(new Date().toISOString().split('T')[0]);
  const [manualStage, setManualStage] = useState(profile.currentStageId);
  const [manualLevel, setManualLevel] = useState(profile.currentLevel);
  const [manualDuration, setManualDuration] = useState('45');

  const handleAddManualLog = (e: React.FormEvent) => {
    e.preventDefault();
    
    const stage = stages.find(s => s.id === manualStage);
    const plan = stage?.plans.find(p => p.level === manualLevel);
    
    if (!stage || !plan) return;
    
    const now = new Date();
    const [year, month, day] = manualDate.split('-');
    const activityDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), now.getHours(), now.getMinutes(), now.getSeconds());
    
    appState.addActivity({
      date: activityDate.toISOString(),
      type: 'plan',
      name: `Etap ${stage.id}: Poziom ${plan.level}`,
      durationMinutes: parseInt(manualDuration) || 45,
      stageId: stage.id,
      level: plan.level,
      // We don't add exercises array here because it's a manual log without specific set tracking
    });
    
    setIsManualLogOpen(false);
  };

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
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Ostatnie Aktywności</h2>
          <button 
            onClick={() => setIsManualLogOpen(true)}
            className="flex items-center text-xs font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-lg hover:bg-emerald-500/20 transition-colors"
          >
            <Plus size={14} className="mr-1" /> DODAJ Z PROGRAMU
          </button>
        </div>
        
        <div className="bg-zinc-900 rounded-2xl border border-white/5 overflow-hidden min-h-[200px]">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-zinc-500">
              <History size={48} className="mb-4 opacity-20" />
              <p>Brak zapisanych treningów.</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {history.map((record) => (
                <button 
                  key={record.id} 
                  onClick={() => setSelectedActivity(record)}
                  className="w-full p-4 flex items-center justify-between hover:bg-zinc-800/50 transition-colors text-left group"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${record.type === 'plan' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}>
                      {record.type === 'plan' ? <CalendarIcon size={20} /> : <Activity size={20} />}
                    </div>
                    <div>
                      <h4 className="font-bold text-white group-hover:text-emerald-500 transition-colors">{record.name}</h4>
                      <p className="text-xs text-zinc-400 flex items-center mt-1">
                        {new Date(record.date).toLocaleDateString('pl-PL', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-zinc-300 font-mono text-sm">
                    <Clock size={14} className="mr-1.5 text-zinc-500" />
                    {record.durationMinutes} min
                    <ChevronRight size={16} className="ml-2 text-zinc-600 group-hover:text-emerald-500 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Activity Details Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4">
          <div className="bg-zinc-900 rounded-2xl border border-white/10 w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[80vh]">
            <div className="flex items-center justify-between p-4 border-b border-white/5 shrink-0">
              <div>
                <h3 className="font-bold text-white text-lg">{selectedActivity.name}</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  {new Date(selectedActivity.date).toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <button onClick={() => setSelectedActivity(null)} className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="flex items-center justify-between bg-zinc-950 rounded-xl p-4 border border-white/5 mb-6">
                <div className="flex items-center text-zinc-300">
                  <Clock size={18} className="mr-2 text-emerald-500" />
                  <span className="font-bold">Czas trwania</span>
                </div>
                <div className="font-mono text-lg text-white">{selectedActivity.durationMinutes} min</div>
              </div>

              {selectedActivity.exercises && selectedActivity.exercises.length > 0 ? (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Wykonane ćwiczenia</h4>
                  <div className="space-y-3">
                    {selectedActivity.exercises.map((ex, i) => (
                      <div key={i} className="bg-zinc-950 rounded-xl p-4 border border-white/5">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-bold text-white text-sm pr-4">{ex.name}</h5>
                          {ex.completedSets === ex.totalSets && (
                            <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-zinc-500">Cel: <span className="text-zinc-300">{ex.goal}</span></span>
                          <span className={`${ex.completedSets > 0 ? 'text-emerald-500' : 'text-zinc-500'} font-bold`}>
                            {ex.completedSets} / {ex.totalSets} serii
                          </span>
                        </div>
                        {/* Progress bar for sets */}
                        <div className="mt-2 h-1.5 bg-zinc-800 rounded-full overflow-hidden flex">
                          {Array.from({ length: ex.totalSets }).map((_, setIdx) => (
                            <div 
                              key={setIdx} 
                              className={`h-full flex-1 ${setIdx > 0 ? 'border-l border-zinc-900' : ''} ${setIdx < ex.completedSets ? 'bg-emerald-500' : 'bg-transparent'}`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-zinc-500">
                  <Activity size={32} className="mx-auto mb-3 opacity-20" />
                  <p className="text-sm">Brak szczegółowych danych o ćwiczeniach dla tej aktywności.</p>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-white/5 shrink-0">
              <button
                onClick={() => setSelectedActivity(null)}
                className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl px-4 py-3 transition-colors"
              >
                Zamknij
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Log Modal */}
      {isManualLogOpen && (
        <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4">
          <div className="bg-zinc-900 rounded-2xl border border-white/10 w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <h3 className="font-bold text-white">Dodaj trening z programu</h3>
              <button onClick={() => setIsManualLogOpen(false)} className="text-zinc-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddManualLog} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Data
                </label>
                <CalendarWidget selectedDate={manualDate} onSelectDate={setManualDate} />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">
                  Etap
                </label>
                <select
                  value={manualStage}
                  onChange={(e) => {
                    setManualStage(Number(e.target.value));
                    setManualLevel(1); // Reset level when stage changes
                  }}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                >
                  {stages.map(s => (
                    <option key={s.id} value={s.id}>Etap {s.id}: {s.title.split(':')[0]}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">
                  Poziom
                </label>
                <select
                  value={manualLevel}
                  onChange={(e) => setManualLevel(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                >
                  {stages.find(s => s.id === manualStage)?.plans.map(p => (
                    <option key={p.level} value={p.level}>Poziom {p.level} ({p.type})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">
                  Czas trwania (minuty)
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={manualDuration}
                  onChange={(e) => setManualDuration(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  placeholder="np. 45"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold rounded-xl px-4 py-3 transition-colors mt-2"
              >
                Zapisz trening
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
