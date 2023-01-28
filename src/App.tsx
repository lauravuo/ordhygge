import type { Component } from "solid-js";
import { createSignal, Show } from "solid-js";

import AppContainer from "./AppContainer";
import Quiz from "./Quiz";
import words from "./Words";

const App: Component = () => {
  const [mode, setMode] = createSignal("list");
  const [wordsType, setWordsType] = createSignal("bookData");
  const [langIndex, setLangIndex] = createSignal(0);
  const langs = [
    { name: "🇫🇮", value: "fi" },
    { name: "🇸🇪", value: "se" }
  ];

  return (
    <Show
      when={mode() === "quiz"}
      fallback={
        <AppContainer
          setMode={setMode}
          langIndex={langIndex}
          setLangIndex={setLangIndex}
          wordsType={wordsType}
          setWordsType={setWordsType}
          langs={langs}
        />
      }
    >
      <Quiz setMode={setMode} langIndex={langIndex} langs={langs} model={words[wordsType()]} />
    </Show>
  );
};

export default App;
