import { Word } from "./QuizStep";

export interface Words {
  [key: string]: { [key: string]: Word };
}

interface WordsCollection {
  [key: string]: string
}

const words: WordsCollection = (() => ({
  birds: "data-birds",
  book: "data-book",
  fish: "data-fish"
}))();

export default words;
