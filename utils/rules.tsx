import {allwords} from '../allwords';
import {answers} from '../answers';

function wordCorrect(guess: string): boolean {
  return allwords.includes(guess)
}

function getNumber(): number {
  return Math.floor(Math.random() * (2315));
}

function getWord(x: number): string {
  return '' + answers[x - 1] + '';
}

function rightGuess(word: string, guess: string): boolean {
  return word === guess
}

export {wordCorrect, getNumber, getWord, rightGuess}