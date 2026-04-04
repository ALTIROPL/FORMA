import { useState } from 'react';
import { ChevronRight, Dumbbell, Clock, Calendar } from 'lucide-react';
import { stages, Stage, Plan } from '../data/program';
import { PlanView } from './PlanView';

export function StageList() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);

  if (selectedPlan && selectedStage) {
    return (
      <PlanView 
        plan={selectedPlan} 
        stage={selectedStage} 
        onBack={() => setSelectedPlan(null)} 
      />
    );
  }

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          Plany Treningowe
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl">
          Wybierz etap dopasowany do Twojego poziomu. Każdy etap zawiera plany treningowe o rosnącym stopniu trudności.
        </p>
      </header>

      <div className="space-y-6">
        {stages.map((stage) => (
          <div key={stage.id} className="bg-zinc-900 rounded-2xl border border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5 bg-zinc-900/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-emerald-500 font-bold tracking-wider text-sm uppercase">
                  Etap {stage.id}
                </span>
                <span className="text-zinc-500 text-sm flex items-center">
                  <Clock size={14} className="mr-1" /> {stage.duration}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white">{stage.title}</h2>
              <p className="text-zinc-400 text-sm mt-1">{stage.goal}</p>
            </div>
            
            <div className="divide-y divide-white/5">
              {stage.plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => {
                    setSelectedStage(stage);
                    setSelectedPlan(plan);
                  }}
                  className="w-full flex items-center justify-between p-4 hover:bg-zinc-800/50 transition-colors group text-left"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-emerald-500/10 group-hover:text-emerald-500 transition-colors">
                      <Dumbbell size={18} />
                    </div>
                    <div>
                      <h3 className="font-medium text-zinc-200 group-hover:text-white transition-colors">
                        Poziom {plan.level}
                      </h3>
                      <div className="flex items-center text-xs text-zinc-500 mt-1 space-x-3">
                        <span className="flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                          {plan.type}
                        </span>
                        <span className="flex items-center">
                          <Clock size={12} className="mr-1" />
                          {plan.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-zinc-600 group-hover:text-emerald-500 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
