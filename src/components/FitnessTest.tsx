import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronRight, Activity } from 'lucide-react';
import { View } from '../App';

interface FitnessTestProps {
  onNavigate: (view: View) => void;
}

export function FitnessTest({ onNavigate }: FitnessTestProps) {
  const [pushups, setPushups] = useState<string>('');
  const [squats, setSquats] = useState<string>('');
  const [plank, setPlank] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const calculateLevel = (p: number, s: number, pl: number) => {
    const getPushupLevel = (val: number) => {
      if (val <= 2) return 1;
      if (val <= 6) return 2;
      if (val <= 12) return 3;
      if (val <= 20) return 4;
      return 5;
    };

    const getSquatLevel = (val: number) => {
      if (val <= 25) return 1;
      if (val <= 45) return 2;
      if (val <= 70) return 3;
      if (val <= 100) return 4;
      return 5;
    };

    const getPlankLevel = (val: number) => {
      if (val <= 30) return 1;
      if (val <= 60) return 2;
      if (val <= 90) return 3;
      if (val <= 120) return 4;
      return 5;
    };

    const l1 = getPushupLevel(p);
    const l2 = getSquatLevel(s);
    const l3 = getPlankLevel(pl);

    // Twój poziom startowy = najniższy wynik z trzech prób.
    return Math.min(l1, l2, l3);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseInt(pushups) || 0;
    const s = parseInt(squats) || 0;
    const pl = parseInt(plank) || 0;
    
    setResult(calculateLevel(p, s, pl));
  };

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          Test Sprawności
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl">
          Zanim wejdziesz w plan treningowy, zrób prosty test startowy.
          Zajmie Ci mniej niż 10 minut.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-2xl p-6 border border-white/5">
            <h2 className="text-xl font-bold text-white mb-4">Zasady testu</h2>
            <ul className="space-y-3 text-zinc-400 text-sm">
              <li className="flex items-start">
                <CheckCircle2 size={18} className="text-emerald-500 mr-3 shrink-0 mt-0.5" />
                <span>Rozgrzej się 2–3 minut (pajacyki, krążenia ramion, kilka przysiadów).</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 size={18} className="text-emerald-500 mr-3 shrink-0 mt-0.5" />
                <span><strong>Pompki klasyczne</strong> – ile zrobisz technicznie poprawnych powtórzeń bez przerwy (jeśli za trudne, licz na kolanach).</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 size={18} className="text-emerald-500 mr-3 shrink-0 mt-0.5" />
                <span><strong>Przysiady klasyczne</strong> – ile zrobisz płynnie w jednym ciągu.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 size={18} className="text-emerald-500 mr-3 shrink-0 mt-0.5" />
                <span><strong>Deska (plank)</strong> – ile sekund utrzymasz pozycję bez utraty techniki.</span>
              </li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="bg-zinc-900 rounded-2xl p-6 border border-white/5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">
                Pompki (ilość powtórzeń)
              </label>
              <input
                type="number"
                min="0"
                required
                value={pushups}
                onChange={(e) => setPushups(e.target.value)}
                className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                placeholder="np. 15"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">
                Przysiady (ilość powtórzeń)
              </label>
              <input
                type="number"
                min="0"
                required
                value={squats}
                onChange={(e) => setSquats(e.target.value)}
                className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                placeholder="np. 40"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">
                Deska / Plank (czas w sekundach)
              </label>
              <input
                type="number"
                min="0"
                required
                value={plank}
                onChange={(e) => setPlank(e.target.value)}
                className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                placeholder="np. 60"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold rounded-xl px-4 py-3 transition-colors mt-4"
            >
              Oblicz mój poziom
            </button>
          </form>
        </div>

        <div>
          {result !== null ? (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-emerald-500 font-bold text-lg mb-2">Twój rekomendowany poziom</h3>
              <div className="text-6xl font-black text-white mb-6">
                Etap {result}
              </div>
              <p className="text-zinc-300 mb-8">
                Zacznij od <strong>Planu treningowego nr 1</strong> w Etapie {result}. 
                Trenuj według planu przez kilka dni, żeby przetestować poziom.
              </p>
              <button
                onClick={() => onNavigate('stages')}
                className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold rounded-xl px-6 py-3 transition-colors"
              >
                Przejdź do planów <ArrowRight size={20} className="ml-2" />
              </button>
            </div>
          ) : (
            <div className="bg-zinc-900/50 border border-white/5 border-dashed rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center text-zinc-500">
              <Activity size={48} className="mb-4 opacity-50" />
              <p>Wprowadź swoje wyniki, aby poznać rekomendowany etap startowy.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
