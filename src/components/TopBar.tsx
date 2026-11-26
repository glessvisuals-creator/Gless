import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { CAMPAIGN_STEPS } from '../data/campaignData';

interface TopBarProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
}

const DESKTOP_NAV_LINKS = [
  { label: 'Accueil', step: 1 },
  { label: "Comprendre l'automatisation", step: 2 },
  { label: 'Démonstration', step: 3 },
  { label: 'Mon expérience', step: 5 },
  { label: 'Avantages et limites', step: 6 },
  { label: 'Conclusion', step: 9 },
];

export const TopBar: React.FC<TopBarProps> = ({ currentStep, onSelectStep }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (step: number) => {
    onSelectStep(step);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:gap-8">
        <button
          type="button"
          onClick={() => handleNavigate(1)}
          className="font-display text-lg font-bold tracking-tight text-petrol-800 transition-colors hover:text-teal-700 whitespace-nowrap shrink-0 cursor-pointer"
        >
          BF Tremplin
        </button>

        <nav
          aria-label="Navigation principale"
          className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600"
        >
          {DESKTOP_NAV_LINKS.map((link) => {
            const isActive =
              link.step === currentStep ||
              (link.step === 6 && currentStep === 4);
            return (
              <button
                key={link.step}
                type="button"
                onClick={() => handleNavigate(link.step)}
                className={`relative py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'text-petrol-800 font-semibold'
                    : 'text-slate-600 hover:text-petrol-800'
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-teal-600"
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => handleNavigate(7)}
            className={`rounded-lg px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentStep === 7
                ? 'bg-teal-600 text-white'
                : 'bg-petrol-800 text-white hover:bg-petrol-900'
            }`}
          >
            Quiz
          </button>

          <button
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu des sections'}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-petrol-900 transition-colors hover:bg-slate-100 lg:hidden cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Menu des sections"
          className="border-t border-slate-200 bg-white px-4 py-3 lg:hidden"
        >
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-1.5 sm:grid-cols-2">
            {CAMPAIGN_STEPS.map((step) => {
              const isCurrent = step.id === currentStep;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => handleNavigate(step.id)}
                  className={`flex items-center justify-between rounded-lg px-3.5 py-2.5 text-left text-sm font-medium transition-colors cursor-pointer ${
                    isCurrent
                      ? 'bg-petrol-800 text-white'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>
                    {step.id === 6 ? 'Avantages et limites' : step.title}
                  </span>
                  <span
                    className={`font-mono text-xs tabular-nums ${
                      isCurrent ? 'text-amber-300' : 'text-slate-400'
                    }`}
                  >
                    {step.id}/9
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
};
