import React, { useState } from 'react';
import { ArrowRight, BookOpen, Play, UserRound, Workflow } from 'lucide-react';
import { SECTION_DISCOVERY_ITEMS } from '../../data/campaignData';

interface Screen1HomeProps {
  onStart: () => void;
  onJumpToStep: (step: number) => void;
}

export const Screen1Home: React.FC<Screen1HomeProps> = ({ onStart, onJumpToStep }) => {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <section aria-labelledby="hero-title" className="space-y-12 py-4 sm:py-8">
      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col justify-center lg:col-span-7">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-medium text-petrol-800">
            <span>Campagne de sensibilisation · BF Tremplin</span>
            <span aria-hidden="true" className="text-slate-300">
              /
            </span>
            <span className="text-teal-700">Tout public · 9 étapes interactives</span>
          </div>

          <h1
            id="hero-title"
            className="font-display text-3xl font-bold tracking-tight text-petrol-950 sm:text-4xl lg:text-5xl leading-[1.12]"
          >
            Et si tu automatisais ton quotidien ?
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Découvre comment l&apos;automatisation peut t&apos;aider à simplifier certaines tâches et à gagner du temps.
          </p>

          <p className="mt-4 max-w-2xl text-sm font-medium text-petrol-800">
            « L&apos;automatisation : moins de tâches répétitives, plus de temps pour l&apos;essentiel. »
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onStart}
              className="inline-flex min-h-[44px] items-center gap-2.5 rounded-xl bg-petrol-800 px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-sm transition-colors hover:bg-petrol-900 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Play className="h-4 w-4 text-amber-300" aria-hidden="true" />
              <span>Commencer l&apos;expérience</span>
            </button>

            <button
              type="button"
              onClick={onStart}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-teal-700 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Je découvre</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => onJumpToStep(3)}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-petrol-900 transition-colors hover:bg-slate-100 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Workflow className="h-4 w-4 text-teal-600" aria-hidden="true" />
              <span>Voir la démonstration</span>
            </button>

            <button
              type="button"
              onClick={() => onJumpToStep(5)}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-petrol-900 transition-colors hover:bg-slate-100 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <UserRound className="h-4 w-4 text-amber-500" aria-hidden="true" />
              <span>Découvrir mon expérience</span>
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 border-t border-slate-200 pt-6 sm:grid-cols-3">
            <div>
              <p className="text-xs font-medium text-slate-500">Comprendre</p>
              <p className="mt-1 text-sm font-semibold text-petrol-900">
                Règles simples &amp; IA expliquées sans jargon
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Expérimenter</p>
              <p className="mt-1 text-sm font-semibold text-petrol-900">
                Simulation pas à pas et quiz interactif
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Garder le cap</p>
              <p className="mt-1 text-sm font-semibold text-petrol-900">
                Limites, confidentialité et contrôle humain
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            {!imageFailed ? (
              <img
                src="/src/assets/images/hero_automation_workflow_1795695862956.jpg"
                alt="Illustration d'un flux d'automatisation avec des documents, un e-mail et une validation humaine sur tablette"
                referrerPolicy="no-referrer"
                onError={() => setImageFailed(true)}
                className="h-full min-h-[260px] w-full rounded-xl object-cover"
              />
            ) : (
              <div className="flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl bg-gradient-to-br from-petrol-50 via-white to-teal-50 p-8 text-center">
                <Workflow className="h-12 w-12 text-petrol-800" aria-hidden="true" />
                <p className="mt-3 font-display text-lg font-semibold text-petrol-900">
                  Moins de tâches répétitives, plus de temps pour l&apos;essentiel
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Accès direct à chaque section avec bouton Découvrir */}
      <div className="border-t border-slate-200 pt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-bold text-petrol-950">
              Accéder directement à une section
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Parcourez les étapes dans l&apos;ordre ou explorez directement le thème de votre choix.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <BookOpen className="h-4 w-4 text-teal-600" aria-hidden="true" />
            <span className="tabular-nums">8 sections à explorer</span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SECTION_DISCOVERY_ITEMS.map((item) => (
            <div
              key={item.step}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-colors hover:border-teal-300"
            >
              <div>
                <span className="font-mono text-xs font-semibold text-teal-700 tabular-nums">
                  Étape {item.step}
                </span>
                <h3 className="mt-1 font-display text-base font-bold text-petrol-950">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-2">
                <button
                  type="button"
                  onClick={() => onJumpToStep(item.step)}
                  className="inline-flex min-h-[40px] w-full items-center justify-center gap-2 rounded-lg border border-petrol-200 bg-petrol-50/70 px-3.5 py-2 text-xs font-semibold text-petrol-900 transition-colors hover:bg-petrol-800 hover:text-white whitespace-nowrap cursor-pointer"
                >
                  <span>Découvrir</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
