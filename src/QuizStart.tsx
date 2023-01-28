import type { Component } from "solid-js";
import { For } from "solid-js";

import { Words } from './Words'

export interface SelectionData {
  [key: string]: { selected: boolean; bgColor: string; textColor: string };
}

interface QuizStartProps {
  selected: () => SelectionData;
  setSelected: (selected: SelectionData) => void;
  start: () => void;
  model: Words;
}

const QuizStart: Component<QuizStartProps> = (props) => {
  return (
    <div>
      <div class="bg-gray-50">
        <div class="flex bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-md py-2 px-2 text-white font-bold text-md">
          Vælg bogstaver
        </div>
        <div class="px-2 flex flex-wrap items-center">
          <For each={Object.keys(props.model)}>
            {(item) => {
              return (
                <button
                  id={`${item}-button`}
                  class={`w-12 text-lg ${props.selected()[item].bgColor} mx-2 my-2  ${
                    props.selected()[item].textColor
                  } font-semibold py-2 px-2 border border-indigo-600 rounded`}
                  onClick={() => {
                    const isSelected = props.selected()[item].selected;
                    const newSelection = {
                      ...props.selected(),
                      [item]: {
                        selected: !isSelected,
                        bgColor: !isSelected ? "bg-indigo-600" : "bg-white",
                        textColor: !isSelected
                          ? "text-white"
                          : "text-indigo-600"
                      }
                    };

                    props.setSelected(newSelection);
                  }}
                >
                  {item}
                </button>
              );
            }}
          </For>
        </div>
      </div>
      <div class="mt-8 text-center">
        <button
          disabled={
            Object.keys(props.selected()).find((item) => props.selected()[item].selected)
              ? false
              : true
          }
          class="bg-transparent hover:bg-indigo-600 text-indigo-600 font-semibold hover:text-white py-2 px-2 border border-indigo-600 hover:border-transparent rounded
              disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none
              "
          onClick={props.start}
          id="start-button"
        >
          Start!
        </button>
      </div>
    </div>
  );
};

export default QuizStart;
