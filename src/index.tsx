import { render } from "solid-js/web";
import "tailwindcss/tailwind.css";

import "./index.css";
import App from "./App";
// @ts-expect-error: expects Element
render(App, document.getElementById("root"));
