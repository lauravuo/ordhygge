// @ts-expect-error: no types
import birds from "./data-birds";
// @ts-expect-error: no types
import book from "./data-book";
// @ts-expect-error: no types
import fish from "./data-fish";
import { Word } from "./QuizStep";

export interface Words {
  [key: string]: { [key: string]: Word };
}

interface WordsCollection {
  [key: string]: Words
}

const words: WordsCollection = (() => ({
  birds: birds as Words,
  book: book as Words,
  fish: fish as Words
}))();

export default words;
