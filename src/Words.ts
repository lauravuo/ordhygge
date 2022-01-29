// @ts-expect-error: no types
import data from "./data";
import { Word } from "./QuizStep";

interface Words {
  [key: string]: { [key: string]: Word };
}

const words: Words = (() => {
  return data as Words;
})();

export default words;
