import React, { useRef, useState } from 'react';
import { User, Download, Upload, Trash2, Plus, Minus, Activity, X } from 'lucide-react';
import { stages } from '../data/program';
import { AppState, UserProfile } from '../hooks/useAppState';
import { FitnessTest } from './FitnessTest';
import { View } from '../App';

interface ProfileProps {
  appState: {
    state: AppState;
    updateProfile: (updates: Partial<UserProfile>) => void;
    importData: (data: AppState) => void;
    resetData: () => void;
  };
  onNavigate: (view: View) => void;
}

export function Profile({ appState, onNavigate }: ProfileProps) {
  const { state, updateProfile, importData, resetData } = appState;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isTestOpen, setIsTestOpen] = useState(false);

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "forma2_backup.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data && data.profile && data.history) {
          importData(data);
          alert('Dane zostały pomyślnie wgrane!');
        } else {
          alert('Nieprawidłowy format pliku.');
        }
      } catch (err) {
        alert('Błąd podczas odczytu pliku.');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm('Czy na pewno chcesz zresetować wszystkie postępy? Ta operacja jest nieodwracalna.')) {
      resetData();
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          Profil
        </h1>
      </header>

      <div className="bg-zinc-900 rounded-2xl p-6 border border-white/5 flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center text-emerald-500 shrink-0">
          <User size={32} />
        </div>
        <div className="flex-1">
          <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">
            Twoje Imię
          </label>
          <input
            type="text"
            value={state.profile.name}
            onChange={(e) => updateProfile({ name: e.target.value })}
            className="w-full bg-transparent border-b border-white/10 focus:border-emerald-500 text-xl font-bold text-white py-1 outline-none transition-colors"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Konfiguracja Treningu</h2>
        
        <div className="bg-zinc-900 rounded-2xl p-6 border border-white/5 space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Wybierz Etap
            </label>
            <select
              value={state.profile.currentStageId}
              onChange={(e) => updateProfile({ currentStageId: parseInt(e.target.value), currentLevel: 1 })}
              className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors appearance-none"
            >
              {stages.map(s => (
                <option key={s.id} value={s.id}>{s.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Poziom Planu
            </label>
            <div className="flex bg-zinc-950 rounded-xl p-1 border border-white/10">
              {stages.find(s => s.id === state.profile.currentStageId)?.plans.map(p => p.level).filter((v, i, a) => a.indexOf(v) === i).sort((a, b) => a - b).map(level => (
                <button
                  key={level}
                  onClick={() => updateProfile({ currentLevel: level as 1|2|3 })}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${
                    state.profile.currentLevel === level
                      ? 'bg-zinc-800 text-emerald-500'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {level}. Poziom
                </button>
              ))}
            </div>
            <p className="text-center text-xs text-zinc-500 mt-2">
              {state.profile.currentLevel === 1 && 'Podstawowy (Klasyczny)'}
              {state.profile.currentLevel === 2 && 'Średniozaawansowany (Obwodowy)'}
              {state.profile.currentLevel === 3 && 'Zaawansowany (Serie łączone/Obwodowy)'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Aktualny Tydzień
            </label>
            <div className="flex items-center justify-between bg-zinc-950 border border-white/10 rounded-xl p-2">
              <button
                onClick={() => updateProfile({ currentWeek: Math.max(1, state.profile.currentWeek - 1) })}
                className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
              >
                <Minus size={20} />
              </button>
              <div className="text-center">
                <div className={`text-2xl font-bold ${state.profile.currentWeek % 4 === 0 ? 'text-blue-500' : 'text-white'}`}>
                  {state.profile.currentWeek}
                </div>
                <div className={`text-[10px] font-bold uppercase tracking-wider ${state.profile.currentWeek % 4 === 0 ? 'text-blue-500' : 'text-zinc-500'}`}>
                  Tydzień {state.profile.currentWeek % 4 === 0 && '(Deload)'}
                </div>
              </div>
              <button
                onClick={() => updateProfile({ currentWeek: state.profile.currentWeek + 1 })}
                className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center text-zinc-950 hover:bg-emerald-400 transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Test Sprawności</h2>
        <button
          onClick={() => setIsTestOpen(true)}
          className="w-full bg-zinc-900 rounded-2xl p-4 border border-white/5 hover:bg-zinc-800 transition-colors flex items-center justify-between group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500/10 transition-colors">
              <Activity size={24} />
            </div>
            <div className="text-left">
              <h4 className="font-bold text-white">Wykonaj Test Sprawności</h4>
              <p className="text-xs text-zinc-500">Sprawdź swój poziom i dobierz plan</p>
            </div>
          </div>
        </button>
      </div>

      {isTestOpen && (
        <div className="fixed inset-0 bg-zinc-950 z-[60] overflow-y-auto animate-in slide-in-from-bottom-4 duration-300">
          <div className="sticky top-0 bg-zinc-950/80 backdrop-blur-md p-4 flex justify-end border-b border-white/10 z-10">
            <button onClick={() => setIsTestOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>
          <div className="p-4 md:p-8 max-w-4xl mx-auto">
            <FitnessTest onNavigate={(view) => { setIsTestOpen(false); onNavigate(view); }} />
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Dane i Pamięć</h2>
        
        <div className="bg-zinc-900 rounded-2xl border border-white/5 divide-y divide-white/5">
          <button onClick={handleExport} className="w-full flex items-center justify-between p-4 hover:bg-zinc-800/50 transition-colors text-left group">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-emerald-500 transition-colors">
                <Download size={20} />
              </div>
              <div>
                <h3 className="font-bold text-white">Pobierz Kopię</h3>
                <p className="text-xs text-zinc-500">Zapisz postępy lokalnie</p>
              </div>
            </div>
          </button>

          <button onClick={() => fileInputRef.current?.click()} className="w-full flex items-center justify-between p-4 hover:bg-zinc-800/50 transition-colors text-left group">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-emerald-500 transition-colors">
                <Upload size={20} />
              </div>
              <div>
                <h3 className="font-bold text-white">Wgraj Kopię</h3>
                <p className="text-xs text-zinc-500">Przywróć dane z pliku</p>
              </div>
            </div>
            <input type="file" accept=".json" className="hidden" ref={fileInputRef} onChange={handleImport} />
          </button>

          <button onClick={handleReset} className="w-full flex items-center justify-between p-4 hover:bg-zinc-800/50 transition-colors text-left group">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 group-hover:bg-red-500/20 transition-colors">
                <Trash2 size={20} />
              </div>
              <div>
                <h3 className="font-bold text-red-500">Resetuj Postępy</h3>
                <p className="text-xs text-red-500/70">Ta operacja jest nieodwracalna</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
