import { useState, useEffect } from 'react';

export interface UserProfile {
  name: string;
  currentStageId: number;
  currentLevel: number;
  currentWeek: number;
}

export interface CompletedExercise {
  name: string;
  goal: string;
  completedSets: number;
  totalSets: number;
}

export interface ActivityRecord {
  id: string;
  date: string;
  type: 'plan' | 'custom';
  name: string;
  durationMinutes: number;
  stageId?: number;
  level?: number;
  exercises?: CompletedExercise[];
}

export interface AppState {
  profile: UserProfile;
  history: ActivityRecord[];
}

const defaultState: AppState = {
  profile: {
    name: 'Użytkownik',
    currentStageId: 1,
    currentLevel: 1,
    currentWeek: 1,
  },
  history: [],
};

export function useAppState() {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('forma2_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse state', e);
      }
    }
    return defaultState;
  });

  useEffect(() => {
    localStorage.setItem('forma2_state', JSON.stringify(state));
  }, [state]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setState((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...updates },
    }));
  };

  const addActivity = (activity: Omit<ActivityRecord, 'id'>) => {
    const newActivity: ActivityRecord = {
      ...activity,
      id: crypto.randomUUID(),
    };
    setState((prev) => ({
      ...prev,
      history: [newActivity, ...prev.history].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    }));
  };

  const importData = (data: AppState) => {
    setState(data);
  };

  const resetData = () => {
    setState(defaultState);
  };

  return { state, updateProfile, addActivity, importData, resetData };
}
