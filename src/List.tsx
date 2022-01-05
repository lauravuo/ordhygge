import type { Component } from "solid-js";

import { createSignal } from "solid-js";

import model from "./Words";
import Dropdown from "./Dropdown";

const List: Component = ({ setMode }) => {
  const [langIndex, setLangIndex] = createSignal(0);
  const langs = [
    { name: "🇫🇮", value: "fi" },
    { name: "🇸🇪", value: "se" }
  ];
  return (
    <div class="max-w-screen-lg m-auto bg-gray-50 min-h-screen">
      <div>
        <div class="p-4">
          <div class="bg-white p-4 rounded-md">
            <div>
              <div class="flex items-center justify-between">
                <h2 class="text-xl font-bold text-gray-700">Ordhygge</h2>
                <div>
                  <button
                    class="bg-transparent mx-4 hover:bg-indigo-600 text-indigo-600 font-semibold hover:text-white py-2 px-2 border border-indigo-600 hover:border-transparent rounded"
                    onClick={() => setMode("quiz")}
                  >
                    QUIZ
                  </button>
                  <Dropdown
                    index={langIndex}
                    setIndex={setLangIndex}
                    options={langs}
                  />
                </div>
              </div>
              <div class="py-4">
                <For each={Object.keys(model)}>
                  {(item) => (
                    <div class="py-2">
                      <div class="flex bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-md py-2 px-2 text-white font-bold text-md">
                        {item}
                      </div>
                      <For each={Object.keys(model[item])}>
                        {(word) => (
                          <div class="flex items-center  border-b font-normal p-2 pb-6 mt-4 space-x-4">
                            <div class="w-2/12">
                              <button
                                disabled={
                                  model[item][word].audio ? false : true
                                }
                                class="
                                  bg-transparent hover:bg-indigo-600 text-indigo-600 font-semibold
                                  hover:text-white py-2 px-2 border border-indigo-600 hover:border-transparent
                                  rounded
                                  disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  onClick={() => {
                                    if (model[item][word].audio) {
                                      document.getElementById(word).play();
                                    }
                                  }}
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                                <audio
                                  id={word}
                                  preload="none"
                                  style="display: none"
                                  src={model[item][word].audio}
                                >
                                  Your browser does not support the
                                  <code>audio</code> element.
                                </audio>
                              </button>
                            </div>
                            <div class="w-5/12">{word}</div>
                            <div class="w-5/12">
                              {model[item][word][langs[langIndex()].value]}
                            </div>
                          </div>
                        )}
                      </For>
                    </div>
                  )}
                </For>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
