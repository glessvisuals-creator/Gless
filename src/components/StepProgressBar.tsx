import React from 'react';
import { CAMPAIGN_STEPS } from '../data/campaignData';

interface StepProgressBarProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
}

export const StepProgressBar: React.FC<StepProgressBarProps> = ({
  currentStep,
  onSelectStep,
}) => {
  const totalSteps = CAMPAIGN_STEPS.length;
  const progressPercent = Math.round((currentStep / totalSteps) * 100);
  const currentInfo = CAMPAIGN_STEPS.find((s) => s.id === currentStep);

  return (
    <div className="border-b border-slate-200 bg-slate-50/80">
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 mb-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-petrol-800 tabular-nums">
              Étape {currentStep} sur {totalSteps}
            </span>
            <span aria-hidden="true" className="text-slate-300">
              ·
            </span>
            <span className="font-medium text-slate-700">{currentInfo?.title}</span>
          </div>
          <span className="font-mono text-xs text-slate-500 tabular-nums">
            {progressPercent}%
          </span>
        </div>

        <div
          role="progressbar"
          aria-valuenow={currentStep}
          aria-valuemin={1}
          aria-valuemax={totalSteps}
          aria-label={`Progression du parcours : étape ${currentStep} sur ${totalSteps}`}
          className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-petrol-800 via-teal-600 to-amber-400 transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div
          role="tablist"
          aria-label="Étapes du parcours"
          className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1"
        >
          {CAMPAIGN_STEPS.map((step) => {
            const isCurrent = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            return (
              <button
                key={step.id}
                type="button"
                role="tab"
                aria-selected={isCurrent}
                onClick={() => onSelectStep(step.id)}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isCurrent
                    ? 'bg-petrol-800 text-white shadow-xs'
                    : isCompleted
                      ? 'bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span className="font-mono tabular-nums">{step.id}.</span>
                <span>{step.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
