// @ts-expect-error: no types
import animalData from "./data-animals";
// @ts-expect-error: no types
import bookData from "./data-book";
import { Word } from "./QuizStep";

export interface Words {
  [key: string]: { [key: string]: Word };
}

interface WordsCollection {
  [key: string]: Words
}

const words: WordsCollection = (() => ({
  animalData: animalData as Words,
  bookData: bookData as Words
}))();

export default words;
