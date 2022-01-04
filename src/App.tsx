import type { Component } from "solid-js";

import logo from "./logo.svg";
import styles from "./App.module.css";

import Words from "./Words";

const App: Component = () => {
  console.log(Words);
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p class="text-4xl text-red-400 tracking-widest">
          Edit src/App.jsx and save to reload.{" "}
        </p>{" "}
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
    </div>
  );
};

export default App;
