export type Exercise = {
  id: string;
  name: string;
  sets: string;
  reps: string;
  rest: string;
  isSuperset?: boolean;
  supersetId?: string;
};

export type Plan = {
  id: string;
  level: number;
  type: string;
  duration: string;
  schedule: string;
  exercises: Exercise[];
};

export type Stage = {
  id: number;
  title: string;
  goal: string;
  duration: string;
  plans: Plan[];
};

export const specialPlans: Plan[] = [
  {
    id: 'awaryjny',
    level: 0,
    type: 'Trening awaryjny (do 20 minut)',
    duration: 'do 20 min',
    schedule: 'W sytuacjach awaryjnych',
    exercises: [
      { id: '1', name: 'Pajacyki', sets: '1', reps: '30s', rest: '20-30s' },
      { id: '2', name: 'Bieg bokserski', sets: '1', reps: '30s', rest: '60s' },
      { id: '3', name: 'Pompki klasyczne', sets: '3', reps: '12-20', rest: '45-60s' },
      { id: '4', name: 'Przysiady klasyczne', sets: '3', reps: '20', rest: '45-60s' },
      { id: '5', name: 'Wykroki chodzone/ w miejscu', sets: '3', reps: '10/strona', rest: '45-60s' },
      { id: '6', name: 'Deska (plank)', sets: '3', reps: '30-45s', rest: '40-60s' },
      { id: '7', name: '„Superman” naprzemienny', sets: '3', reps: '12', rest: '40-60s' }
    ]
  },
  {
    id: 'wyjazdowy',
    level: 0,
    type: 'Trening wyjazdowy (do 25 minut)',
    duration: 'do 25 min',
    schedule: 'W podróży',
    exercises: [
      { id: '1', name: 'Walk Down z klęku do podporu (schodzenie rękami do przodu)', sets: '3-4', reps: '45s', rest: '15s' },
      { id: '2', name: 'Pompki – mieszaj wariant: klasyczne, szerokie, diamentowe, tricepsowe', sets: '3-4', reps: '45s', rest: '15s' },
      { id: '3', name: 'Przysiady dynamiczne', sets: '3-4', reps: '45s', rest: '15s' },
      { id: '4', name: 'Mountain Climbers wolne (kontrola bioder)', sets: '3-4', reps: '45s', rest: '15s' },
      { id: '5', name: 'Zakroki naprzemienne', sets: '3-4', reps: '45s', rest: '15s' },
      { id: '6', name: 'Deska (plank)', sets: '3-4', reps: '45s', rest: '60s' }
    ]
  }
];

