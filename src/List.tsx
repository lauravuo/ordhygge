import type { Component } from "solid-js";

import { createSignal } from "solid-js";

import model from "./Words";
import Dropdown from "./Dropdown";

const List: Component = () => {
  // TODO: play word from ordbog
  // TODO: quiz mode -> filter letters > correct + three random answers
  const [langIndex, setLangIndex] = createSignal(0);
  const langs = [
    { name: "🇫🇮", value: "fi" },
    { name: "🇸🇪", value: "se" }
  ];
  return (
    <div>
      <div class="bg-gray-50 min-h-screen">
        <div>
          <div class="p-4">
            <div class="bg-white p-4 rounded-md">
              <div>
                <div class="flex justify-between">
                  <h2 class="mb-4 text-xl font-bold text-gray-700">Ordhygge</h2>
                  <Dropdown
                    index={langIndex}
                    setIndex={setLangIndex}
                    options={langs}
                  />
                </div>
                <div>
                  <For each={Object.keys(model)}>
                    {(item) => (
                      <div class="py-2">
                        <div class="flex justify-between bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-md py-2 px-2 text-white font-bold text-md">
                          {item}
                        </div>
                        <For each={Object.keys(model[item])}>
                          {(word) => (
                            <div class="flex border-b font-normal p-2 mt-4 space-x-4">
                              <div class="w-1/2">{word}</div>
                              <div class="w-1/2">
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
    </div>
  );
};

export default List;
