import type { Component } from "solid-js";
import { createSignal, Show, onMount } from "solid-js";

import AppContainer from "./AppContainer";
import Quiz from "./Quiz";
import words, {Words} from "./Words";

const App: Component = () => {
  const searchParams = new URLSearchParams(window.location.search);
  // TODO: use router for proper routing
  const initialPage = searchParams.get("page")?.toString() || "book";

  const [mode, setMode] = createSignal("list");
  const [wordsType] = createSignal(initialPage);
  const [langIndex, setLangIndex] = createSignal(0);
  const langs = [
    { name: "🇫🇮", value: "fi" },
    { name: "🇸🇪", value: "se" }
  ];
  const [model, setModel] = createSignal<Words>({});
  onMount(async () => {
    const res = await import (`./${words[wordsType()]}/index.js`);
    setModel(res.default);
  });


  return (
    <Show
      when={mode() === "quiz"}
      fallback={
        <AppContainer
          setMode={setMode}
          langIndex={langIndex}
          setLangIndex={setLangIndex}
          wordsType={wordsType}
          langs={langs}
          model={model()}
        />
      }
    >
      <Quiz setMode={setMode} langIndex={langIndex} langs={langs} model={model()} />
    </Show>
  );
};

export default App;
