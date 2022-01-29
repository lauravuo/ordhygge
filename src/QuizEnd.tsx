import type { Component } from "solid-js";
import { For } from "solid-js";

import { ResultRow } from "./QuizStep";

interface QuizEndProps {
  result: () => ResultRow[];
  setMode: (mode: string) => void;
  langIndex: () => number;
  langs: { name: string; value: string }[];
}

const QuizEnd: Component<QuizEndProps> = ({
  result,
  setMode,
  langIndex,
  langs
}) => {
  const resText = `${result().reduce(
    (res, item) => (item.correct ? res + 1 : res),
    0
  )}/${result().length}`;
  console.log(langs[langIndex()]);
  return (
    <div>
      <For each={result()}>
        {(item, index) => (
          <div class="flex mb-1 odd:bg-gray-100">
            <div class="pr-4 w-1/12">{index() + 1}.</div>
            {item.correct ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 w-1/12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="green"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 w-1/12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="red"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
            <div class="px-6 w-5/12">{item.question.question.dk}</div>
            <div class="w-5/12">
              {
                item.question.question[
                  langs[langIndex()].value as "dk" | "fi" | "se"
                ]
              }
              {!item.correct && (
                <div class="text-gray-600">
                  (
                  <span class="line-through">
                    {
                      item.answer[
                        langs[langIndex()].value as "dk" | "fi" | "se"
                      ]
                    }
                  </span>
                  )
                </div>
              )}
            </div>
          </div>
        )}
      </For>
      <div class="text-center text-lg mt-6">
        <div>{resText} points</div>
        <button
          class="mt-4 bg-transparent mx-4 hover:bg-indigo-600 text-indigo-600 font-semibold hover:text-white py-2 px-2 border border-indigo-600 hover:border-transparent rounded"
          onClick={() => setMode("list")}
        >
          Læs mere
        </button>
      </div>
    </div>
  );
};

export default QuizEnd;
