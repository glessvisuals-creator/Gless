import React, { useState } from 'react';
import {
  AlertTriangle,
  EyeOff,
  Lock,
  Scale,
  ShieldAlert,
  Unplug,
  UserCheck,
} from 'lucide-react';
import { RISK_ITEMS } from '../../data/campaignData';

const RISK_ICONS: Record<string, React.ReactNode> = {
  errors: <AlertTriangle className="h-5 w-5" aria-hidden="true" />,
  bias: <Scale className="h-5 w-5" aria-hidden="true" />,
  confidentiality: <Lock className="h-5 w-5" aria-hidden="true" />,
  'personal-data': <EyeOff className="h-5 w-5" aria-hidden="true" />,
  dependency: <Unplug className="h-5 w-5" aria-hidden="true" />,
  'human-control': <UserCheck className="h-5 w-5" aria-hidden="true" />,
};

export const Screen6Risks: React.FC = () => {
  const [showGoodPractices, setShowGoodPractices] = useState<boolean>(true);

  return (
    <section aria-labelledby="risks-title" className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-3xl">
          <p className="text-xs font-medium text-teal-700">Étape 6 · Esprit critique et vigilance</p>
          <h2
            id="risks-title"
            className="mt-1 font-display text-2xl font-bold tracking-tight text-petrol-950 sm:text-3xl"
          >
            Les limites et les risques
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            L&apos;automatisation et l&apos;IA sont des outils utiles lorsqu&apos;on connaît leurs
            limites. Voici 6 points de vigilance essentiels à garder en tête, sans dramatiser.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowGoodPractices((prev) => !prev)}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-petrol-900 transition-colors hover:bg-slate-100 whitespace-nowrap shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <ShieldAlert className="h-4 w-4 text-teal-600" aria-hidden="true" />
          <span>
            {showGoodPractices ? 'Masquer les bons réflexes' : 'Afficher les bons réflexes'}
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {RISK_ITEMS.map((item) => (
          <article
            key={item.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs"
          >
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  {RISK_ICONS[item.id]}
                </div>
                <h3 className="font-display text-base font-bold leading-snug text-petrol-950">
                  {item.title}
                </h3>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                {item.riskDescription}
              </p>
            </div>

            {showGoodPractices && (
              <div className="mt-5 border-t border-slate-100 pt-4">
                <p className="text-xs font-semibold text-teal-700">Bon réflexe</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-700">
                  {item.goodPractice}
                </p>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};
