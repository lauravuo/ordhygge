import type { Component } from "solid-js";

import Dropdown from "./Dropdown";
import List from "./List"
import {Words} from "./Words";


interface AppContainerProps {
  setMode: (mode: string) => void;
  langIndex: () => number;
  setLangIndex: (index: number) => void;
  langs: { name: string; value: string }[];
  wordsType: () => string,
  model: Words;
}

const AppContainer: Component<AppContainerProps> = (props) => {
  const inactivePageClass = "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
  const activePageClass = "inline-block p-4 text-indigo-600 border-b-2 border-indigo-600 rounded-t-lg active dark:text-indigo-500 dark:border-indigo-500"
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
                    id="quiz-button"
                    onClick={() => props.setMode("quiz")}
                  >
                    QUIZ
                  </button>
                  <Dropdown
                    index={props.langIndex}
                    setIndex={props.setLangIndex}
                    options={props.langs}
                  />
                </div>
              </div>
              <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
                <ul class="flex flex-wrap -mb-px">
                  <li class="mr-2">
                    <a
                      href="/ordhygge/?page=book"
                      class={props.wordsType() === "book" ? activePageClass : inactivePageClass}>Bogens ord</a>
                  </li>
                  <li class="mr-2">
                    <a
                      href="/ordhygge/?page=fish"
                      class={props.wordsType() === "fish" ? activePageClass : inactivePageClass}>Fisk</a>
                  </li>
                  <li class="mr-2">
                    <a
                      href="/ordhygge/?page=birds"
                      class={props.wordsType() === "birds" ? activePageClass : inactivePageClass}>Fugle</a>
                  </li>
                </ul>
              </div>
              <List model={props.model} setMode={props.setMode} setLangIndex={props.setLangIndex} langIndex={props.langIndex} langs={props.langs} />
            </div>
            <div class="text-sm italic text-center">
              {props.wordsType() === "book" && <div>
                {" "}
                Ordliste fra{" "}
                <a
                  class="text-indigo-600"
                  href="https://finnlectura.fi/oppimateriaalit/dansk-ja-tak"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Dansk? – Ja, tak!
                </a>
              </div>}

              <div>
                Udtale fra{" "}
                <a
                  class="text-indigo-600"
                  href="https://ordnet.dk/ddo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Den Danske Ordbog
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppContainer;
