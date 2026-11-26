import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Bot,
  CheckCircle2,
  Eye,
  FileEdit,
  Info,
  Mail,
  Pause,
  Play,
  Radar,
  RotateCcw,
  UserCheck,
} from 'lucide-react';
import { SIMULATION_STEPS } from '../../data/campaignData';

const STEP_ICONS = [Mail, Radar, Bot, FileEdit, UserCheck];

export const Screen3Simulation: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [revealedCount, setRevealedCount] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasStartedOnce, setHasStartedOnce] = useState<boolean>(false);
  const [humanStatus, setHumanStatus] = useState<'pending' | 'approved' | 'edited'>('pending');
  const [draftText, setDraftText] = useState<string>(
    "Bonjour, merci pour votre intérêt pour BF Tremplin. Nos réunions d'information ont lieu chaque mardi matin. Pour votre dossier, merci de prévoir une pièce d'identité et votre CV à jour."
  );

  useEffect(() => {
    if (!isPlaying) return;

    const timer = window.setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= SIMULATION_STEPS.length) {
          setIsPlaying(false);
          return prev;
        }
        const next = prev + 1;
        setRevealedCount((currentRevealed) => Math.max(currentRevealed, next));
        return next;
      });
    }, 1800);

    return () => window.clearInterval(timer);
  }, [isPlaying]);

  const handleLaunchSimulation = () => {
    setHumanStatus('pending');
    setHasStartedOnce(true);
    if (activeStep >= SIMULATION_STEPS.length) {
      setActiveStep(1);
      setRevealedCount(1);
    } else if (revealedCount < activeStep) {
      setRevealedCount(activeStep);
    }
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setHasStartedOnce(false);
    setActiveStep(1);
    setRevealedCount(1);
    setHumanStatus('pending');
  };

  const handleRevealAll = () => {
    setIsPlaying(false);
    setHasStartedOnce(true);
    setRevealedCount(SIMULATION_STEPS.length);
  };

  const handleStepClick = (stepNumber: number) => {
    setIsPlaying(false);
    setActiveStep(stepNumber);
    setRevealedCount((prev) => Math.max(prev, stepNumber));
  };

  const currentStepData =
    SIMULATION_STEPS.find((step) => step.stepNumber === activeStep) ?? SIMULATION_STEPS[0];

  const simProgressPercent = Math.round((revealedCount / SIMULATION_STEPS.length) * 100);

  return (
    <section aria-labelledby="simulation-title" className="space-y-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div className="max-w-3xl">
          <p className="text-xs font-medium text-teal-700">Étape 3 · Démonstration visuelle</p>
          <h2
            id="simulation-title"
            className="mt-1 font-display text-2xl font-bold tracking-tight text-petrol-950 sm:text-3xl"
          >
            Que se passe-t-il lorsqu&apos;un e-mail contenant une demande d&apos;information arrive ?
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {!isPlaying ? (
            <button
              type="button"
              onClick={handleLaunchSimulation}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-petrol-800 px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-petrol-900 whitespace-nowrap cursor-pointer"
            >
              <Play className="h-4 w-4 text-amber-300" aria-hidden="true" />
              <span>Lancer la simulation</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsPlaying(false)}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-petrol-950 shadow-xs transition-colors hover:bg-amber-400 whitespace-nowrap cursor-pointer"
            >
              <Pause className="h-4 w-4" aria-hidden="true" />
              <span>Mettre en pause</span>
            </button>
          )}

          {revealedCount < SIMULATION_STEPS.length && (
            <button
              type="button"
              onClick={handleRevealAll}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-teal-300 bg-teal-50/70 px-4 py-2.5 text-sm font-medium text-teal-900 transition-colors hover:bg-teal-100 whitespace-nowrap cursor-pointer"
            >
              <Eye className="h-4 w-4" aria-hidden="true" />
              <span>Tout afficher</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 whitespace-nowrap cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            <span>Réinitialiser</span>
          </button>
        </div>
      </div>

      <div
        role="note"
        className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-sm text-petrol-950"
      >
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
        <p>
          <span className="font-semibold">Démonstration pédagogique simulée :</span> cet exemple
          illustre le fonctionnement d&apos;un workflow avec un e-mail fictif. Aucune boîte e-mail
          réelle n&apos;est connectée et aucun message n&apos;est envoyé.
        </p>
      </div>

      {/* Pipeline interactif et progressif des 5 étapes */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs">
        <div className="mb-5 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-semibold text-petrol-800">
              {isPlaying
                ? 'Simulation en cours…'
                : hasStartedOnce
                  ? 'Cliquez sur une étape révélée pour voir le détail :'
                  : 'Appuyez sur « Lancer la simulation » pour voir les étapes apparaître progressivement.'}
            </span>
            <span className="font-mono font-semibold text-teal-700 tabular-nums">
              Progression : {revealedCount} / {SIMULATION_STEPS.length} étapes ({simProgressPercent}%)
            </span>
          </div>

          <div
            role="progressbar"
            aria-valuenow={revealedCount}
            aria-valuemin={1}
            aria-valuemax={SIMULATION_STEPS.length}
            aria-label={`Progression de la simulation : ${revealedCount} sur ${SIMULATION_STEPS.length} étapes`}
            className="h-2 w-full overflow-hidden rounded-full bg-slate-100"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-petrol-800 via-teal-500 to-amber-400 transition-all duration-500 ease-out"
              style={{ width: `${simProgressPercent}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
          {SIMULATION_STEPS.map((step, index) => {
            const Icon = STEP_ICONS[index];
            const isRevealed = step.stepNumber <= revealedCount;
            const isActive = step.stepNumber === activeStep;
            const isDone = step.stepNumber < activeStep;

            if (!isRevealed) {
              return (
                <div
                  key={step.stepNumber}
                  aria-hidden="true"
                  className="flex min-h-[140px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-4 text-center"
                >
                  <span className="font-mono text-xs font-semibold text-slate-400 tabular-nums">
                    Étape 0{step.stepNumber}
                  </span>
                  <span className="mt-1 text-xs text-slate-400">En attente…</span>
                </div>
              );
            }

            return (
              <motion.button
                key={step.stepNumber}
                type="button"
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => handleStepClick(step.stepNumber)}
                aria-current={isActive ? 'step' : undefined}
                className={`group relative flex flex-col items-start rounded-xl border p-4 text-left transition-colors cursor-pointer ${
                  isActive
                    ? 'border-petrol-800 bg-petrol-800 text-white shadow-sm'
                    : isDone
                      ? 'border-teal-200 bg-teal-50/60 text-petrol-950 hover:border-teal-400'
                      : 'border-slate-200 bg-slate-50/60 text-slate-700 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                      isActive
                        ? 'bg-white/15 text-amber-300'
                        : isDone
                          ? 'bg-teal-600 text-white'
                          : 'bg-white text-petrol-800 border border-slate-200'
                    }`}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span
                    className={`font-mono text-xs font-semibold tabular-nums ${
                      isActive ? 'text-teal-200' : 'text-slate-400'
                    }`}
                  >
                    0{step.stepNumber}
                  </span>
                </div>

                <p
                  className={`mt-3 text-xs font-medium ${
                    isActive ? 'text-amber-200' : 'text-teal-700'
                  }`}
                >
                  {step.actor}
                </p>
                <p className="mt-1 text-sm font-semibold leading-snug">{step.title}</p>
                <p
                  className={`mt-1.5 text-xs leading-relaxed ${
                    isActive ? 'text-slate-200' : 'text-slate-600'
                  }`}
                >
                  {step.shortDescription}
                </p>
              </motion.button>
            );
          })}
        </div>

        {/* Panneau détaillé de l'étape sélectionnée */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStepData.stepNumber}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="mt-6 grid grid-cols-1 gap-6 border-t border-slate-200 pt-6 lg:grid-cols-12"
          >
            <div className="space-y-3 lg:col-span-6">
              <div className="flex items-center gap-2 text-xs font-medium text-teal-700">
                <span className="font-mono tabular-nums">
                  Étape {currentStepData.stepNumber} / 5
                </span>
                <span aria-hidden="true" className="text-slate-300">
                  ·
                </span>
                <span>{currentStepData.actor}</span>
              </div>

              <h3 className="font-display text-xl font-bold text-petrol-950">
                {currentStepData.title}
              </h3>

              <p className="text-sm leading-relaxed text-slate-700">
                {currentStepData.detailedExplanation}
              </p>

              <div className="pt-2">
                <p className="text-xs font-semibold text-petrol-800">À retenir</p>
                <p className="mt-1 text-sm text-slate-600">{currentStepData.keyTakeaway}</p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 lg:col-span-6">
              <p className="font-mono text-xs font-medium text-petrol-800">
                {currentStepData.sampleTitle}
              </p>

              {activeStep === 5 ? (
                <div className="mt-3 space-y-4">
                  <label
                    htmlFor="sim-draft-editor"
                    className="block text-xs font-medium text-slate-600"
                  >
                    Vous pouvez tester la validation humaine sur ce brouillon fictif :
                  </label>
                  <textarea
                    id="sim-draft-editor"
                    rows={3}
                    value={draftText}
                    onChange={(e) => {
                      setDraftText(e.target.value);
                      setHumanStatus('edited');
                    }}
                    className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-800 focus:border-teal-600"
                  />

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setHumanStatus('approved')}
                      className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-teal-700 whitespace-nowrap cursor-pointer"
                    >
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                      <span>Valider la réponse (simulation)</span>
                    </button>

                    {humanStatus === 'approved' && (
                      <span className="text-xs font-semibold text-teal-800">
                        Réponse validée manuellement (aucun envoi réel effectué).
                      </span>
                    )}
                    {humanStatus === 'edited' && (
                      <span className="text-xs font-medium text-petrol-800">
                        Brouillon ajusté par l&apos;humain. Prêt à être validé.
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <p className="mt-3 rounded-lg border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-700">
                  {currentStepData.sampleContent}
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
