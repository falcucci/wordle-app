// sometimes typescript fails to process these two modules, but they work fine in javascript
import {allwords} from './allwords';
import {answers} from './answers';
import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import { Card, TextInput } from 'react-native-paper';
import Keyboard from './components/Keyboard'
import Box from './components/Box'
import Grid from './components/Grid'
import { useState, useCallback, useEffect} from 'react';
import {colorGuess, wordCorrect, getNumber, getWord, rightGuess} from './utils/rules'
import Colors from './constants/Colors'
import keyboardDict from './utils/keyboardDict'

const Separator = () => (
  <View style={styles.separator}/>
);

const randomWord = (answers: string[]): string => {
  const rand = Math.floor(Math.random() * answers.length)
  return answers[rand]
}

const Row = (props) => {

  const guess:string = props.word;
  const wordle:string = props.wordle;
  let defaultRow = ['', '', '', '', ''];
  const toColorize:boolean = props.toColorize;
  let color = Colors.white
  let checkWordle:string = wordle;

  return (
    <View style = {styles.row}>
    {
      defaultRow.map((letter,index) => {
      if (toColorize){
        let colGuess = colorGuess(wordle, guess);
        color= Colors.grey

        if (wordle[index] == guess[index]) {
          color = Colors.green
          checkWordle = checkWordle.replace(guess[index], '')
          } 

        else if (checkWordle.split('').includes(guess[index]) && color != Colors.green){
                color = Colors.orange
                checkWordle = checkWordle.replace(guess[index], '')
        }
      }
       return <Box color = {color} letter = {guess && guess[index]}/>
    })
    }
</View>
)
}

export default function App() {
  //states
  const [play, setPlay] = useState(false);
  const [back, setBack] = useState(true);
  const [wordle, setWordle] = useState<string>('');
  const [guessed, setGuessed] = useState<boolean>(false);
  const [listOfWords, setListOfWords] = useState<string[]>([])
  const [necessaryLetters, setNecessaryLetters] = useState<string[]>([])
  const [word, setWord] = useState<string>('')
  const [hard, setHard] = useState<boolean>(false)
  const [input, setInput] = useState('');
  const [gameover, setGameover] = useState(false)
  const [customKeyboard, setCustomKeyboard] = useState<any>(keyboardDict)

  useEffect (() => {
    if (listOfWords.length === 6){
      setGameover(true)
    }
  }, [listOfWords]
  )

  const handlePressPlay = () => {
    setPlay(true)
    setWordle(randomWord(allwords))
    setWord('')
    setListOfWords([])
    setNecessaryLetters([])
    setGuessed(false)
    setHard(false)
    setGameover(false)
  }
  const handlePressBack = () => {
    setBack(true)
    setPlay(false)
    setWord('')
    setListOfWords([])
    setNecessaryLetters([])
  }

  const handlePressHard = () => {
    setHard(true)
    setPlay(true)
    setWordle(randomWord(allwords))
    setWord('')
    setListOfWords([])
    setNecessaryLetters([])
    setGuessed(false)
  }

   const handleKeyPressCallback = useCallback(
  (key) => {
    if (key === 'ENTER' && wordCorrect(word)){
      setListOfWords(prevState => [...prevState,word]);
      if(rightGuess(wordle,word)){
        setGuessed(true)
      }
      setWord('');
    }
    else if (key === '⌫'){
      setWord(word.slice(0,-1))
    }

    else if (key !== '⌫' && key !== 'ENTER'){
        setWord(prevState => {
          if(prevState.length < 5){
            return prevState + key;
          }
          else{
            alert ('Too long!')
           }
           console.log('Previous state + key')
          return prevState;
        }
        )
    }
     },
  [word,listOfWords, guessed, wordle]
)
  
  return (
    <View style={styles.container}>
    {!play && back?
    <View style={styles.container}>
    <Text style = {styles.title}>React Wordle Starter</Text>
    <Separator/>
    <Text style = {styles.label}>Random word or your number?</Text>
    <TextInput
    placeholder ='Write a 4 digit number of your choice!'
    defaultValue={input}
    keyboardType="numeric"
    />
    <Separator/>
    <Text style = {styles.label}>Choose your play mode!</Text>
    <Separator/>
    <TouchableOpacity
      style={styles.button}
      onPress = {handlePressPlay}>
      <Text style={styles.buttonText}>EASY</Text>
    </TouchableOpacity>
    <Separator/>
    <TouchableOpacity
      style={styles.button}
      onPress = {handlePressHard}>
      <Text style={styles.buttonText}>HARD</Text>
    </TouchableOpacity>
    <Separator/>
    </View>
    :
    <View style = {styles.container}>
    <TouchableOpacity
      style={styles.buttonBack}
      onPress = {handlePressBack}>
      <Text style={styles.buttonText}>BACK</Text>
    </TouchableOpacity>
    <View style={styles.containerLetters}>
    <Text>Wordle is {wordle}</Text>
    {
        [...Array(6).keys()].map((index) => {
          const guessRow = (index === listOfWords.length)? word : listOfWords[index]
          const toColorize:boolean = wordCorrect(listOfWords[index])
          return <Row word = {guessRow} wordle = {wordle} toColorize = {toColorize}/>
        })
    }
      </View>
      {!guessed && !gameover? 
      <View>
        <Keyboard onKeyPress={handleKeyPressCallback} keys = {customKeyboard}/>
        </View>
      :
      <View>
      <Text style = {styles.label}>CONGRATULATIONS!</Text>
        <Text style = {styles.label}>You guessed it right!</Text>
        <Separator/>
        <TouchableOpacity
          style = {styles.buttonBack}
          onPress = {handlePressPlay}>
          <Text style = {styles.buttonText}>PLAY AGAIN</Text>
        </TouchableOpacity>
      </View>
      }

      {gameover && !guessed?
        <View>
         <Text style = {styles.label}>YOU LOST!</Text>
         <Text style = {styles.label}>The word was {wordle}</Text>
         <Separator/>
         <TouchableOpacity
          style = {styles.buttonBack}
          onPress = {handlePressPlay}>
          <Text style = {styles.buttonText}>PLAY AGAIN</Text>
          </TouchableOpacity>
        </View> : null
      }
       </View>
       
       }
       </View>
  )
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
    justifyContent: "center",
    paddingHorizontal: 5,
    paddingBottom: 3,
    },
  buttonBack: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50,
    paddingVertical: 5,
    paddingHorizontal: 5,
    paddingTop: 5,
    borderRadius: 4,
    backgroundColor: "black",
    paddingBottom:2,
  },
  button:{
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: "black",
    paddingBottom:4,
  },
  buttonText: {
    color: 'white',
     fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
  containerLetters: {
    flex: 1,
    backgroundColor: "transparent",
    padding: 2,
    marginBottom:1,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingBottom: 2,
    marginBottom: 5,
  },
  label: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 24,
  },
   separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title:{
    color: 'sienna',
    textAlign: "center",
    marginBottom: 10,
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
});