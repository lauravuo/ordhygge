import type { Component } from "solid-js";
import { createSignal } from "solid-js";

import List from "./List";
import Quiz from "./Quiz";

const App: Component = () => {
  const [mode, setMode] = createSignal("list");

  return (
    <Show when={mode() === "quiz"} fallback={<List setMode={setMode} />}>
      <Quiz />
    </Show>
  );
};

export default App;
