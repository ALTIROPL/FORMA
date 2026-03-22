import { useState } from 'react';
import { ArrowRight, Activity, Calendar, Zap, Plus, Play, X } from 'lucide-react';
import { View } from '../App';
import { AppState, ActivityRecord, CompletedExercise } from '../hooks/useAppState';
import { stages } from '../data/program';
import { WorkoutMode } from './WorkoutMode';
import { CalendarWidget } from './CalendarWidget';

interface DashboardProps {
  onNavigate: (view: View) => void;
  appState: {
    state: AppState;
    addActivity: (activity: Omit<ActivityRecord, 'id'>) => void;
    updateProfile: (updates: Partial<AppState['profile']>) => void;
  };
}

export function Dashboard({ onNavigate, appState }: DashboardProps) {
  const { profile } = appState.state;
  const currentStage = stages.find(s => s.id === profile.currentStageId);
  const currentPlan = currentStage?.plans.find(p => p.level === profile.currentLevel);

  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [isFinishWeekOpen, setIsFinishWeekOpen] = useState(false);
  const [postWorkoutData, setPostWorkoutData] = useState<{duration: number, exercises?: CompletedExercise[]} | null>(null);
  
  const [customName, setCustomName] = useState('');
  const [customDuration, setCustomDuration] = useState('30');
  const [customDate, setCustomDate] = useState(new Date().toISOString().split('T')[0]);

  const handleStartWorkout = () => {
    setIsWorkoutActive(true);
  };

  const handleFinishWorkout = (durationMinutes: number, exercises?: CompletedExercise[]) => {
    if (!currentPlan || !currentStage) return;
    
    appState.addActivity({
      date: new Date().toISOString(),
      type: 'plan',
      name: `Etap ${currentStage.id}: Poziom ${currentPlan.level}`,
      durationMinutes,
      stageId: currentStage.id,
      level: currentPlan.level,
      exercises
    });
    
    setIsWorkoutActive(false);
    setPostWorkoutData({ duration: durationMinutes, exercises });
  };

  const handleAddCustomActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    
    // Create date with current time to ensure proper sorting
    const now = new Date();
    const [year, month, day] = customDate.split('-');
    const activityDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), now.getHours(), now.getMinutes(), now.getSeconds());
    
    appState.addActivity({
      date: activityDate.toISOString(),
      type: 'custom',
      name: customName,
      durationMinutes: parseInt(customDuration) || 30,
    });
    
    setIsAddActivityOpen(false);
    setCustomName('');
    setCustomDuration('30');
    setCustomDate(new Date().toISOString().split('T')[0]);
  };

  if (isWorkoutActive && currentPlan && currentStage) {
    return (
      <WorkoutMode
        plan={currentPlan}
        stage={currentStage}
        onFinish={handleFinishWorkout}
        onCancel={() => setIsWorkoutActive(false)}
      />
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
        <div className="bg-zinc-900 rounded-2xl p-4 md:p-6 border border-white/5 relative overflow-hidden flex flex-col justify-between">
          <div>
            <Calendar size={100} className="absolute -right-4 -top-4 text-white/5" />
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Tydzień {profile.currentWeek}</h3>
            <div className="text-lg md:text-xl font-bold text-emerald-500 mb-2 leading-tight">
              BUDOWANIE FORMY
            </div>
            <div className="text-zinc-400 text-sm">
              Cykl {Math.ceil(profile.currentWeek / 4)}
            </div>
          </div>
          <button
            onClick={() => setIsFinishWeekOpen(true)}
            className="mt-4 w-full bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold py-2 rounded-lg transition-colors z-10 relative"
          >
            ZAKOŃCZ TYDZIEŃ
          </button>
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
            {currentPlan?.exercises.map((ex, i) => (
              <div key={i} className="flex items-center text-sm">
                <div className="w-6 h-6 rounded border border-white/10 flex items-center justify-center text-emerald-500 font-mono text-xs mr-3 shrink-0 bg-zinc-950">
                  {i + 1}
                </div>
                <span className="text-zinc-200 font-medium">{ex.name}</span>
              </div>
            ))}
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
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Data
                </label>
                <CalendarWidget selectedDate={customDate} onSelectDate={setCustomDate} />
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

      {/* Post Workout Modal */}
      {postWorkoutData && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 rounded-2xl border border-white/10 w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 text-center border-b border-white/5">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Świetna robota!</h3>
              <p className="text-zinc-400">
                Trening ukończony w {postWorkoutData.duration} minut. Jak oceniasz dzisiejszy wysiłek?
              </p>
            </div>
            
            <div className="p-6 space-y-3">
              <button
                onClick={() => {
                  if (profile.currentLevel < 3) {
                    appState.updateProfile({ currentLevel: profile.currentLevel + 1 });
                  } else if (profile.currentStageId < stages.length) {
                    appState.updateProfile({ currentStageId: profile.currentStageId + 1, currentLevel: 1 });
                  }
                  setPostWorkoutData(null);
                }}
                className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl px-4 py-4 transition-colors flex flex-col items-center"
              >
                <span className="font-bold text-emerald-500">Zbyt łatwy</span>
                <span className="text-xs text-zinc-400 mt-1">Zwiększ poziom trudności na kolejny trening</span>
              </button>
              
              <button
                onClick={() => setPostWorkoutData(null)}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold rounded-xl px-4 py-4 transition-colors"
              >
                Odpowiedni (Zostaw bez zmian)
              </button>
              
              <button
                onClick={() => {
                  if (profile.currentLevel > 1) {
                    appState.updateProfile({ currentLevel: profile.currentLevel - 1 });
                  }
                  setPostWorkoutData(null);
                }}
                className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl px-4 py-4 transition-colors flex flex-col items-center"
              >
                <span className="font-bold text-red-500">Zbyt trudny</span>
                <span className="text-xs text-zinc-400 mt-1">Zmniejsz poziom trudności na kolejny trening</span>
              </button>
            </div>

            <div className="px-6 pb-2">
              <div className="p-4 bg-zinc-950 rounded-xl border border-white/5 text-sm text-zinc-400">
                <span className="text-emerald-500 font-bold">Wskazówka:</span> Jeśli trenujesz na tym poziomie już 2-3 tygodnie, rozważ zwiększenie poziomu lub przejście do kolejnego etapu.
              </div>
            </div>

            {profile.currentWeek >= 4 && profile.currentWeek % 4 === 0 && (
              <div className="px-6 pb-2">
                <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                  <h4 className="font-bold text-blue-400 mb-2 flex items-center">
                    <Activity size={18} className="mr-2" />
                    Czas na DELOAD?
                  </h4>
                  <p className="text-sm text-blue-200/70">
                    Trenujesz już {profile.currentWeek} tydzień. Zgodnie z bazą wiedzy, zalecamy wykonanie tygodnia DELOAD (zmniejszenie objętości o 50% lub lżejsze treningi), aby organizm mógł się zregenerować przed kolejnym blokiem.
                  </p>
                </div>
              </div>
            )}
            
            <div className="p-4 border-t border-white/5">
              <button
                onClick={() => setPostWorkoutData(null)}
                className="w-full text-zinc-500 hover:text-white text-sm font-medium transition-colors"
              >
                Pomiń
              </button>
            </div>
          </div>
        </div>
      )}
      {isFinishWeekOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 rounded-2xl w-full max-w-md border border-white/10 overflow-hidden">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar size={32} className="text-emerald-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Tydzień {profile.currentWeek} zakończony!
              </h2>
              <p className="text-zinc-400 mb-6">
                Gratulacje! Zakończyłeś kolejny tydzień treningów.
              </p>

              {profile.currentWeek % 4 === 3 && (
                <div className="mb-6 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 text-left">
                  <h4 className="font-bold text-blue-400 mb-2 flex items-center">
                    <Activity size={18} className="mr-2" />
                    Zbliża się DELOAD
                  </h4>
                  <p className="text-sm text-blue-200/70">
                    Kolejny tydzień to Twój 4. tydzień w tym bloku. Zgodnie z bazą wiedzy, zalecamy wykonanie tygodnia DELOAD (zmniejszenie objętości o 50% lub lżejsze treningi), aby organizm mógł się zregenerować.
                  </p>
                </div>
              )}

              {profile.currentWeek % 4 === 0 && (
                <div className="mb-6 p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-left">
                  <h4 className="font-bold text-emerald-500 mb-2 flex items-center">
                    <Zap size={18} className="mr-2" />
                    Nowy Cykl Treningowy
                  </h4>
                  <p className="text-sm text-emerald-200/70">
                    Zakończyłeś tydzień DELOAD. Czas rozpocząć nowy cykl! Możesz teraz zwiększyć poziom trudności lub przejść do kolejnego etapu.
                  </p>
                </div>
              )}

              {(profile.currentWeek % 4 === 1 || profile.currentWeek % 4 === 2) && (
                <div className="mb-6 p-4 bg-zinc-950 rounded-xl border border-white/5 text-left">
                  <h4 className="font-bold text-emerald-500 mb-2 flex items-center">
                    <Zap size={18} className="mr-2" />
                    Czas na progres?
                  </h4>
                  <p className="text-sm text-zinc-400">
                    Zakończyłeś {profile.currentWeek % 4 === 1 ? '1.' : '2.'} tydzień w tym cyklu. Jeśli czujesz, że treningi są zbyt łatwe, rozważ zwiększenie poziomu trudności w kolejnym tygodniu.
                  </p>
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={() => setIsFinishWeekOpen(false)}
                  className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 rounded-xl transition-colors"
                >
                  Anuluj
                </button>
                <button
                  onClick={() => {
                    appState.updateProfile({ currentWeek: profile.currentWeek + 1 });
                    setIsFinishWeekOpen(false);
                  }}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold py-3 rounded-xl transition-colors"
                >
                  Rozpocznij Tydzień {profile.currentWeek + 1}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
