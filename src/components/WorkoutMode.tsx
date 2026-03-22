import { useState, useEffect } from 'react';
import { X, Clock, Dumbbell, Zap, Save, Check } from 'lucide-react';
import { Plan, Stage } from '../data/program';
import { CompletedExercise } from '../hooks/useAppState';

interface WorkoutModeProps {
  plan: Plan;
  stage: Stage;
  onFinish: (durationMinutes: number, exercises: CompletedExercise[]) => void;
  onCancel: () => void;
}

export function WorkoutMode({ plan, stage, onFinish, onCancel }: WorkoutModeProps) {
  const [startTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [completedSets, setCompletedSets] = useState<Set<string>>(new Set());
  const [customGoals, setCustomGoals] = useState<Record<number, string>>({});
  const [editingGoalIndex, setEditingGoalIndex] = useState<number | null>(null);
  const [tempGoal, setTempGoal] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // Calculate total sets
  let totalSets = 0;
  const parsedSets = plan.exercises.map(ex => {
    const sets = parseInt(ex.sets) || 1;
    totalSets += sets;
    return sets;
  });

  const progress = totalSets === 0 ? 0 : Math.round((completedSets.size / totalSets) * 100);

  const toggleSet = (exIndex: number, setIndex: number) => {
    const key = `${exIndex}-${setIndex}`;
    const newSets = new Set(completedSets);
    if (newSets.has(key)) {
      newSets.delete(key);
    } else {
      newSets.add(key);
    }
    setCompletedSets(newSets);
  };

  const startEditingGoal = (index: number, currentGoal: string) => {
    setEditingGoalIndex(index);
    setTempGoal(customGoals[index] || currentGoal);
  };

  const saveGoal = (index: number) => {
    if (tempGoal.trim()) {
      setCustomGoals(prev => ({ ...prev, [index]: tempGoal.trim() }));
    }
    setEditingGoalIndex(null);
  };

  const handleFinish = () => {
    const exercisesData: CompletedExercise[] = plan.exercises.map((ex, index) => {
      const setsCount = parsedSets[index];
      let completed = 0;
      for (let i = 0; i < setsCount; i++) {
        if (completedSets.has(`${index}-${i}`)) {
          completed++;
        }
      }
      return {
        name: ex.name,
        goal: customGoals[index] || ex.reps,
        completedSets: completed,
        totalSets: setsCount
      };
    });
    onFinish(Math.max(1, Math.floor(elapsed / 60)), exercisesData);
  };

  return (
    <div className="fixed inset-0 bg-zinc-950 z-50 flex flex-col animate-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-white/10 bg-zinc-900">
        <button onClick={onCancel} className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
          <X size={20} />
        </button>
        <h2 className="text-lg font-bold text-white">Tryb Treningowy</h2>
        <div className="w-10"></div>
      </header>

      {/* Progress Info */}
      <div className="p-4 bg-zinc-900 border-b border-white/5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">Dzień {new Date().getDay() || 7}: Siła</h3>
            <p className="text-xs text-zinc-400 uppercase tracking-wider mt-1">PLAN: {plan.type}</p>
          </div>
          <div className="flex items-center text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-lg font-mono font-bold">
            <Clock size={16} className="mr-2" />
            {formatTime(elapsed)}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-zinc-500 uppercase">
            <span>Postęp treningu</span>
            <span className="text-emerald-500">{progress}%</span>
          </div>
          <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      {/* Exercises List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {plan.exercises.map((ex, exIndex) => {
          const setsCount = parsedSets[exIndex];
          const currentGoal = customGoals[exIndex] || ex.reps;
          
          return (
            <div key={exIndex} className="bg-zinc-900 rounded-2xl p-4 border border-white/5">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1 mr-4">
                  <h4 className="font-bold text-white text-lg">{ex.name}</h4>
                  <div className="flex items-center mt-2 space-x-2 flex-wrap gap-y-2">
                    {editingGoalIndex === exIndex ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={tempGoal}
                          onChange={(e) => setTempGoal(e.target.value)}
                          className="bg-zinc-950 border border-emerald-500/50 rounded px-2 py-1 text-xs text-white focus:outline-none w-24"
                          autoFocus
                          onKeyDown={(e) => e.key === 'Enter' && saveGoal(exIndex)}
                        />
                        <button 
                          onClick={() => saveGoal(exIndex)}
                          className="text-emerald-500 hover:text-emerald-400 bg-emerald-500/10 p-1 rounded"
                        >
                          <Check size={14} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="flex items-center text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">
                          <Zap size={12} className="mr-1" /> Cel: {currentGoal}
                        </span>
                        <button 
                          onClick={() => startEditingGoal(exIndex, currentGoal)}
                          className="text-xs text-zinc-500 border border-zinc-700 px-2 py-1 rounded hover:text-zinc-300 transition-colors"
                        >
                          ✎ Edytuj cel
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-500 shrink-0">
                  <Dumbbell size={24} />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-xs font-bold text-zinc-500 uppercase">Serie ({setsCount})</div>
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: setsCount }).map((_, setIndex) => {
                    const isDone = completedSets.has(`${exIndex}-${setIndex}`);
                    return (
                      <button
                        key={setIndex}
                        onClick={() => toggleSet(exIndex, setIndex)}
                        className={`py-3 rounded-xl font-bold transition-colors ${
                          isDone 
                            ? 'bg-emerald-500 text-zinc-950' 
                            : 'bg-zinc-950 border border-white/10 text-zinc-400 hover:border-emerald-500/50'
                        }`}
                      >
                        {setIndex + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 bg-zinc-900 border-t border-white/10">
        <button
          onClick={handleFinish}
          disabled={completedSets.size === 0}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center ${
            completedSets.size > 0
              ? 'bg-emerald-500 text-zinc-950 hover:bg-emerald-600'
              : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
          }`}
        >
          <Save size={20} className="mr-2" /> ZAPISZ TRENING
        </button>
      </div>
    </div>
  );
}
