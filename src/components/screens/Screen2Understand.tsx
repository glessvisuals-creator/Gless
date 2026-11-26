import React, { useState } from 'react';
import { Bot, Cog, FolderKanban, MailCheck, FileEdit, FileText, Repeat } from 'lucide-react';
import { AUTOMATION_EXAMPLES } from '../../data/campaignData';

const EXAMPLE_ICONS: Record<string, React.ReactNode> = {
  organize: <FolderKanban className="h-5 w-5" aria-hidden="true" />,
  triage: <MailCheck className="h-5 w-5" aria-hidden="true" />,
  drafts: <FileEdit className="h-5 w-5" aria-hidden="true" />,
  summarize: <FileText className="h-5 w-5" aria-hidden="true" />,
  repetitive: <Repeat className="h-5 w-5" aria-hidden="true" />,
};

export const Screen2Understand: React.FC = () => {
  const [selectedExampleId, setSelectedExampleId] = useState<string>(AUTOMATION_EXAMPLES[0].id);
  const [modeFocus, setModeFocus] = useState<'both' | 'classic' | 'ai'>('both');

  const selectedExample =
    AUTOMATION_EXAMPLES.find((ex) => ex.id === selectedExampleId) ?? AUTOMATION_EXAMPLES[0];

  return (
    <section aria-labelledby="understand-title" className="space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-medium text-teal-700">Étape 2 · Les bases en clair</p>
        <h2
          id="understand-title"
          className="mt-1 font-display text-2xl font-bold tracking-tight text-petrol-950 sm:text-3xl"
        >
          Comprendre l&apos;automatisation
        </h2>
        <p className="mt-3 text-base leading-relaxed text-slate-700">
          L&apos;automatisation consiste à faire exécuter automatiquement une série de tâches ou
          d&apos;actions selon des règles, des déclencheurs ou des données reçues.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-display text-lg font-semibold text-petrol-900">
            Deux approches complémentaires
          </h3>

          <div
            role="group"
            aria-label="Filtrer la comparaison"
            className="inline-flex items-center gap-1 rounded-lg bg-slate-200/70 p-1"
          >
            <button
              type="button"
              onClick={() => setModeFocus('both')}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                modeFocus === 'both'
                  ? 'bg-white text-petrol-900 shadow-xs'
                  : 'text-slate-600 hover:text-petrol-900'
              }`}
            >
              Comparer les deux
            </button>
            <button
              type="button"
              onClick={() => setModeFocus('classic')}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                modeFocus === 'classic'
                  ? 'bg-white text-petrol-900 shadow-xs'
                  : 'text-slate-600 hover:text-petrol-900'
              }`}
            >
              Classique
            </button>
            <button
              type="button"
              onClick={() => setModeFocus('ai')}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                modeFocus === 'ai'
                  ? 'bg-white text-petrol-900 shadow-xs'
                  : 'text-slate-600 hover:text-petrol-900'
              }`}
            >
              Assistée par IA
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {(modeFocus === 'both' || modeFocus === 'classic') && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-petrol-50 text-petrol-800">
                  <Cog className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Sans intelligence artificielle</p>
                  <h4 className="font-display text-lg font-semibold text-petrol-950">
                    Automatisation classique
                  </h4>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                Actions réalisées selon des règles définies.
              </p>
              <div className="mt-4 border-t border-slate-100 pt-4 text-xs text-slate-600">
                <span className="font-semibold text-petrol-800">Logique : </span>
                « Si tel événement se produit, alors exécuter exactement cette action prévue à l&apos;avance. »
              </div>
            </div>
          )}

          {(modeFocus === 'both' || modeFocus === 'ai') && (
            <div className="rounded-2xl border border-teal-200 bg-teal-50/40 p-6 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white">
                  <Bot className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-medium text-teal-800">Avec intelligence artificielle</p>
                  <h4 className="font-display text-lg font-semibold text-petrol-950">
                    Automatisation assistée par IA
                  </h4>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                L&apos;intelligence artificielle peut aider à comprendre, classer, résumer, générer ou traiter certaines informations.
              </p>
              <div className="mt-4 border-t border-teal-200/70 pt-4 text-xs text-slate-700">
                <span className="font-semibold text-teal-800">Logique : </span>
                « Analyser un contenu non structuré (texte, e-mail, document) pour en proposer une suite adaptée. »
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-display text-lg font-semibold text-petrol-900">
            Exemples concrets du quotidien
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Cliquez sur un exemple pour voir comment il fonctionne concrètement.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="space-y-2 lg:col-span-5">
            {AUTOMATION_EXAMPLES.map((example) => {
              const isSelected = example.id === selectedExample.id;
              return (
                <button
                  key={example.id}
                  type="button"
                  onClick={() => setSelectedExampleId(example.id)}
                  className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors cursor-pointer ${
                    isSelected
                      ? 'border-petrol-800 bg-petrol-800 text-white shadow-xs'
                      : 'border-slate-200 bg-white text-slate-800 hover:border-teal-300 hover:bg-slate-50'
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                      isSelected ? 'bg-white/15 text-amber-300' : 'bg-petrol-50 text-petrol-800'
                    }`}
                  >
                    {EXAMPLE_ICONS[example.id]}
                  </span>
                  <span className="text-sm font-semibold">{example.title}</span>
                </button>
              );
            })}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs lg:col-span-7">
            <p className="text-xs font-medium text-teal-700">Exemple sélectionné</p>
            <h4 className="mt-1 font-display text-xl font-bold text-petrol-950">
              {selectedExample.title}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {selectedExample.summary}
            </p>

            <div className="mt-6 space-y-4 border-t border-slate-100 pt-5">
              <div>
                <p className="text-xs font-semibold text-slate-500">1. Déclencheur</p>
                <p className="mt-1 text-sm text-slate-800">{selectedExample.trigger}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-petrol-800">2. En automatisation classique</p>
                <p className="mt-1 text-sm text-slate-800">{selectedExample.classicalAction}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-teal-700">3. Apport possible de l&apos;IA</p>
                <p className="mt-1 text-sm text-slate-800">{selectedExample.aiAction}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
