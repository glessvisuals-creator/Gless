/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { TopBar } from './components/TopBar';
import { StepProgressBar } from './components/StepProgressBar';
import { StepFooterNav } from './components/StepFooterNav';
import { Screen1Home } from './components/screens/Screen1Home';
import { Screen2Understand } from './components/screens/Screen2Understand';
import { Screen3Simulation } from './components/screens/Screen3Simulation';
import { Screen4BeforeAfter } from './components/screens/Screen4BeforeAfter';
import { Screen5Experience } from './components/screens/Screen5Experience';
import { Screen6Risks } from './components/screens/Screen6Risks';
import { Screen7Quiz } from './components/screens/Screen7Quiz';
import {
  LocalReflectionEntry,
  Screen8Participation,
} from './components/screens/Screen8Participation';
import { Screen9Conclusion } from './components/screens/Screen9Conclusion';
import {
  CAMPAIGN_STEPS,
  ExperienceJournalData,
  INITIAL_JOURNAL_DATA,
} from './data/campaignData';

const JOURNAL_STORAGE_KEY = 'bf_tremplin_experience_journal_v1';

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [stepHistory, setStepHistory] = useState<number[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [participationEntries, setParticipationEntries] = useState<LocalReflectionEntry[]>([]);
  const [journal, setJournal] = useState<ExperienceJournalData>(() => {
    try {
      const saved = window.localStorage.getItem(JOURNAL_STORAGE_KEY);
      if (saved) {
        return { ...INITIAL_JOURNAL_DATA, ...JSON.parse(saved) };
      }
    } catch {
      // Ignorer si localStorage est indisponible
    }
    return INITIAL_JOURNAL_DATA;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(journal));
    } catch {
      // Ignorer si localStorage est indisponible
    }
  }, [journal]);

  const goToStep = (step: number) => {
    const clamped = Math.max(1, Math.min(CAMPAIGN_STEPS.length, step));
    if (clamped !== currentStep) {
      setStepHistory((prev) => [...prev, currentStep]);
      setCurrentStep(clamped);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (stepHistory.length > 0) {
      const previousStep = stepHistory[stepHistory.length - 1];
      setStepHistory((prev) => prev.slice(0, -1));
      setCurrentStep(previousStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentStep(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectQuizAnswer = (questionId: number, option: string) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
  };

  const handleAddParticipation = (entry: LocalReflectionEntry) => {
    setParticipationEntries((prev) => [entry, ...prev]);
  };

  const handleRestartExperience = () => {
    setQuizAnswers({});
    setParticipationEntries([]);
    setStepHistory([]);
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderScreen = () => {
    switch (currentStep) {
      case 1:
        return (
          <Screen1Home
            onStart={() => goToStep(2)}
            onJumpToStep={(step) => goToStep(step)}
          />
        );
      case 2:
        return <Screen2Understand />;
      case 3:
        return <Screen3Simulation />;
      case 4:
        return <Screen4BeforeAfter onGoToExperience={() => goToStep(5)} />;
      case 5:
        return <Screen5Experience journal={journal} onChangeJournal={setJournal} />;
      case 6:
        return <Screen6Risks />;
      case 7:
        return (
          <Screen7Quiz
            answers={quizAnswers}
            onSelectAnswer={handleSelectQuizAnswer}
            onResetQuiz={handleResetQuiz}
            onGoNext={() => goToStep(8)}
          />
        );
      case 8:
        return (
          <Screen8Participation
            entries={participationEntries}
            onAddEntry={handleAddParticipation}
            onClearEntries={() => setParticipationEntries([])}
          />
        );
      case 9:
        return (
          <Screen9Conclusion
            quizAnswers={quizAnswers}
            participationCount={participationEntries.length}
            onRestartExperience={handleRestartExperience}
          />
        );
      default:
        return (
          <Screen1Home
            onStart={() => goToStep(2)}
            onJumpToStep={(step) => goToStep(step)}
          />
        );
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <TopBar currentStep={currentStep} onSelectStep={goToStep} />
      <StepProgressBar currentStep={currentStep} onSelectStep={goToStep} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-10">
        {currentStep > 1 && (
          <div className="mb-5">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-petrol-900 shadow-2xs transition-colors hover:bg-slate-100 whitespace-nowrap cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Retour</span>
            </button>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>

        <StepFooterNav
          currentStep={currentStep}
          onPrev={() => goToStep(currentStep - 1)}
          onNext={() => goToStep(currentStep + 1)}
        />
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:px-6">
          <p className="font-medium text-petrol-900">
            BF Tremplin · L&apos;automatisation : moins de tâches répétitives, plus de temps pour
            l&apos;essentiel.
          </p>
          <p>Support pédagogique interactif · Aucune donnée personnelle collectée</p>
        </div>
      </footer>
    </div>
  );
}
