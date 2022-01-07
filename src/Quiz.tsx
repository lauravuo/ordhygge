import type { Component } from "solid-js";

import { createSignal } from "solid-js";

import model from "./Words";
import QuizStart from "./QuizStart";

const Quiz: Component = ({ setMode }) => {
  const [selected, setSelected] = createSignal(
    Object.keys(model).reduce(
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
  const [questions, setQuestions] = createSignal([]);

  const selectedCount = () =>
    Object.keys(model)
      .filter((item) => selected()[item].selected)
      .reduce((result, item) => result + Object.keys(model[item]).length, 0);

  const createQuiz = () => {
    let testWords = Object.keys(model)
      .filter((item) => selected()[item].selected)
      .reduce(
        (result, letter) => [
          ...result,
          ...Object.keys(model[letter]).map((w) => model[letter][w])
        ],
        []
      );
    const allWords = Object.keys(model).reduce(
      (result, letter) => [
        ...result,
        ...Object.keys(model[letter]).map((w) => model[letter][w])
      ],
      []
    );
    let questions = [];
    while (testWords.length > 0) {
      const testIndex = Math.floor(Math.random() * testWords.length);
      let question = {
        question: testWords[testIndex],
        answers: []
      };
      testWords = testWords.filter((w) => w.dk !== question.question.dk);
      let answers = [question.question];
      while (answers.length < 4) {
        const availableWords = allWords.filter(
          (word) => !answers.find((answer) => word.dk === answer.dk)
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

  return (
    <div class="max-w-screen-lg m-auto bg-gray-50 min-h-screen">
      <div class="p-4">
        <div class="bg-white p-4 rounded-md">
          <div class="flex items-center justify-between mb-8">
            <h2 class="text-xl font-bold text-gray-700">
              Ordhygge: QUIZ 0/{selectedCount()}
            </h2>
            <button class="text-indigo-600" onClick={() => setMode("list")}>
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

          <QuizStart
            selected={selected}
            setSelected={setSelected}
            start={createQuiz}
          />
        </div>
      </div>
    </div>
  );
};

export default Quiz;
