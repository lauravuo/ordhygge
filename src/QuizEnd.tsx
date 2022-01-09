import type { Component } from "solid-js";

import model from "./Words";

const QuizEnd: Component = ({ result }) => {
  console.log(result());
  return (
    <div>
      <For each={result()}>
        {(item) => (
          <div class="flex">
            {item.correct ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
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
                class="h-6 w-6"
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
            <div class="px-6 w-48">{item.question.question.dk}</div>
            <div>{item.question.question.fi}</div>
          </div>
        )}
      </For>
    </div>
  );
};

export default QuizEnd;
