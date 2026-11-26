import React, { useState } from 'react';
import { ArrowRight, Check, Clock, ShieldCheck, UserRound } from 'lucide-react';
import { AFTER_ITEMS, BEFORE_ITEMS } from '../../data/campaignData';

interface Screen4BeforeAfterProps {
  onGoToExperience: () => void;
}

export const Screen4BeforeAfter: React.FC<Screen4BeforeAfterProps> = ({ onGoToExperience }) => {
  const [focusView, setFocusView] = useState<'compare' | 'before' | 'after'>('compare');

  return (
    <section aria-labelledby="before-after-title" className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <p className="text-xs font-medium text-teal-700">Étape 4 · Comparaison visuelle</p>
          <h2
            id="before-after-title"
            className="mt-1 font-display text-2xl font-bold tracking-tight text-petrol-950 sm:text-3xl"
          >
            Avant et après l&apos;automatisation
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Ce qui change concrètement dans la répartition entre le traitement répétitif et le rôle
            de décision de la personne.
          </p>
        </div>

        <div
          role="group"
          aria-label="Mode d'affichage avant ou après"
          className="inline-flex items-center gap-1 rounded-lg bg-slate-200/70 p-1 self-start sm:self-auto"
        >
          <button
            type="button"
            onClick={() => setFocusView('compare')}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
              focusView === 'compare'
                ? 'bg-white text-petrol-900 shadow-xs'
                : 'text-slate-600 hover:text-petrol-900'
            }`}
          >
            Côte à côte
          </button>
          <button
            type="button"
            onClick={() => setFocusView('before')}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
              focusView === 'before'
                ? 'bg-white text-petrol-900 shadow-xs'
                : 'text-slate-600 hover:text-petrol-900'
            }`}
          >
            Avant
          </button>
          <button
            type="button"
            onClick={() => setFocusView('after')}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
              focusView === 'after'
                ? 'bg-white text-petrol-900 shadow-xs'
                : 'text-slate-600 hover:text-petrol-900'
            }`}
          >
            Après
          </button>
        </div>
      </div>

      <div
        className={`grid grid-cols-1 gap-6 ${
          focusView === 'compare' ? 'md:grid-cols-2' : 'max-w-2xl'
        }`}
      >
        {(focusView === 'compare' || focusView === 'before') && (
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <div>
              <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <p className="text-xs font-medium text-slate-500">Processus entièrement manuel</p>
                  <h3 className="mt-0.5 font-display text-xl font-bold text-slate-800">AVANT</h3>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>

              <ol className="mt-5 space-y-4">
                {BEFORE_ITEMS.map((item, idx) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-100 font-mono text-xs font-semibold text-slate-600 tabular-nums">
                      {idx + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-slate-700">{item}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-6 border-t border-slate-100 pt-4 text-xs text-slate-500">
              Toutes les manipulations, y compris les plus répétitives, reposent sur la même attention.
            </div>
          </div>
        )}

        {(focusView === 'compare' || focusView === 'after') && (
          <div className="flex flex-col justify-between rounded-2xl border border-teal-200 bg-gradient-to-b from-teal-50/50 to-white p-6 shadow-xs">
            <div>
              <div className="flex items-center justify-between gap-4 border-b border-teal-200/60 pb-4">
                <div>
                  <p className="text-xs font-medium text-teal-800">Avec workflow et contrôle humain</p>
                  <h3 className="mt-0.5 font-display text-xl font-bold text-petrol-950">APRÈS</h3>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>

              <ul className="mt-5 space-y-4">
                {AFTER_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-teal-600 text-white">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium leading-relaxed text-petrol-950">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex items-center gap-2 border-t border-teal-200/60 pt-4 text-xs font-medium text-petrol-800">
              <ArrowRight className="h-4 w-4 shrink-0 text-amber-500" aria-hidden="true" />
              <span>
                L&apos;objectif est de réduire la charge répétitive pour consacrer son attention à
                l&apos;analyse et à l&apos;humain.
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <div>
          <p className="text-sm font-semibold text-petrol-950">
            Envie de voir un retour concret issu de la formation ?
          </p>
          <p className="text-xs text-slate-600">
            Accédez à l&apos;espace personnalisable dédié à l&apos;expérience vécue à BF Tremplin.
          </p>
        </div>

        <button
          type="button"
          onClick={onGoToExperience}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-700 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <UserRound className="h-4 w-4" aria-hidden="true" />
          <span>Découvrir mon expérience</span>
        </button>
      </div>
    </section>
  );
};
