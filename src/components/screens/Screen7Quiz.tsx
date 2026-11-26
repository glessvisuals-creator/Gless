import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, RotateCcw, XCircle } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../../data/campaignData';

interface Screen7QuizProps {
  answers: Record<number, string>;
  onSelectAnswer: (questionId: number, option: string) => void;
  onResetQuiz: () => void;
  onGoNext: () => void;
}

export const Screen7Quiz: React.FC<Screen7QuizProps> = ({
  answers,
  onSelectAnswer,
  onResetQuiz,
  onGoNext,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];
  const selectedAnswer = answers[currentQuestion.id];
  const isAnswered = Boolean(selectedAnswer);
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  const totalQuestions = QUIZ_QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;
  const score = QUIZ_QUESTIONS.reduce(
    (acc, q) => (answers[q.id] === q.correctAnswer ? acc + 1 : acc),
    0
  );
  const allAnswered = answeredCount === totalQuestions;

  const handleRestart = () => {
    onResetQuiz();
    setCurrentIndex(0);
  };

  return (
    <section aria-labelledby="quiz-title" className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <p className="text-xs font-medium text-teal-700">Étape 7 · Testez vos réflexes</p>
          <h2
            id="quiz-title"
            className="mt-1 font-display text-2xl font-bold tracking-tight text-petrol-950 sm:text-3xl"
          >
            Mini-quiz en 5 questions
          </h2>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <span className="font-mono font-medium text-petrol-800 tabular-nums">
            Score actuel : {score} / {totalQuestions}
          </span>
          {answeredCount > 0 && (
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 whitespace-nowrap cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Recommencer le quiz</span>
            </button>
          )}
        </div>
      </div>

      {/* Navigation entre les 5 questions */}
      <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Questions du quiz">
        {QUIZ_QUESTIONS.map((q, idx) => {
          const userAns = answers[q.id];
          const answered = Boolean(userAns);
          const correct = userAns === q.correctAnswer;
          const active = idx === currentIndex;

          return (
            <button
              key={q.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setCurrentIndex(idx)}
              className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors tabular-nums cursor-pointer ${
                active
                  ? 'bg-petrol-800 text-white'
                  : answered
                    ? correct
                      ? 'border border-teal-300 bg-teal-50 text-teal-900'
                      : 'border border-amber-300 bg-amber-50 text-amber-900'
                    : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              Question {q.id}
            </button>
          );
        })}
      </div>

      {/* Carte question active */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <p className="font-mono text-xs font-medium text-slate-500 tabular-nums">
          Question {currentQuestion.id} sur {totalQuestions}
        </p>

        <h3 className="mt-2 font-display text-xl font-bold text-petrol-950 sm:text-2xl">
          {currentQuestion.question}
        </h3>

        <div className="mt-6 space-y-3">
          {currentQuestion.options.map((option) => {
            const isThisSelected = selectedAnswer === option;
            const isThisCorrect = option === currentQuestion.correctAnswer;

            let buttonStyle =
              'border-slate-200 bg-white text-slate-800 hover:border-petrol-700 hover:bg-petrol-50/40';

            if (isAnswered) {
              if (isThisCorrect) {
                buttonStyle = 'border-teal-600 bg-teal-50 text-teal-950 font-semibold';
              } else if (isThisSelected && !isThisCorrect) {
                buttonStyle = 'border-rose-400 bg-rose-50 text-rose-950';
              } else {
                buttonStyle = 'border-slate-200 bg-slate-50 text-slate-500';
              }
            }

            return (
              <button
                key={option}
                type="button"
                disabled={isAnswered}
                onClick={() => onSelectAnswer(currentQuestion.id, option)}
                className={`flex w-full items-center justify-between gap-4 rounded-xl border px-5 py-4 text-left text-sm sm:text-base transition-colors ${
                  !isAnswered ? 'cursor-pointer' : 'cursor-default'
                } ${buttonStyle}`}
              >
                <span>{option}</span>
                {isAnswered && isThisCorrect && (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-teal-700" aria-hidden="true" />
                )}
                {isAnswered && isThisSelected && !isThisCorrect && (
                  <XCircle className="h-5 w-5 shrink-0 text-rose-600" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div
            role="status"
            className={`mt-6 rounded-xl border p-4 ${
              isCorrect
                ? 'border-teal-200 bg-teal-50/70 text-teal-950'
                : 'border-amber-200 bg-amber-50/70 text-petrol-950'
            }`}
          >
            <p className="text-sm font-bold">
              {isCorrect ? 'Bonne réponse !' : `Réponse attendue : ${currentQuestion.correctAnswer}`}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-700">
              {currentQuestion.explanation}
            </p>

            {currentIndex < totalQuestions - 1 && (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setCurrentIndex((prev) => prev + 1)}
                  className="inline-flex items-center gap-2 rounded-lg bg-petrol-800 px-4 py-2 text-xs font-semibold text-white hover:bg-petrol-900 whitespace-nowrap cursor-pointer"
                >
                  <span>Question suivante</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Résultat final et conclusion lorsque les 5 questions ont été répondues */}
      {allAnswered && (
        <div className="flex flex-col justify-between gap-4 rounded-2xl border border-petrol-200 bg-petrol-50/60 p-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold text-teal-700">Conclusion du quiz</p>
            <h4 className="mt-1 font-display text-xl font-bold text-petrol-950 tabular-nums">
              Votre score final : {score} / {totalQuestions}
            </h4>
            <p className="mt-1 text-sm text-slate-700">
              {score === 5
                ? "Bravo ! Vous maîtrisez les repères essentiels pour automatiser avec esprit critique."
                : score >= 3
                  ? "Bon score ! Vous avez déjà les principaux réflexes d'usage et de vigilance."
                  : "Ce quiz sert justement à repérer les points clés : l'automatisation assiste, mais l'humain vérifie."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 whitespace-nowrap cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Recommencer</span>
            </button>
            <button
              type="button"
              onClick={onGoNext}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-petrol-800 px-4 py-2.5 text-xs font-semibold text-white hover:bg-petrol-900 whitespace-nowrap cursor-pointer"
            >
              <span>Découvrir la suite</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
