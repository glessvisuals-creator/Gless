import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Compass,
  Eye,
  Lightbulb,
  PenLine,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Wrench,
} from 'lucide-react';
import {
  ExperienceJournalData,
  INITIAL_JOURNAL_DATA,
  JOURNAL_FIELDS,
  REFLECTION_JOURNAL_FIELDS,
} from '../../data/campaignData';

interface Screen5ExperienceProps {
  journal: ExperienceJournalData;
  onChangeJournal: (updated: ExperienceJournalData) => void;
}

const REFLECTION_ICONS = [Compass, Lightbulb, Wrench, Sparkles, ShieldAlert];

export const Screen5Experience: React.FC<Screen5ExperienceProps> = ({
  journal,
  onChangeJournal,
}) => {
  const [viewMode, setViewMode] = useState<'edit' | 'present'>('edit');
  const [activeBlock, setActiveBlock] = useState<'reflection' | 'case-study'>('reflection');

  const handleFieldChange = (key: keyof ExperienceJournalData, value: string) => {
    onChangeJournal({
      ...journal,
      [key]: value,
    });
  };

  const allFields = [...REFLECTION_JOURNAL_FIELDS, ...JOURNAL_FIELDS];
  const filledCount = allFields.filter((f) => journal[f.key].trim().length > 0).length;

  return (
    <section aria-labelledby="experience-title" className="space-y-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div className="max-w-2xl">
          <p className="text-xs font-medium text-teal-700">
            Étape 5 · Retour d&apos;expérience personnalisable
          </p>
          <h2
            id="experience-title"
            className="mt-1 font-display text-2xl font-bold tracking-tight text-petrol-950 sm:text-3xl"
          >
            Ce que l&apos;automatisation m&apos;a apporté
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Complétez librement ces blocs avec votre expérience réelle de formation à BF Tremplin.
            Vos textes restent enregistrés uniquement sur cet appareil.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <div
            role="group"
            aria-label="Mode d'affichage du retour d'expérience"
            className="inline-flex items-center gap-1 rounded-lg bg-slate-200/70 p-1"
          >
            <button
              type="button"
              onClick={() => setViewMode('edit')}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                viewMode === 'edit'
                  ? 'bg-white text-petrol-900 shadow-xs'
                  : 'text-slate-600 hover:text-petrol-900'
              }`}
            >
              <PenLine className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Éditer</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('present')}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                viewMode === 'present'
                  ? 'bg-white text-petrol-900 shadow-xs'
                  : 'text-slate-600 hover:text-petrol-900'
              }`}
            >
              <Eye className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Vue présentation</span>
            </button>
          </div>

          {filledCount > 0 && (
            <button
              type="button"
              onClick={() => onChangeJournal(INITIAL_JOURNAL_DATA)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 whitespace-nowrap cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Effacer</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          role="tablist"
          aria-label="Parties du journal d'expérience"
          className="inline-flex items-center gap-1 rounded-xl bg-slate-200/70 p-1"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeBlock === 'reflection'}
            onClick={() => setActiveBlock('reflection')}
            className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
              activeBlock === 'reflection'
                ? 'bg-petrol-800 text-white shadow-xs'
                : 'text-slate-700 hover:text-petrol-900'
            }`}
          >
            Bilan de formation (5 cartes)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeBlock === 'case-study'}
            onClick={() => setActiveBlock('case-study')}
            className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
              activeBlock === 'case-study'
                ? 'bg-petrol-800 text-white shadow-xs'
                : 'text-slate-700 hover:text-petrol-900'
            }`}
          >
            Cas concret détaillé (6 rubriques)
          </button>
        </div>

        <span className="text-xs text-slate-500 tabular-nums">
          {filledCount} / {allFields.length} zones complétées · Aucune donnée transmise
        </span>
      </div>

      {viewMode === 'edit' ? (
        activeBlock === 'reflection' ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {REFLECTION_JOURNAL_FIELDS.map((field, index) => {
              const value = journal[field.key];
              const inputId = `journal-${field.key}`;
              const Icon = REFLECTION_ICONS[index];
              return (
                <motion.div
                  key={field.key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, delay: index * 0.05 }}
                  whileHover={{ y: -2 }}
                  className={`flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-xs ${
                    index === 4 ? 'md:col-span-2' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-petrol-50 text-petrol-800">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <label
                        htmlFor={inputId}
                        className="font-display text-base font-semibold text-petrol-950"
                      >
                        {field.label}
                      </label>
                      <p className="mt-0.5 text-xs text-slate-500">{field.helper}</p>
                    </div>
                  </div>

                  <textarea
                    id={inputId}
                    rows={3}
                    value={value}
                    onChange={(e) => handleFieldChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className="mt-3 w-full flex-1 rounded-xl border border-slate-300 bg-slate-50/70 p-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-teal-600 focus:bg-white"
                  />
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {JOURNAL_FIELDS.map((field, index) => {
              const value = journal[field.key];
              const inputId = `journal-${field.key}`;
              return (
                <motion.div
                  key={field.key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, delay: index * 0.04 }}
                  whileHover={{ y: -2 }}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-xs"
                >
                  <label
                    htmlFor={inputId}
                    className="font-display text-base font-semibold text-petrol-950"
                  >
                    {field.label}
                  </label>
                  <p className="mt-1 text-xs text-slate-500">{field.helper}</p>

                  {field.multiline ? (
                    <textarea
                      id={inputId}
                      rows={3}
                      value={value}
                      onChange={(e) => handleFieldChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="mt-3 w-full flex-1 rounded-xl border border-slate-300 bg-slate-50/70 p-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-teal-600 focus:bg-white"
                    />
                  ) : (
                    <input
                      id={inputId}
                      type="text"
                      value={value}
                      onChange={(e) => handleFieldChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="mt-3 w-full rounded-xl border border-slate-300 bg-slate-50/70 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-teal-600 focus:bg-white"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        )
      ) : (
        <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="font-display text-xl font-bold text-petrol-950">
              Synthèse de mon retour d&apos;expérience
            </h3>
            <span className="text-xs font-medium text-teal-700">BF Tremplin</span>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {(activeBlock === 'reflection' ? REFLECTION_JOURNAL_FIELDS : JOURNAL_FIELDS).map(
              (field) => {
                const content = journal[field.key].trim();
                return (
                  <div key={field.key} className="space-y-1.5 border-b border-slate-100 pb-4">
                    <p className="text-xs font-semibold text-petrol-800">{field.label}</p>
                    {content ? (
                      <p className="whitespace-pre-line text-sm leading-relaxed text-slate-800">
                        {content}
                      </p>
                    ) : (
                      <p className="text-sm italic text-slate-400">
                        Rubrique non renseignée pour le moment (passez en mode Éditer pour
                        compléter).
                      </p>
                    )}
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}
    </section>
  );
};
