import type { Component } from "solid-js";

import { createSignal } from "solid-js";

import model from "./Words";
import Dropdown from "./Dropdown";
import { Result } from "postcss";

const Quiz: Component = () => {
  const [langIndex, setLangIndex] = createSignal(0);
  const langs = [
    { name: "🇫🇮", value: "fi" },
    { name: "🇸🇪", value: "se" }
  ];
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
  console.log(selected());
  return (
    <div class="max-w-screen-lg m-auto bg-gray-50 min-h-screen">
      <div class="p-4">
        <div class="bg-white p-4 rounded-md">
          <h2 class="text-xl font-bold text-gray-700 mb-8">Ordhygge: QUIZ</h2>

          <div class="bg-gray-50">
            <div class="flex bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-md py-2 px-2 text-white font-bold text-md">
              Bogstaver
            </div>
            <div class="px-2 flex flex-wrap items-center">
              <For each={Object.keys(model)}>
                {(item) => {
                  return (
                    <button
                      class={`w-12 text-lg ${
                        selected()[item].bgColor
                      } mx-2 my-2  ${
                        selected()[item].textColor
                      } font-semibold py-2 px-2 border border-indigo-600 rounded`}
                      onClick={() => {
                        const isSelected = selected()[item].selected;
                        const newSelection = {
                          ...selected(),
                          [item]: {
                            selected: !isSelected,
                            bgColor: !isSelected ? "bg-indigo-600" : "bg-white",
                            textColor: !isSelected
                              ? "text-white"
                              : "text-indigo-600"
                          }
                        };

                        console.log(selected(), isSelected);
                        setSelected(newSelection);
                      }}
                    >
                      {item}
                    </button>
                  );
                }}
              </For>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
