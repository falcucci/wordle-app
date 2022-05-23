import {allwords} from '../allwords';
import {answers} from '../answers';
import Colors from '../constants/Colors'

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

let stringToArray = (word: string): string[] => word.toUpperCase().split('');

function guessGray(guess: any[]) {
  let guessGray: any = [];
  guess.map((letter: any, index: number) => {
    guessGray[index] = { letter: letter, keycolour: Colors.grey }
  })
  return guessGray;
}


function colorGuess(word: string, gues: string): [] {
  let wordle: string = word.toUpperCase();
  let checkWordle: string = wordle;
  let colGuess: [] = guessGray(stringToArray(gues));

  colGuess.map((colGuess: any, index: any) => {
    if (colGuess.letter == wordle[index]) {
      colGuess.keycolour = Colors.green
      checkWordle = checkWordle.replace(colGuess.letter, '')
    }
  })

  colGuess.map((colGuess: any) => {
    if (checkWordle.includes(colGuess.letter)) {
      if (colGuess.keycolour !=  Colors.green) {
        colGuess.keycolour = Colors.yellow
        checkWordle = checkWordle.replace(colGuess.letter, '')
      }
    }
  })
  return colGuess
}

function getLetterNecessary(letter:string, lettersNecessary:string[]): string[] {
  let newLettersNecessary: string[] = [...lettersNecessary];
  lettersNecessary.push(letter);
  return newLettersNecessary;
}

function includesLetters(guess): boolean{
let lettersNecessary = getLetterNecessary;
let includesLetters: boolean = true;
  lettersNecessary.map((letter) => {
    if (!guess.includes(letter)) {
      includesLetters = false;
    }
  })
  return includesLetters
}



export {colorGuess, wordCorrect, getNumber, getWord, rightGuess}