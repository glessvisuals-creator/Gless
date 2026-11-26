import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CAMPAIGN_STEPS } from '../data/campaignData';

interface StepFooterNavProps {
  currentStep: number;
  onPrev: () => void;
  onNext: () => void;
}

export const StepFooterNav: React.FC<StepFooterNavProps> = ({
  currentStep,
  onPrev,
  onNext,
}) => {
  const prevStep = CAMPAIGN_STEPS.find((s) => s.id === currentStep - 1);
  const nextStep = CAMPAIGN_STEPS.find((s) => s.id === currentStep + 1);

  if (currentStep === 1) {
    return null;
  }

  return (
    <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
      {prevStep ? (
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Étape précédente · {prevStep.shortLabel}</span>
        </button>
      ) : (
        <div />
      )}

      {nextStep && (
        <button
          type="button"
          onClick={onNext}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-petrol-800 px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-petrol-900 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <span>Étape suivante · {nextStep.shortLabel}</span>
          <ArrowRight className="h-4 w-4 text-amber-300" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};
