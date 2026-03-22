import { useState } from 'react';
import { ArrowRight, Activity, Calendar, Zap, Plus, Play, X } from 'lucide-react';
import { View } from '../App';
import { AppState, ActivityRecord } from '../hooks/useAppState';
import { stages } from '../data/program';

interface DashboardProps {
  onNavigate: (view: View) => void;
  appState: {
    state: AppState;
    addActivity: (activity: Omit<ActivityRecord, 'id'>) => void;
  };
}

export function Dashboard({ onNavigate, appState }: DashboardProps) {
  const { profile } = appState.state;
  const currentStage = stages.find(s => s.id === profile.currentStageId);
  const currentPlan = currentStage?.plans.find(p => p.level === profile.currentLevel);

  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  
  const [customName, setCustomName] = useState('');
  const [customDuration, setCustomDuration] = useState('30');

  const [workoutStartTime, setWorkoutStartTime] = useState<number | null>(null);

  const handleStartWorkout = () => {
    setWorkoutStartTime(Date.now());
    setIsWorkoutActive(true);
  };

  const handleFinishWorkout = () => {
    if (!workoutStartTime || !currentPlan || !currentStage) return;
    const durationMs = Date.now() - workoutStartTime;
    const durationMinutes = Math.max(1, Math.round(durationMs / 60000));
    
    appState.addActivity({
      date: new Date().toISOString(),
      type: 'plan',
      name: `Etap ${currentStage.id}: Poziom ${currentPlan.level}`,
      durationMinutes,
      stageId: currentStage.id,
      level: currentPlan.level
    });
    
    setIsWorkoutActive(false);
    setWorkoutStartTime(null);
    alert(`Trening zakończony! Czas: ${durationMinutes} min.`);
  };

  const handleAddCustomActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    
    appState.addActivity({
      date: new Date().toISOString(),
      type: 'custom',
      name: customName,
      durationMinutes: parseInt(customDuration) || 30,
    });
    
    setIsAddActivityOpen(false);
    setCustomName('');
    setCustomDuration('30');
  };

  if (isWorkoutActive && currentPlan && currentStage) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-zinc-900 rounded-2xl p-8 border border-emerald-500/30 text-center space-y-6">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <Activity size={40} className="text-emerald-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Trening w toku</h2>
            <p className="text-emerald-500 font-medium">Etap {currentStage.id} • Poziom {currentPlan.level}</p>
          </div>
          
          <div className="text-left bg-zinc-950 rounded-xl p-4 border border-white/5 max-h-64 overflow-y-auto">
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-3">Lista ćwiczeń</h3>
            <ul className="space-y-3">
              {currentPlan.exercises.map((ex, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-emerald-500 font-mono text-xs mr-2 mt-0.5">{ex.id}.</span>
                  <div>
                    <p className="text-white text-sm">{ex.name}</p>
                    <p className="text-zinc-500 text-xs">{ex.sets} serie × {ex.reps} | Przerwa: {ex.rest}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={handleFinishWorkout}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold rounded-xl px-6 py-4 transition-colors text-lg"
          >
            Zakończ Trening
          </button>
          <button
            onClick={() => setIsWorkoutActive(false)}
            className="text-zinc-500 hover:text-white text-sm"
          >
            Anuluj
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Witaj, <span className="text-emerald-500">{profile.name}</span>
          </h1>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-zinc-900 rounded-2xl p-4 md:p-6 border border-white/5 relative overflow-hidden">
          <Zap size={100} className="absolute -right-4 -top-4 text-white/5" />
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Aktualny Etap</h3>
          <div className="text-lg md:text-xl font-bold text-white mb-2 leading-tight">
            {currentStage?.title.split(':')[0] || 'Wprowadzenie i Fundamenty'}
          </div>
          <div className="flex items-center text-emerald-500 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
            Etap {profile.currentStageId}
          </div>
        </div>
        <div className="bg-zinc-900 rounded-2xl p-4 md:p-6 border border-white/5 relative overflow-hidden">
          <Calendar size={100} className="absolute -right-4 -top-4 text-white/5" />
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Tydzień {profile.currentWeek}</h3>
          <div className="text-lg md:text-xl font-bold text-emerald-500 mb-2 leading-tight">
            BUDOWANIE FORMY
          </div>
          <div className="text-zinc-400 text-sm">
            Cykl 1
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Dzisiejszy plan</h2>
          <span className="bg-emerald-500/10 text-emerald-500 text-xs font-bold px-2 py-1 rounded border border-emerald-500/20">DZIŚ</span>
        </div>
        
        <div className="bg-zinc-900 rounded-2xl p-6 border border-white/5">
          <div className="inline-block bg-emerald-500 text-zinc-950 text-xs font-bold px-2 py-1 rounded mb-4">
            SIŁA
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Etap {profile.currentStageId}: Poziom {profile.currentLevel} ({currentPlan?.type})
          </h3>
          <p className="text-zinc-400 text-sm mb-6 line-clamp-1">
            {currentPlan?.exercises.map(e => e.name).join(', ')}...
          </p>

          <div className="space-y-3 mb-6">
            {currentPlan?.exercises.slice(0, 3).map((ex, i) => (
              <div key={i} className="flex items-center text-sm">
                <div className="w-6 h-6 rounded border border-white/10 flex items-center justify-center text-emerald-500 font-mono text-xs mr-3 shrink-0 bg-zinc-950">
                  {i + 1}
                </div>
                <span className="text-zinc-200 font-medium truncate">{ex.name}</span>
              </div>
            ))}
            {currentPlan && currentPlan.exercises.length > 3 && (
              <div className="text-xs text-zinc-500 pl-9">
                + {currentPlan.exercises.length - 3} zobacz pozostałe...
              </div>
            )}
          </div>

          <button
            onClick={handleStartWorkout}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold rounded-xl px-4 py-4 transition-colors flex items-center justify-center"
          >
            <Play size={20} className="mr-2 fill-current" /> ROZPOCZNIJ TRENING
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Szybkie Akcje</h2>
        <button
          onClick={() => setIsAddActivityOpen(true)}
          className="w-full bg-zinc-900 rounded-2xl p-4 border border-white/5 hover:bg-zinc-800 transition-colors flex items-center justify-between group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500/10 transition-colors">
              <Plus size={24} />
            </div>
            <div className="text-left">
              <h4 className="font-bold text-white">Dodaj Aktywność</h4>
              <p className="text-xs text-zinc-500">Bieganie, Piłka, Rower...</p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
            <ArrowRight size={16} />
          </div>
        </button>
      </div>

      {/* Add Activity Modal */}
      {isAddActivityOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 rounded-2xl border border-white/10 w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <h3 className="font-bold text-white">Dodaj własną aktywność</h3>
              <button onClick={() => setIsAddActivityOpen(false)} className="text-zinc-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddCustomActivity} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">
                  Nazwa aktywności
                </label>
                <input
                  type="text"
                  required
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  placeholder="np. Bieganie 5km"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">
                  Czas trwania (minuty)
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={customDuration}
                  onChange={(e) => setCustomDuration(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  placeholder="np. 45"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold rounded-xl px-4 py-3 transition-colors mt-2"
              >
                Zapisz aktywność
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
