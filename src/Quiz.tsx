import type { Component } from "solid-js";

import { createSignal, Show } from "solid-js";

import { Words } from "./Words";
import QuizStart, { SelectionData } from "./QuizStart";
import QuizStep, { Question, ResultRow, Word } from "./QuizStep";
import QuizEnd from "./QuizEnd";

interface QuizProps {
  setMode: (mode: string) => void;
  langIndex: () => number;
  langs: { name: string; value: string }[];
  model: Words
}

interface WordsByCategory {
  [key: string]: Word[];
}

const Quiz: Component<QuizProps> = (props) => {
  const [selected, setSelected] = createSignal(
    Object.keys(props.model).reduce(
      (result, item) => ({
        ...result,
        [item]: {
          selected: false,
          bgColor: "bg-white",
          textColor: "text-indigo-600"
        }
      }),
      {}
    )
  );
  const [step, setStep] = createSignal(0);
  const [questions, setQuestions] = createSignal<Question[]>([]);
  const [result, setResult] = createSignal<ResultRow[]>([]);

  const selectedCount = () =>
    Object.keys(props.model)
      .filter((item) => (selected() as SelectionData)[item].selected)
      .reduce((result, item) => result + Object.keys(props.model[item]).length, 0);

  const createQuiz = () => {
    let testWords: Word[] = Object.keys(props.model)
      .filter((item) => (selected() as SelectionData)[item].selected)
      .reduce(
        (result: Word[], letter) => [
          ...result,
          ...Object.keys(props.model[letter]).map((w) => props.model[letter][w])
        ],
        []
      );
    const wordsByTypes: WordsByCategory = Object.keys(props.model).reduce(
      (result, letter) => {
        const letterTypes = Object.keys(props.model[letter]).reduce(
          (letterResult: WordsByCategory, w) => {
            const prevItems = letterResult[props.model[letter][w].wordType] || [];
            return {
              ...letterResult,
              [props.model[letter][w].wordType]: [...prevItems, props.model[letter][w]]
            };
          },
          {}
        );
        return Object.keys(letterTypes).reduce(
          (categoryResult: WordsByCategory, category) => {
            const prevItems = categoryResult[category] || [];
            return {
              ...categoryResult,
              [category]: [...prevItems, ...letterTypes[category]]
            };
          },
          result
        );
      },
      {}
    );

    const questions: Question[] = [];
    while (testWords.length > 0) {
      const testIndex = Math.floor(Math.random() * testWords.length);
      const question: Question = {
        question: testWords[testIndex],
        answers: []
      };
      testWords = testWords.filter((w) => w.dk !== question.question.dk);
      const answers = [question.question];
      while (answers.length < 4) {
        // TODO: if answer candidate includes words from the question answer, skip it
        const availableWords = wordsByTypes[question.question.wordType].filter(
          (word) =>
            !answers.find((answer) => word.dk === answer.dk) &&
            !answers.find(
              (answer) => answer.fi === word.fi || answer.se === word.se
            )
        );
        const allIndex = Math.floor(Math.random() * availableWords.length);
        if (Math.floor(Math.random() * 2) === 0) {
          answers.push(availableWords[allIndex]);
        } else {
          answers.unshift(availableWords[allIndex]);
        }
      }
      question.answers = answers;
      questions.push(question);
    }
    setQuestions(questions);
    setStep(1);
  };

  // TODO: update view based on step, record answer on click, result view

  return (
    <div class="max-w-screen-lg m-auto bg-gray-50 min-h-screen">
      <div class="p-4">
        <div class="bg-white p-4 rounded-md">
          <div class="flex items-center justify-between mb-8">
            <h2 class="text-xl font-bold text-gray-700">
              {step() <= questions().length
                ? `Ordhygge: QUIZ ${step()}/${selectedCount()}`
                : "Ordhygge: QUIZ resultat"}
            </h2>
            <button class="text-indigo-600" onClick={() => props.setMode("list")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <Show
            when={step() > 0}
            fallback={
              <QuizStart
                selected={selected}
                setSelected={setSelected}
                start={createQuiz}
                model={props.model}
              />
            }
          >
            <Show
              when={step() <= questions().length}
              fallback={
                <QuizEnd
                  result={result}
                  setMode={props.setMode}
                  langIndex={props.langIndex}
                  langs={props.langs}
                />
              }
            >
              <QuizStep
                langIndex={props.langIndex}
                langs={props.langs}
                questions={questions}
                step={step}
                setStep={setStep}
                result={result}
                setResult={setResult}
              />
            </Show>
          </Show>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
