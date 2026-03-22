import { BookOpen, Info, Activity, Dumbbell, RefreshCcw } from 'lucide-react';

export function KnowledgeBase() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          Baza Wiedzy
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl">
          Zrozum jak działa program Ponadprzeciętna Forma 2.0.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        <section className="bg-zinc-900 rounded-2xl p-6 border border-white/5 space-y-4">
          <div className="flex items-center space-x-3 text-emerald-500 mb-2">
            <Info size={24} />
            <h2 className="text-xl font-bold text-white">Jak korzystać z programu?</h2>
          </div>
          <div className="space-y-4 text-zinc-300 text-sm leading-relaxed">
            <p>
              Cały program został przygotowany tak, aby przejść go w około 15–20 tygodni. To normalne, że niektórzy będą potrzebowali trochę więcej czasu na dany etap, a inni szybciej pójdą do przodu.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400">
              <li>Jeśli czujesz, że obecny plan treningowy jest dla Ciebie za łatwy – przejdź na poziom wyżej w tym samym etapie.</li>
              <li>Nie zatrzymuj się na zbyt lekkim treningu, bo wtedy Twój progres będzie wolniejszy.</li>
              <li>Jednocześnie nie spiesz się – przechodź wyżej tylko wtedy, gdy spełniasz zasady (pełna technika, wykonanie serii i powtórzeń, brak oszukiwania ruchu).</li>
            </ul>
            <p className="font-medium text-emerald-500 mt-4">Jak trenujesz?</p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400">
              <li>Każdy plan to 1 trening, który powtarzasz w danym tygodniu.</li>
              <li>Ten sam trening wykonujesz 3 razy w tygodniu.</li>
              <li>Trenujesz minimum 2 treningi, optymalnie 3, a maksymalnie 4 w tygodniu.</li>
            </ul>
          </div>
        </section>

        <section className="bg-zinc-900 rounded-2xl p-6 border border-white/5 space-y-4">
          <div className="flex items-center space-x-3 text-emerald-500 mb-2">
            <Activity size={24} />
            <h2 className="text-xl font-bold text-white">Kiedy przechodzić wyżej?</h2>
          </div>
          <div className="space-y-4 text-zinc-300 text-sm leading-relaxed">
            <p>Rozpoznasz to po kilku prostych sygnałach:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-zinc-950 p-4 rounded-xl border border-white/5">
                <h4 className="font-bold text-white mb-2">1. Powtórzenia bez problemu</h4>
                <p className="text-zinc-400 text-xs">Jesteś w stanie wykonać wszystkie zaplanowane serie i powtórzenia w pełnym zakresie ruchu, bez zatrzymywania się w połowie.</p>
              </div>
              <div className="bg-zinc-950 p-4 rounded-xl border border-white/5">
                <h4 className="font-bold text-white mb-2">2. Brak zmęczenia</h4>
                <p className="text-zinc-400 text-xs">Po skończonym treningu czujesz, że mógłbyś spokojnie zrobić kolejną serię albo dorzucić więcej ćwiczeń.</p>
              </div>
              <div className="bg-zinc-950 p-4 rounded-xl border border-white/5">
                <h4 className="font-bold text-white mb-2">3. Brak progresu w odczuciu</h4>
                <p className="text-zinc-400 text-xs">Trening przestaje być wyzwaniem – nie masz już „efektu walki” z ostatnimi powtórzeniami.</p>
              </div>
              <div className="bg-zinc-950 p-4 rounded-xl border border-white/5">
                <h4 className="font-bold text-white mb-2">4. Szybsza regeneracja</h4>
                <p className="text-zinc-400 text-xs">Wracasz do pełnej gotowości bardzo szybko (np. już następnego dnia), a mięśnie nie są mocno zmęczone.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-zinc-900 Rounded-2xl p-6 border border-white/5 space-y-4 rounded-2xl">
          <div className="flex items-center space-x-3 text-emerald-500 mb-2">
            <Dumbbell size={24} />
            <h2 className="text-xl font-bold text-white">Rodzaje treningów</h2>
          </div>
          <div className="space-y-6 text-zinc-300 text-sm leading-relaxed">
            <div>
              <h3 className="text-emerald-500 font-bold mb-1">1. Trening obwodowy</h3>
              <p className="text-zinc-400 mb-2">To dynamiczny rodzaj treningu, który łączy kilka ćwiczeń w jedną pętlę („obwód”). Wykonujesz kolejno wszystkie ćwiczenia bez przerw (lub z bardzo krótką – 15–30 sekund). Po skończeniu całego zestawu robisz dłuższy odpoczynek (2–3 minuty), a potem powtarzasz obwód 3–4 razy.</p>
              <p className="text-xs text-zinc-500 italic">Świetny na poprawę kondycji, spalanie tłuszczu i wytrzymałość.</p>
            </div>
            
            <div>
              <h3 className="text-emerald-500 font-bold mb-1">2. Superserie</h3>
              <p className="text-zinc-400 mb-2">Superseria to duet ćwiczeń robionych jedno po drugim, bez przerwy. Po wykonaniu obu ćwiczeń – odpoczywasz (np. 2 minuty). Najczęściej łączy się przeciwne grupy mięśni (np. pompki + podciągania).</p>
              <p className="text-xs text-zinc-500 italic">Superserie oszczędzają czas i uczą kontroli ciała pod zmęczeniem.</p>
            </div>

            <div>
              <h3 className="text-emerald-500 font-bold mb-1">3. Ćwiczenia łączone (serie łączone)</h3>
              <p className="text-zinc-400 mb-2">Tu skupiasz się na jednej partii mięśniowej, wykonując 2–3 ćwiczenia po sobie bez przerw. Celem jest maksymalne zmęczenie mięśnia i jego adaptacja do większego wysiłku.</p>
              <p className="text-xs text-zinc-500 italic">Idealne do rozwoju siły i hipertrofii (czyli „kształtu mięśnia”).</p>
            </div>

            <div>
              <h3 className="text-emerald-500 font-bold mb-1">4. Serie klasyczne</h3>
              <p className="text-zinc-400 mb-2">Najprostszy i najczęściej stosowany typ. Wykonujesz wszystkie serie jednego ćwiczenia z przerwami, a dopiero po zakończeniu przechodzisz do następnego ćwiczenia.</p>
              <p className="text-xs text-zinc-500 italic">Idealny dla początkujących i do nauki techniki.</p>
            </div>
          </div>
        </section>

        <section className="bg-zinc-900 rounded-2xl p-6 border border-white/5 space-y-4">
          <div className="flex items-center space-x-3 text-emerald-500 mb-2">
            <RefreshCcw size={24} />
            <h2 className="text-xl font-bold text-white">Falowa metoda progresji</h2>
          </div>
          <div className="space-y-4 text-zinc-300 text-sm leading-relaxed">
            <p>
              To system treningowy, który łączy intensywny rozwój z pełną regeneracją. Każdy cykl to 4-5 tygodni pracy i 1 tydzień deloadu (czyli strategicznego odciążenia).
            </p>
            <div className="bg-zinc-950 p-4 rounded-xl border border-white/5">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="font-bold text-emerald-500 w-24 shrink-0">Tydzień 1–4</span>
                  <span className="text-zinc-400">Bodziec – praca nad siłą i kontrolą. Zwiększaj trudność lub objętość.</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-emerald-500 w-24 shrink-0">Tydzień 5</span>
                  <span className="text-zinc-400">Regeneracja – deload. Zmniejsz objętość o 40–50%. Skup się na perfekcyjnej technice i kontroli.</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-emerald-500 w-24 shrink-0">Kolejna fala</span>
                  <span className="text-zinc-400">Adaptacja i wzrost. Wróć mocniejszy na wyższy poziom.</span>
                </li>
              </ul>
            </div>
            <p className="text-zinc-400 italic text-center mt-4">
              "Nie rośniesz podczas treningu. Rośniesz, kiedy ciało ma czas, by na ten trening odpowiedzieć."
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
