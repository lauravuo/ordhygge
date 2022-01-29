import type { Component } from "solid-js";
import { createSignal, Show } from "solid-js";

import List from "./List";
import Quiz from "./Quiz";

const App: Component = () => {
  const [mode, setMode] = createSignal("list");
  const [langIndex, setLangIndex] = createSignal(0);
  const langs = [
    { name: "🇫🇮", value: "fi" },
    { name: "🇸🇪", value: "se" }
  ];

  return (
    <Show
      when={mode() === "quiz"}
      fallback={
        <List
          setMode={setMode}
          langIndex={langIndex}
          setLangIndex={setLangIndex}
          langs={langs}
        />
      }
    >
      <Quiz setMode={setMode} langIndex={langIndex} langs={langs} />
    </Show>
  );
};

export default App;
