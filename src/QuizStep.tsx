import { Component, createSignal } from "solid-js";

const QuizStep: Component = ({
  questions,
  step,
  setStep,
  result,
  setResult,
  langIndex,
  langs
}) => {
  const [bgColor, setBgColor] = createSignal(
    questions()[step() - 1].answers.map(() => "bg-transparent")
  );
  const [answered, setAnswered] = createSignal(false);
  const check = ({ answer, index }) => {
    const bgColors = bgColor();
    const correct = answer.dk === questions()[step() - 1].question.dk;
    bgColors[index] = correct ? "bg-green-100" : "bg-red-100";
    setBgColor(bgColors);
    setResult([
      ...result(),
      { question: questions()[step() - 1], answer, correct }
    ]);
    setAnswered(true);
    setTimeout(next, 1000);
  };
  const next = () => {
    setBgColor(questions()[step() - 1].answers.map(() => "bg-transparent"));
    setAnswered(false);
    setStep(step() + 1);
  };
  return (
    <div class="text-center h-full relative">
      <h3 class="m-4 text-2xl">{questions()[step() - 1].question.dk}</h3>
      <div>
        <For each={questions()[step() - 1].answers}>
          {(answer, index) => (
            <div>
              <button
                disabled={answered()}
                class={`text-xl m-4 h-24 w-1/2 ${
                  bgColor()[index()]
                } text-indigo-600 py-2 px-2 border border-indigo-600 rounded disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none"`}
                onClick={() => check({ answer, index: index() })}
              >
                {answer[langs[langIndex()].value]}
              </button>
            </div>
          )}
        </For>
      </div>
      {answered() && (
        <button
          class="absolute bottom-3 right-0 text-indigo-600"
          onClick={() => next()}
        >
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
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>{" "}
        </button>
      )}
    </div>
  );
};

export default QuizStep;
