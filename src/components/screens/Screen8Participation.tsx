import React, { useState } from 'react';
import { Check, Lightbulb, MessageSquarePlus, ShieldCheck, Trash2 } from 'lucide-react';
import { PARTICIPATION_OPTIONS } from '../../data/campaignData';

export interface LocalReflectionEntry {
  id: string;
  categoryLabel: string;
  customText?: string;
}

interface Screen8ParticipationProps {
  entries: LocalReflectionEntry[];
  onAddEntry: (entry: LocalReflectionEntry) => void;
  onClearEntries: () => void;
}

export const Screen8Participation: React.FC<Screen8ParticipationProps> = ({
  entries,
  onAddEntry,
  onClearEntries,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string>('emails');
  const [customIdea, setCustomIdea] = useState<string>('');
  const [justSubmitted, setJustSubmitted] = useState<boolean>(false);

  const selectedOption =
    PARTICIPATION_OPTIONS.find((opt) => opt.id === selectedOptionId) ?? PARTICIPATION_OPTIONS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customIdea.trim();
    if (selectedOptionId === 'other' && !trimmed) {
      return;
    }

    onAddEntry({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      categoryLabel: selectedOption.label,
      customText: selectedOptionId === 'other' ? trimmed : undefined,
    });

    if (selectedOptionId === 'other') {
      setCustomIdea('');
    }
    setJustSubmitted(true);
    window.setTimeout(() => setJustSubmitted(false), 2500);
  };

  return (
    <section aria-labelledby="participation-title" className="space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-medium text-teal-700">Étape 8 · Participation du public</p>
        <h2
          id="participation-title"
          className="mt-1 font-display text-2xl font-bold tracking-tight text-petrol-950 sm:text-3xl"
        >
          Quelle tâche répétitive aimerais-tu automatiser dans ton quotidien ?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Choisissez une piste ci-dessous pour découvrir comment l&apos;aborder et l&apos;afficher
          localement comme support d&apos;échange.
        </p>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-teal-200 bg-teal-50/50 px-4 py-3 text-xs sm:text-sm text-petrol-950">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" aria-hidden="true" />
        <p>
          <span className="font-semibold">Respect de la vie privée :</span> aucune donnée
          personnelle n&apos;est collectée. Les réponses restent affichées uniquement sur cet écran
          pour la démonstration, sans stockage ni transmission.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs lg:col-span-7"
        >
          <fieldset>
            <legend className="text-sm font-semibold text-petrol-950">
              Sélectionnez un exemple ou proposez une idée :
            </legend>

            <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {PARTICIPATION_OPTIONS.map((option) => {
                const isSelected = option.id === selectedOptionId;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      setSelectedOptionId(option.id);
                      setJustSubmitted(false);
                    }}
                    className={`flex items-center justify-between gap-2 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-petrol-800 bg-petrol-800 text-white'
                        : 'border-slate-200 bg-slate-50/60 text-slate-800 hover:border-teal-400 hover:bg-white'
                    }`}
                  >
                    <span>{option.label}</span>
                    {isSelected && <Check className="h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
          </fieldset>

          {selectedOptionId === 'other' && (
            <div>
              <label
                htmlFor="custom-task-input"
                className="block text-xs font-semibold text-petrol-900"
              >
                Précisez la tâche sans indiquer de données personnelles :
              </label>
              <input
                id="custom-task-input"
                type="text"
                maxLength={100}
                value={customIdea}
                onChange={(e) => setCustomIdea(e.target.value)}
                placeholder="Ex. : classer les factures ou préparer une liste de courses..."
                className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 focus:border-teal-600 focus:bg-white"
              />
            </div>
          )}

          {/* Piste de réflexion immédiate */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-petrol-800">
              <Lightbulb className="h-4 w-4 text-amber-500" aria-hidden="true" />
              <span>Piste de réflexion · {selectedOption.approachType}</span>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
              {selectedOption.reflectionTip}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={selectedOptionId === 'other' && !customIdea.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap cursor-pointer"
            >
              <MessageSquarePlus className="h-4 w-4" aria-hidden="true" />
              <span>Afficher cette réflexion localement</span>
            </button>

            {justSubmitted && (
              <span className="text-xs font-semibold text-teal-700">
                Ajouté à l&apos;affichage local de la session.
              </span>
            )}
          </div>
        </form>

        {/* Mur d'idées strictement local en mémoire */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs lg:col-span-5">
          <div>
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-display text-base font-bold text-petrol-950">
                  Idées affichées en session
                </h3>
                <p className="text-xs text-slate-500">Affichage local temporaire uniquement</p>
              </div>
              <span className="font-mono text-xs font-semibold text-petrol-800 tabular-nums">
                {entries.length}
              </span>
            </div>

            {entries.length === 0 ? (
              <p className="mt-6 text-sm text-slate-500">
                Aucune idée ajoutée pour le moment. Sélectionnez une option à gauche et cliquez sur
                « Afficher cette réflexion localement ».
              </p>
            ) : (
              <ul className="mt-4 space-y-2.5">
                {entries.map((entry, idx) => (
                  <li
                    key={entry.id}
                    className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-800"
                  >
                    <div>
                      <span className="font-mono text-xs text-slate-400 tabular-nums mr-2">
                        #{idx + 1}
                      </span>
                      <span className="font-medium">
                        {entry.customText ? `${entry.categoryLabel} : ${entry.customText}` : entry.categoryLabel}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {entries.length > 0 && (
            <div className="mt-6 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={onClearEntries}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-rose-700 cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Effacer l&apos;affichage local</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