export const stages: Stage[] = [
  {
    id: 1,
    title: 'Etap 1',
    goal: 'Wprowadzenie do ruchu, fundamenty siły',
    duration: 'ok. 3–4 tyg.',
    plans: [
      {
        id: '1-1',
        level: 1,
        type: 'Trening A',
        duration: '18-22 min',
        schedule: '3 treningi w tygodniu (rotacja z treningiem B: A/B/A → B/A/B)',
        exercises: [
          { id: '1', name: 'Pajacyki', sets: '1', reps: '40s', rest: 'brak' },
          { id: '2', name: 'Wrist Lean Stretch (przód + tył)', sets: '2', reps: '20s+20s', rest: '15s' },
          { id: '3', name: 'Scapular Plank Rotations', sets: '2', reps: '10', rest: '30s' },
          { id: '4', name: 'Pompki na kolanach / negatywy', sets: '3', reps: '6-10', rest: '60s' },
          { id: '5', name: 'Przysiady klasyczne / na krześle', sets: '3', reps: '10-12', rest: '60s' },
          { id: '6', name: 'Glute Bridge', sets: '3', reps: '10-14', rest: '45s' },
          { id: '7', name: 'Deska / deska na kolanach', sets: '3', reps: '20-30s', rest: '45s' }
        ]
      },
      {
        id: '1-2',
        level: 2,
        type: 'Trening B',
        duration: '18-22 min',
        schedule: '3 treningi w tygodniu (rotacja z treningiem A: A/B/A → B/A/B)',
        exercises: [
          { id: '1', name: 'Bieg bokserski', sets: '1', reps: '40s', rest: 'brak' },
          { id: '2', name: 'Wrist Lean Stretch (przód + tył)', sets: '2', reps: '20s+20s', rest: '15s' },
          { id: '3', name: 'Klepnięcia w ramię (Shoulder Taps)', sets: '2', reps: '10/strona', rest: '20s' },
          { id: '4', name: 'Pompki przy podwyższeniu', sets: '3', reps: '8-12', rest: '60s' },
          { id: '5', name: 'Przysiad z tempem 2-2-1-0', sets: '3', reps: '8-10', rest: '60s' },
          { id: '6', name: 'Glute Bridge z pauzą', sets: '3', reps: '12-15', rest: '45s' },
          { id: '7', name: 'Bird-Dog', sets: '2', reps: '8/strona', rest: '45s' }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Etap 2',
    goal: 'Budowanie siły podstawowej i wytrzymałości',
    duration: 'ok. 3–4 tyg.',
    plans: [
      {
        id: '2-1',
        level: 1,
        type: 'Trening A',
        duration: '23-26 min',
        schedule: '3 treningi w tygodniu (rotacja z treningiem B: A/B/A → B/A/B)',
        exercises: [
          { id: '1', name: 'Pajacyki', sets: '1', reps: '60s', rest: 'brak' },
          { id: '2', name: 'Klepnięcia w ramię (Shoulder Taps)', sets: '2', reps: '14/strona', rest: '20s' },
          { id: '3', name: 'Pompki klasyczne / negatyw z wyjściem z kolan', sets: '3', reps: '6-10', rest: '90s' },
          { id: '4', name: 'Przysiady z pauzą', sets: '3', reps: '8-10', rest: '60s' },
          { id: '5', name: 'Glute Bridge March', sets: '3', reps: '25s', rest: '60s' },
          { id: '6', name: 'Hollow Hold', sets: '3', reps: '20s', rest: '45s' },
          { id: '7', name: 'Side Plank', sets: '3', reps: '15/strona', rest: '45s' }
        ]
      },
      {
        id: '2-2',
        level: 2,
        type: 'Trening B',
        duration: '24-27 min',
        schedule: '3 treningi w tygodniu (rotacja z treningiem A: A/B/A → B/A/B)',
        exercises: [
          { id: '1', name: 'Pajacyki', sets: '1', reps: '40s', rest: 'brak' },
          { id: '2', name: 'Klepnięcia w ramię (Shoulder Taps)', sets: '2', reps: '10/strona', rest: '20s' },
          { id: '3', name: 'Pompki szerokie', sets: '3', reps: '6-10', rest: '90s' },
          { id: '4', name: 'Weight Shift Push-Up', sets: '2', reps: '5/strona', rest: '45s' },
          { id: '5', name: 'Split Squat (statyczny)', sets: '3', reps: '10/strona', rest: '60s' },
          { id: '6', name: 'Glute Bridge', sets: '3', reps: '14-20', rest: '45s' },
          { id: '7', name: 'Mountain Climbers (wolne)', sets: '3', reps: '20', rest: '45s' },
          { id: '8', name: 'Superman Hold', sets: '3', reps: '20s', rest: '45s' }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Etap 3',
    goal: 'Progresja siły i ruchy złożone',
    duration: 'ok. 3–4 tyg.',
    plans: [
      {
        id: '3-1',
        level: 1,
        type: 'Trening A',
        duration: '26-28 min',
        schedule: '3 treningi w tygodniu (wykonuj po kolei trening A/B/C)',
        exercises: [
          { id: '1', name: 'Pajacyki', sets: '2', reps: '40s', rest: '20s' },
          { id: '2', name: 'Bear Crab', sets: '3', reps: '15s', rest: '30s' },
          { id: '3', name: 'Pompki klasyczne', sets: '4', reps: '8-14', rest: '60-90s' },
          { id: '4', name: 'Przysiady klasyczne', sets: '3', reps: '15-20', rest: '60s' },
          { id: '5', name: 'Hollow Rocks', sets: '3', reps: '10-15', rest: '45s' },
          { id: '6', name: 'Plank Reach', sets: '3', reps: '8/strona', rest: '45s' },
          { id: '7', name: 'Bear Walk', sets: '3', reps: '10 kroków', rest: '60s' }
        ]
      },
      {
        id: '3-2',
        level: 2,
        type: 'Trening B',
        duration: '25-27 min',
        schedule: '3 treningi w tygodniu (wykonuj po kolei trening A/B/C)',
        exercises: [
          { id: '1', name: 'Pajacyki', sets: '2', reps: '40s', rest: '20s' },
          { id: '2', name: 'Crab Walk', sets: '3', reps: '15s', rest: '30s' },
          { id: '3', name: 'Pompki z pauzą 1s', sets: '4', reps: '6-10', rest: '90s' },
          { id: '4', name: 'Przysiady sumo', sets: '3', reps: '10-16', rest: '60s' },
          { id: '5', name: 'Glute Bridge March', sets: '3', reps: '10/strona', rest: '45s' },
          { id: '6', name: 'Side Plank Rotacja', sets: '3', reps: '10/strona', rest: '45s' },
          { id: '7', name: 'Crab Reach', sets: '3', reps: '8/strona', rest: '60s' }
        ]
      },
      {
        id: '3-3',
        level: 3,
        type: 'Trening C',
        duration: '27-29 min',
        schedule: '3 treningi w tygodniu (wykonuj po kolei trening A/B/C)',
        exercises: [
          { id: '1', name: 'Pajacyki', sets: '2', reps: '40s', rest: '20s' },
          { id: '2', name: 'Bear Crab', sets: '3', reps: '15s', rest: '30s' },
          { id: '3', name: 'Pompki szerokie', sets: '4', reps: '8-14', rest: '90s' },
          { id: '4', name: 'Weight Shift Push-Up', sets: '2', reps: '5/strona', rest: '45s' },
          { id: '5', name: 'Pike Hold', sets: '3', reps: '10s', rest: '45s' },
          { id: '6', name: 'Dead Bug', sets: '3', reps: '10/strona', rest: '45s' },
          { id: '7', name: 'Zakroki', sets: '3', reps: '20s/strona', rest: '45s' },
          { id: '8', name: 'Bear Walk', sets: '3', reps: '10-20 kroków', rest: '60s' }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'Etap 4',
    goal: 'Siła dynamiczna i izometria',
    duration: 'ok. 3–4 tyg.',
    plans: [
      {
        id: '4-1',
        level: 1,
        type: 'Trening A',
        duration: '28-30 min',
        schedule: '3 treningi w tygodniu (wykonuj po kolei trening A/B/C)',
        exercises: [
          { id: '1', name: 'Narciarz', sets: '2', reps: '30s', rest: '20s' },
          { id: '2', name: 'Bear Crab', sets: '3', reps: '25s', rest: '30s' },
          { id: '3', name: 'Pompki tempo 3-1-0-1', sets: '4', reps: '6-12', rest: '90s' },
          { id: '4', name: 'Przysiady tempo 2-2-1-0', sets: '3', reps: '8-14', rest: '60s' },
          { id: '5', name: 'Hollow Rocks', sets: '3', reps: '25-30s', rest: '45s' },
          { id: '6', name: 'Side plank + odwodzenie', sets: '3', reps: '8/strona', rest: '45s' },
          { id: '7', name: 'Crab Walk', sets: '3', reps: '20 kroków', rest: '60s' }
        ]
      },
      {
        id: '4-2',
        level: 2,
        type: 'Trening B',
        duration: '26-28 min',
        schedule: '3 treningi w tygodniu (wykonuj po kolei trening A/B/C)',
        exercises: [
          { id: '1', name: 'Narciarz', sets: '2', reps: '30s', rest: '20s' },
          { id: '2', name: 'Bear Crab', sets: '3', reps: '25s', rest: '30s' },
          { id: '3', name: 'Negaty pompki pike (Negative Pike Push-Up)', sets: '3', reps: '6', rest: '90s' },
          { id: '4', name: 'Pół-przysiad jednonóż na krzesło', sets: '3', reps: '6-10/strona', rest: '60s' },
          { id: '5', name: 'Dead Bug tempo', sets: '3', reps: '12/strona', rest: '45s' },
          { id: '6', name: 'Crab Reach', sets: '3', reps: '10/strona', rest: '45s' },
          { id: '7', name: 'Pike Hold', sets: '3', reps: '20s', rest: '45s' }
        ]
      },
      {
        id: '4-3',
        level: 3,
        type: 'Trening C',
        duration: '27-29 min',
        schedule: '3 treningi w tygodniu (wykonuj po kolei trening A/B/C)',
        exercises: [
          { id: '1', name: 'Narciarz', sets: '2', reps: '30s', rest: '20s' },
          { id: '2', name: 'Bear Crab', sets: '3', reps: '25s', rest: '30s' },
          { id: '3', name: 'Pompki wąskie', sets: '4', reps: '8-14', rest: '90s' },
          { id: '4', name: 'Wykroki wolne tempo', sets: '3', reps: '10/strona', rest: '60s' },
          { id: '5', name: 'Hollow Hold', sets: '3', reps: '20s', rest: '45s' },
          { id: '6', name: 'Deska (Plank)', sets: '3', reps: '10s', rest: '60s' },
          { id: '7', name: 'Superman Hold', sets: '3', reps: '20-30s', rest: '45s' }
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'Etap 5',
    goal: 'Umiejętności kalisteniczne i kontrola ciała',
    duration: 'ok. 3–4 tyg.',
    plans: [
      {
        id: '5-1',
        level: 1,
        type: 'Trening A',
        duration: '28-30 min',
        schedule: '3 treningi w tygodniu (wykonuj po kolei trening A/B/C)',
        exercises: [
          { id: '1', name: 'Narciarz', sets: '2', reps: '45s', rest: '20s' },
          { id: '2', name: 'Archer Push-Up', sets: '3', reps: '6/strona', rest: '90s' },
          { id: '3', name: 'Pompki szerokie', sets: '3', reps: '10-18', rest: '90s' },
          { id: '4', name: 'Przysiady z pauzą', sets: '4', reps: '14-20', rest: '60s' },
          { id: '5', name: 'Hollow Rocks', sets: '3', reps: '30-40s', rest: '45s' },
          { id: '6', name: 'Side Plank Reach', sets: '3', reps: '10-14/strona', rest: '45s' },
          { id: '7', name: 'Bear Walk', sets: '3', reps: '30 kroków', rest: '60s' }
        ]
      },
      {
        id: '5-2',
        level: 2,
        type: 'Trening B',
        duration: '27-29 min',
        schedule: '3 treningi w tygodniu (wykonuj po kolei trening A/B/C)',
        exercises: [
          { id: '1', name: 'Narciarz', sets: '2', reps: '45s', rest: '20s' },
          { id: '2', name: 'Pompki Pike (Pike Push-Up)', sets: '4', reps: '4-8', rest: '90s' },
          { id: '3', name: 'Pompki wąskie z pauzą na dole 2', sets: '3', reps: '8-14', rest: '60s' },
          { id: '4', name: 'Przysiad na 1 nodze z asekuracją', sets: '3', reps: '8/strona', rest: '60s' },
          { id: '5', name: 'L-sit wznosy siedząc', sets: '4', reps: '15-20', rest: '45s' },
          { id: '6', name: 'Crab Reach', sets: '3', reps: '8/strona', rest: '45s' },
          { id: '7', name: 'Hollowbody spięcia', sets: '2', reps: '12-20', rest: '45s' }
        ]
      },
      {
        id: '5-3',
        level: 3,
        type: 'Trening C',
        duration: '29-30 min',
        schedule: '3 treningi w tygodniu (wykonuj po kolei trening A/B/C)',
        exercises: [
          { id: '1', name: 'Narciarz', sets: '2', reps: '45s', rest: '20s' },
          { id: '2', name: 'Archer Push-Up', sets: '3', reps: '6/strona', rest: '90s' },
          { id: '3', name: 'Pompki tempo 3-1-0-1', sets: '4', reps: '8-12', rest: '90s' },
          { id: '4', name: 'Split Squat (statyczny)', sets: '3', reps: '14-16/strona', rest: '60s' },
          { id: '5', name: 'Planche Lean', sets: '3', reps: '10s', rest: '45s' },
          { id: '6', name: 'Hollow Hold + ruch ramion', sets: '3', reps: '30s', rest: '45s' },
          { id: '7', name: 'Bear Crab', sets: '3', reps: '30s', rest: '60s' }
        ]
      }
    ]
  }
];

