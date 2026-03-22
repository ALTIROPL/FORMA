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
  type: 'Klasyczny' | 'Obwodowy' | 'Serie łączone';
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

export const stages: Stage[] = [
  {
    id: 1,
    title: 'Wprowadzenie do ruchu i budowanie fundamentów',
    goal: 'Wprowadzenie do ruchu, fundamenty siły',
    duration: 'ok. 3–4 tyg.',
    plans: [
      {
        id: '1-1',
        level: 1,
        type: 'Klasyczny',
        duration: 'ok. 30 min',
        schedule: 'Pon, Śr, Pt: trening główny | Wt, Czw: spacer 30-60 min',
        exercises: [
          { id: '1', name: 'Pajacyki', sets: '2', reps: '20-30s', rest: '30s' },
          { id: '2', name: 'Pompki na podwyższeniu (im wyżej, tym łatwiej)', sets: '4', reps: '5-10', rest: '2 min' },
          { id: '3', name: 'Spięcia na plecy leżąc z ręcznikiem', sets: '3', reps: '10-12', rest: '1.5 min' },
          { id: '4', name: 'Podpór na rękach (pozycja pompki)', sets: '3', reps: '30-60 s', rest: '2 min' },
          { id: '5', name: 'Przysiady klasyczne', sets: '4', reps: '10-15', rest: '2 min' }
        ]
      },
      {
        id: '1-2',
        level: 2,
        type: 'Obwodowy',
        duration: 'ok. 25 min',
        schedule: 'Pon, Śr, Pt: trening główny | Wt, Czw: spacer 30-60 min',
        exercises: [
          { id: '1', name: 'Pajacyki', sets: '3', reps: '40s', rest: '15/20s' },
          { id: '2', name: 'Wykroki naprzemienne (na nogę!)', sets: '3', reps: '6-8', rest: '15/20s' },
          { id: '3', name: 'Negatywy pompek w podporze lub na kolanach (jak najwolniej)', sets: '3', reps: '3-4', rest: '15/20s' },
          { id: '4', name: 'Kolana do klatki w podporze', sets: '3', reps: '20-30', rest: '15/20s' },
          { id: '5', name: 'Klepnięcia w ramię w podporze (na stronę!)', sets: '3', reps: '10-14', rest: '2/3 min' }
        ]
      },
      {
        id: '1-3',
        level: 3,
        type: 'Klasyczny',
        duration: 'ok. 30–35 min',
        schedule: 'Pon, Śr, Pt: trening główny | Wt, Czw: spacer 30-60 min',
        exercises: [
          { id: '1', name: 'Wymachy narciarza', sets: '2', reps: '20-30s', rest: '30s' },
          { id: '2', name: 'Pompki na kolanach lub negatywy pompek', sets: '4', reps: '5-10', rest: '2 min' },
          { id: '3', name: 'Przejścia z podporu do pozycji wyprostowanej', sets: '4', reps: '4-5 (przejść)', rest: '2 min' },
          { id: '4', name: 'Przysiad bułgarski (na nogę!)', sets: '3', reps: '5-7', rest: '2 min' },
          { id: '5', name: 'Klepnięcia w ramię w podporze (na stronę!)', sets: '3', reps: '10-14', rest: '2/3 min' },
          { id: '6', name: 'Wspięcia supermana (na plecy)', sets: '3', reps: '10-15', rest: '1.5 min' },
          { id: '7', name: 'Deska na kolanach lub klasyczna', sets: '3', reps: '20-30s', rest: '1.5 min' }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Budowanie siły podstawowej i wytrzymałości',
    goal: 'Budowanie siły podstawowej i wytrzymałości',
    duration: 'ok. 3–4 tyg.',
    plans: [
      {
        id: '2-1',
        level: 1,
        type: 'Klasyczny',
        duration: 'ok. 25–30 min',
        schedule: 'Pon, Śr, Pt: trening główny | Wt, Czw: spacer 30-60 min',
        exercises: [
          { id: '1', name: 'Pajacyki', sets: '2', reps: '30-40s', rest: '30s' },
          { id: '2', name: 'Pompki na małym podwyższeniu', sets: '4', reps: '6-8', rest: '2 min' },
          { id: '3', name: 'Pompki szwedzkie ze zgiętymi kolanami', sets: '3', reps: '8-15', rest: '1.5 min' },
          { id: '4', name: 'Spięcia hollow body w kulce', sets: '3', reps: '10-15', rest: '1.5 min' },
          { id: '5', name: 'Przysiad bułgarski (na nogę!)', sets: '3', reps: '6-8', rest: '2 min' }
        ]
      },
      {
        id: '2-2',
        level: 2,
        type: 'Obwodowy',
        duration: 'ok. 25–30 min',
        schedule: 'Pon, Śr, Pt: trening główny | Wt, Czw: spacer 30-60 min',
        exercises: [
          { id: '1', name: 'Pompki na podwyższeniu lub na kolanach', sets: '4', reps: '5-8', rest: '15/20s' },
          { id: '2', name: 'Przysiady klasyczne', sets: '4', reps: '10-15', rest: '15/20s' },
          { id: '3', name: 'Pompki tricepsowe na kolanach', sets: '4', reps: '6-8', rest: '15/20s' },
          { id: '4', name: 'Wykroki chodzone', sets: '4', reps: '8-10', rest: '15/20s' },
          { id: '5', name: 'Plank (deska)', sets: '4', reps: '20-30s', rest: '2/3 min' }
        ]
      },
      {
        id: '2-3',
        level: 3,
        type: 'Serie łączone',
        duration: 'ok. 30–35 min',
        schedule: 'Pon, Śr, Pt: trening główny | Wt, Czw, 1x weekend: spacer',
        exercises: [
          { id: '1', name: 'Pompki szerokie lub szerokie na kolanach', sets: '3', reps: '6-12', rest: '-', isSuperset: true, supersetId: '1' },
          { id: '1a', name: 'Kolana do klatki w podporze', sets: '3', reps: '20-30', rest: '2 min', isSuperset: true, supersetId: '1' },
          { id: '2', name: 'Pompki tricepsowe lub tricepsowe na kolanach', sets: '3', reps: '6-8', rest: '-', isSuperset: true, supersetId: '2' },
          { id: '2a', name: 'Spięcia na plecy leżąc z ręcznikiem', sets: '3', reps: '10-15', rest: '2 min', isSuperset: true, supersetId: '2' },
          { id: '3', name: 'Zakroki (na nogę)', sets: '3', reps: '8-10', rest: '-', isSuperset: true, supersetId: '3' },
          { id: '3a', name: 'Przejścia z podporu do wyprostu', sets: '3', reps: '4-6', rest: '2 min', isSuperset: true, supersetId: '3' },
          { id: '4', name: 'Toes Crunch (brzuszki)', sets: '3', reps: '15-20', rest: '-', isSuperset: true, supersetId: '4' },
          { id: '4a', name: 'Deska', sets: '3', reps: '20-30s', rest: '2 min', isSuperset: true, supersetId: '4' },
          { id: '5', name: 'Burpees (padnij powstań)', sets: '3', reps: '10', rest: '1.5 min' }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Progresja siły i ruchy złożone',
    goal: 'Progresja siły i ruchy złożone',
    duration: 'ok. 3–4 tyg.',
    plans: [
      {
        id: '3-1',
        level: 1,
        type: 'Klasyczny',
        duration: 'ok. 30–32 min',
        schedule: 'Pon, Śr, Pt: trening główny | Wt, Czw, 1x weekend: spacer',
        exercises: [
          { id: '1', name: 'Pompki klasyczne na ziemi', sets: '4', reps: '6-8', rest: '2 min' },
          { id: '2', name: 'Trzymanie pozycji pike', sets: '3', reps: '15-20s', rest: '2 min' },
          { id: '3', name: 'Pompki szwedzkie na prostych nogach', sets: '3', reps: '8-12', rest: '2 min' },
          { id: '4', name: 'Przysiad bułgarski (na nogę!)', sets: '3', reps: '8-10', rest: '2 min' },
          { id: '5', name: 'Hollow body spięcia', sets: '3', reps: '10-16', rest: '1.5 min' }
        ]
      },
      {
        id: '3-2',
        level: 2,
        type: 'Serie łączone',
        duration: 'ok. 50–55 min',
        schedule: 'Pon, Śr, Pt: trening główny | Wt, Czw, 1x weekend: spacer',
        exercises: [
          { id: '1', name: 'Podciąganie australijskie nachwytem na zgiętych kolanach na stole/krzesłach', sets: '4', reps: '6-10', rest: '-', isSuperset: true, supersetId: '1' },
          { id: '1a', name: 'Spięcia na plecy leżąc z ręcznikiem', sets: '4', reps: '10-15', rest: '2 min', isSuperset: true, supersetId: '1' },
          { id: '2', name: 'Pompki szerokie', sets: '4', reps: '6-10', rest: '-', isSuperset: true, supersetId: '2' },
          { id: '2a', name: 'Pompki klasyczne na kolanach', sets: '4', reps: 'Max', rest: '2 min', isSuperset: true, supersetId: '2' },
          { id: '3', name: 'Pompki szwedzkie na prostych nogach', sets: '4', reps: '8-12', rest: '-', isSuperset: true, supersetId: '3' },
          { id: '3a', name: 'Klepnięcia w ramię w podporze(na stronę!)', sets: '4', reps: '10-14', rest: '2 min', isSuperset: true, supersetId: '3' },
          { id: '4', name: 'Przysiady klasyczne', sets: '4', reps: '15-20', rest: '-', isSuperset: true, supersetId: '4' },
          { id: '4a', name: 'Wykroki naprzemienne', sets: '4', reps: '6-8', rest: '2 min', isSuperset: true, supersetId: '4' },
          { id: '5', name: 'Kolana do klatki w podporze', sets: '4', reps: '20-30', rest: '-', isSuperset: true, supersetId: '5' },
          { id: '5a', name: 'Toes Crunch (brzuszki)', sets: '4', reps: '15-20', rest: '1.5 min', isSuperset: true, supersetId: '5' }
        ]
      },
      {
        id: '3-3',
        level: 3,
        type: 'Obwodowy',
        duration: 'ok. 30–32 min',
        schedule: 'Pon, Śr, Pt: trening główny | Wt, Czw, 1x weekend: spacer',
        exercises: [
          { id: '1', name: 'Podciąganie australijskie na krzesłach lub stole nachwytem', sets: '4', reps: '6-20', rest: '15/20s' },
          { id: '2', name: 'Pompki klasyczne lub na kolanach', sets: '4', reps: '6-12', rest: '15/20s' },
          { id: '3', name: 'Zakroki naprzemienne (na nogę!)', sets: '4', reps: '6-8', rest: '15/20s' },
          { id: '4', name: 'Pompki szwedzkie na prostych nogach', sets: '4', reps: '6-10', rest: '15/20s' },
          { id: '5', name: 'Skręty boczne na brzuch', sets: '4', reps: '16-20', rest: '15/20s' },
          { id: '6', name: 'Przysiad klasyczny', sets: '4', reps: '10-15', rest: '2/3 min' }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'Siła dynamiczna i izometria',
    goal: 'Siła dynamiczna i izometria',
    duration: 'ok. 3–4 tyg.',
    plans: [
      {
        id: '4-1',
        level: 1,
        type: 'Klasyczny',
        duration: 'ok. 30–32 min',
        schedule: 'Pon, Śr, Pt: trening główny | Wt, Czw, 1x weekend: spacer',
        exercises: [
          { id: '1', name: 'Pompki szerokie', sets: '3', reps: '6-8', rest: '2 min' },
          { id: '2', name: 'Spięcia na plecy leżąc z ręcznikiem', sets: '3', reps: '15-20', rest: '1.5 min' },
          { id: '3', name: 'Pompki tricepsowe', sets: '3', reps: '8-12', rest: '1.5 min' },
          { id: '4', name: 'Podciąganie australijskie na prostych nogach na krzesłach lub stole', sets: '3', reps: '8-14', rest: '2 min' },
          { id: '5', name: 'Przysiad z wyskokiem', sets: '3', reps: '15-20', rest: '2 min' },
          { id: '6', name: 'Wznosy nóg leżąc na ziemi', sets: '3', reps: '12-20', rest: '1.5 min' }
        ]
      },
      {
        id: '4-2',
        level: 2,
        type: 'Obwodowy',
        duration: 'ok. 31–33 min',
        schedule: 'Pon, Śr, Pt: trening główny | Wt, Czw, 1x weekend: spacer',
        exercises: [
          { id: '1', name: 'Pompki wąskie lub wąskie na kolanach', sets: '4', reps: '6-8', rest: '15/20s' },
          { id: '2', name: 'Pompki szwedzkie na prostych nogach', sets: '4', reps: '8-12', rest: '15/20s' },
          { id: '3', name: 'Zakroki naprzemienne (na nogę!)', sets: '4', reps: '10', rest: '15/20s' },
          { id: '4', name: 'Trzymanie pozycji Pike', sets: '4', reps: '15-25s', rest: '15/20s' },
          { id: '5', name: 'Spięcia hollow w kulce', sets: '4', reps: '10-20', rest: '15/20s' },
          { id: '6', name: 'Plank', sets: '4', reps: 'Max', rest: '2/3 min' }
        ]
      },
      {
        id: '4-3',
        level: 3,
        type: 'Serie łączone',
        duration: 'ok. 45–50 min',
        schedule: 'Pon, Śr, Pt: trening główny | Wt, Czw, 1x weekend: spacer',
        exercises: [
          { id: '1', name: 'Podciąganie australijskie nachwytem na stole lub krzesłach', sets: '4', reps: '8-14', rest: '-', isSuperset: true, supersetId: '1' },
          { id: '1a', name: 'Spięcia na plecy leżąc z ręcznikiem', sets: '4', reps: '12-16', rest: '2.5 min', isSuperset: true, supersetId: '1' },
          { id: '2', name: 'Pompki szerokie', sets: '4', reps: '8-14', rest: '-', isSuperset: true, supersetId: '2' },
          { id: '2a', name: 'Pompki szwedzkie', sets: '4', reps: '10-16', rest: '2 min', isSuperset: true, supersetId: '2' },
          { id: '3', name: 'Pompki klasyczne', sets: '4', reps: '8-12', rest: '-', isSuperset: true, supersetId: '3' },
          { id: '3a', name: 'Toes Crunch (brzuszki)', sets: '4', reps: '15-25', rest: '2 min', isSuperset: true, supersetId: '3' },
          { id: '4', name: 'Przysiady z wyskokiem', sets: '4', reps: '12-16', rest: '-', isSuperset: true, supersetId: '4' },
          { id: '4a', name: 'Wykroki naprzemienne (na nogę!)', sets: '4', reps: '8-10', rest: '2 min', isSuperset: true, supersetId: '4' },
          { id: '5', name: 'Burpees (padnij-powstań)', sets: '4', reps: '15', rest: '1.5 min' }
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'Umiejętności kalisteniczne i kontrola ciała',
    goal: 'Umiejętności kalisteniczne i kontrola ciała',
    duration: 'ok. 3–4 tyg.',
    plans: [
      {
        id: '5-1',
        level: 1,
        type: 'Klasyczny',
        duration: 'ok. 35–38 min',
        schedule: 'Pon, Śr, Pt: trening główny | Wt, Czw, 1x weekend: spacer',
        exercises: [
          { id: '1', name: 'Podciąganie australijskie na krzesłach lub stole', sets: '3', reps: 'Max', rest: '2 min' },
          { id: '2', name: 'Pompki wąskie lub na kolanach', sets: '4', reps: '6-14', rest: '2 min' },
          { id: '3', name: 'Spięcia hollow body z przytrzymaniem napięcia 3 sek', sets: '3', reps: '10', rest: '2 min' },
          { id: '4', name: 'Wznosy nóg leżąc na ziemi', sets: '3', reps: '12-20', rest: '1.5 min' },
          { id: '5', name: 'Wykroki z wyskokiem', sets: '3', reps: '16-26', rest: '2 min' },
          { id: '6', name: 'Skręty boczne na brzuch', sets: '3', reps: '20-30', rest: '1.5 min' }
        ]
      },
      {
        id: '5-2',
        level: 2,
        type: 'Obwodowy',
        duration: 'ok. 31–33 min',
        schedule: 'Pon, Śr, Pt: trening główny | Wt, Czw, 1x weekend: spacer',
        exercises: [
          { id: '1', name: 'Pompki szerokie', sets: '4', reps: '10-16', rest: '15/20s' },
          { id: '2', name: 'Przysiady z wyskokiem', sets: '4', reps: '10-15', rest: '15/20s' },
          { id: '3', name: 'Skręty boczne na brzuch', sets: '4', reps: '20-30', rest: '15/20s' },
          { id: '4', name: 'Spięcia hollow body', sets: '4', reps: '10-14', rest: '15/20s' },
          { id: '5', name: 'Pompki klasyczne lub na kolanach', sets: '4', reps: '7-12', rest: '15/20s' },
          { id: '6', name: 'Deska z cofniętymi nogami', sets: '4', reps: '20-30s', rest: '2/3 min' }
        ]
      },
      {
        id: '5-3',
        level: 3,
        type: 'Serie łączone',
        duration: 'ok. 40–45 min',
        schedule: 'Pon, Śr, Pt: trening główny | Wt, Czw, 1x weekend: spacer',
        exercises: [
          { id: '1', name: 'Trzymanie pozycji Pike', sets: '3', reps: '8-14', rest: '-', isSuperset: true, supersetId: '1' },
          { id: '1a', name: 'Spięcia na plecy leżąc z ręcznikiem', sets: '3', reps: '12-16', rest: '2.5 min', isSuperset: true, supersetId: '1' },
          { id: '2', name: 'Pompki wąskie', sets: '4', reps: '10-14', rest: '-', isSuperset: true, supersetId: '2' },
          { id: '2a', name: 'Pompki szwedzkie na prostych nogach', sets: '4', reps: '12-18', rest: '2 min', isSuperset: true, supersetId: '2' },
          { id: '3', name: 'Podciąganie australijskie na krzesłach lub stole', sets: '3', reps: 'Max', rest: '-', isSuperset: true, supersetId: '3' },
          { id: '3a', name: 'Spięcia w hollow body', sets: '3', reps: '10-16', rest: '2 min', isSuperset: true, supersetId: '3' },
          { id: '4', name: 'Przysiady z wyskokiem', sets: '3', reps: '12-18', rest: '-', isSuperset: true, supersetId: '4' },
          { id: '4a', name: 'Wykroki naprzemienne (na nogę!)', sets: '3', reps: '8-10', rest: '2 min', isSuperset: true, supersetId: '4' },
          { id: '5', name: 'Deska z cofniętymi nogami', sets: '3', reps: '25-35s', rest: '-', isSuperset: true, supersetId: '5' },
          { id: '5a', name: 'Wznosy nóg leżąc na ziemi', sets: '3', reps: '12-16', rest: '2 min', isSuperset: true, supersetId: '5' }
        ]
      }
    ]
  }
];
