import React, { useState } from 'react';
import { Check, Compass, RotateCcw, Share2 } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../../data/campaignData';

interface Screen9ConclusionProps {
  quizAnswers: Record<number, string>;
  participationCount: number;
  onRestartExperience: () => void;
}

export const Screen9Conclusion: React.FC<Screen9ConclusionProps> = ({
  quizAnswers,
  participationCount,
  onRestartExperience,
}) => {
  const [imageFailed, setImageFailed] = useState(false);
  const [copied, setCopied] = useState(false);

  const answeredCount = Object.keys(quizAnswers).length;
  const score = QUIZ_QUESTIONS.reduce(
    (acc, q) => (quizAnswers[q.id] === q.correctAnswer ? acc + 1 : acc),
    0
  );

  const handleCopyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section aria-labelledby="conclusion-title" className="py-2 sm:py-4">
      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs lg:col-span-7">
          <div>
            <p className="text-xs font-medium text-teal-700">Étape 9 · Conclusion · BF Tremplin</p>
            <h2
              id="conclusion-title"
              className="mt-2 font-display text-2xl font-bold leading-snug tracking-tight text-petrol-950 sm:text-3xl"
            >
              L&apos;automatisation est un outil pour simplifier certaines tâches. Le but n&apos;est
              pas de tout automatiser, mais de choisir ce qui nous aide réellement.
            </h2>

            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50/70 p-5">
              <p className="text-xs font-semibold text-petrol-800">Message clé à retenir</p>
              <p className="mt-1.5 font-display text-lg font-bold text-petrol-950 sm:text-xl">
                « Automatise ce qui te fait perdre du temps. Garde ton esprit critique. »
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 border-t border-slate-100 pt-5 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-slate-500">Votre mini-quiz</p>
                <p className="mt-1 text-sm font-semibold text-petrol-900 tabular-nums">
                  {answeredCount > 0
                    ? `${score} / ${QUIZ_QUESTIONS.length} bonnes réponses (${answeredCount} question${answeredCount > 1 ? 's' : ''} répondue${answeredCount > 1 ? 's' : ''})`
                    : 'Non complété durant ce passage'}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Idées partagées en session</p>
                <p className="mt-1 text-sm font-semibold text-petrol-900 tabular-nums">
                  {participationCount > 0
                    ? `${participationCount} piste${participationCount > 1 ? 's' : ''} affichée${participationCount > 1 ? 's' : ''} localement`
                    : 'Aucune piste ajoutée pour le moment'}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-6">
            <button
              type="button"
              onClick={onRestartExperience}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-petrol-800 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-petrol-900 whitespace-nowrap cursor-pointer"
            >
              <RotateCcw className="h-4 w-4 text-amber-300" aria-hidden="true" />
              <span>Recommencer</span>
            </button>

            <button
              type="button"
              onClick={handleCopyShareLink}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-petrol-900 transition-colors hover:bg-slate-100 whitespace-nowrap cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-teal-600" aria-hidden="true" />
                  <span>Lien copié</span>
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4 text-teal-600" aria-hidden="true" />
                  <span>Partager le lien</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-xs">
            {!imageFailed ? (
              <img
                src="/src/assets/images/conclusion_human_clarity_1795695863611.jpg"
                alt="Illustration d'une personne travaillant sereinement à son bureau avec clarté et esprit critique"
                referrerPolicy="no-referrer"
                onError={() => setImageFailed(true)}
                className="h-full min-h-[260px] w-full rounded-xl object-cover"
              />
            ) : (
              <div className="flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl bg-gradient-to-br from-petrol-50 via-white to-amber-50 p-8 text-center">
                <Compass className="h-12 w-12 text-petrol-800" aria-hidden="true" />
                <p className="mt-3 font-display text-lg font-semibold text-petrol-900">
                  Automatise ce qui te fait perdre du temps. Garde ton esprit critique.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
