import { ArrowLeft, Calendar, Clock, Info, Dumbbell } from 'lucide-react';
import { Plan, Stage } from '../data/program';

interface PlanViewProps {
  plan: Plan;
  stage: Stage;
  onBack: () => void;
}

export function PlanView({ plan, stage, onBack }: PlanViewProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button
        onClick={onBack}
        className="flex items-center text-zinc-400 hover:text-white transition-colors text-sm font-medium"
      >
        <ArrowLeft size={16} className="mr-2" /> Wróć do listy planów
      </button>

      <header className="space-y-4">
        <div className="flex items-center space-x-2 text-emerald-500 font-bold tracking-wider text-sm uppercase">
          <span>Etap {stage.id}</span>
          <span className="text-zinc-600">•</span>
          <span>Poziom {plan.level}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          {stage.title}
        </h1>
        
        <div className="flex flex-wrap gap-4 pt-2">
          <div className="flex items-center bg-zinc-900 border border-white/5 rounded-full px-4 py-2 text-sm text-zinc-300">
            <Dumbbell size={16} className="text-emerald-500 mr-2" />
            {plan.type}
          </div>
          <div className="flex items-center bg-zinc-900 border border-white/5 rounded-full px-4 py-2 text-sm text-zinc-300">
            <Clock size={16} className="text-emerald-500 mr-2" />
            {plan.duration}
          </div>
          <div className="flex items-center bg-zinc-900 border border-white/5 rounded-full px-4 py-2 text-sm text-zinc-300">
            <Calendar size={16} className="text-emerald-500 mr-2" />
            {plan.schedule}
          </div>
        </div>
      </header>

      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 md:p-6 flex items-start space-x-4">
        <Info size={24} className="text-emerald-500 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-emerald-500 font-bold mb-1">Założenia treningowe:</h3>
          <p className="text-zinc-300 text-sm leading-relaxed">
            {plan.type.includes('awaryjny') && 'Wykonuj ćwiczenia po kolei. Staraj się utrzymać tempo.'}
            {plan.type.includes('wyjazdowy') && 'Wykonuj 3-4 rundy. Jedna runda to wykonanie wszystkich ćwiczeń jedno po drugim. Pracujesz nie na liczbę powtórzeń, ale na liczbę sekund: 45 sekund pracy w danym ćwiczeniu. Po zakończeniu robisz kolejne. Przerwy między ćwiczeniami: 15 sekund. Główna przerwa: 60 sekund po każdej rundzie.'}
            {!plan.type.includes('awaryjny') && !plan.type.includes('wyjazdowy') && 'Zacznij od ćwiczenia numer 1 i przejdź do kolejnego, gdy zrobisz pełną liczbę serii.'}
          </p>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-zinc-900/50 border-b border-white/5 text-zinc-400">
              <tr>
                <th className="px-6 py-4 font-medium">Ćwiczenie</th>
                <th className="px-6 py-4 font-medium w-24">Serie</th>
                <th className="px-6 py-4 font-medium w-32">Powtórzenia</th>
                <th className="px-6 py-4 font-medium w-32">Przerwa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {plan.exercises.map((ex, index) => {
                const isSupersetItem = ex.isSuperset;
                const isSecondOfSuperset = isSupersetItem && ex.id.includes('a');
                
                return (
                  <tr 
                    key={index} 
                    className={`
                      hover:bg-zinc-800/30 transition-colors
                      ${isSupersetItem ? (isSecondOfSuperset ? 'bg-zinc-900/30' : 'border-b-0') : ''}
                    `}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className={`
                          font-mono text-xs font-bold mr-3 w-6 text-center
                          ${isSecondOfSuperset ? 'text-emerald-500' : 'text-zinc-500'}
                        `}>
                          {ex.id}.
                        </span>
                        <span className={`
                          ${isSecondOfSuperset ? 'text-zinc-300' : 'text-zinc-100 font-medium'}
                        `}>
                          {ex.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-300 font-mono">{ex.sets}</td>
                    <td className="px-6 py-4 text-zinc-300 font-mono">{ex.reps}</td>
                    <td className="px-6 py-4 text-zinc-400 font-mono">{ex.rest}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
