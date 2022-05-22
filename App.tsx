// sometimes typescript fails to process these two modules, but they work fine in javascript
import {allwords} from './allwords';
import {answers} from './answers';
import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import { Card, TextInput } from 'react-native-paper';
import Keyboard from './components/Keyboard'
import Box from './components/Box'
import Row from './components/Row'
import Grid from './components/Grid'
import { useState, useCallback} from 'react';
import {wordCorrect, getNumber, getWord, rightGuess} from './utils/rules'

// React Wordle Starter code
// Feel free to reuse code from the Wordle Solution on Replit
// https://replit.com/@RomainRobbes/WordleSolution#index.ts


// one change is that we do not use files for reading the words anymore, for simplicity
// the resources are defined in TypeScript modules

// the files that we read, and we put words to uppercase
//const answers:string[] = readFileSync('answers.txt', 'utf-8').split("\n").map(s => s.toUpperCase())
//const allwords: string[] = readFileSync('allwords.txt', 'utf-8').split("\n").map(s => s.toUpperCase())

const randomWord = (answers: string[]): string => {
  const rand = Math.floor(Math.random() * answers.length)
  return answers[rand]
}

// a starter component that displays two random words
export default function App() {

  //function that takes the letters and creates a word
  //returns a string that then gets passed into other functions (like goodWord? balba )
 
 const [listOfWords, setListOfWords] = useState<string[]>([])
 

  /*useEffect(() => {

  }, [listofwords]
*/

  const [word, setWord] = useState<string>('')
   const handleKeyPressCallback = useCallback(
  (key) => {
   setWord(prevState => prevState + key);
   if (wordCorrect(word)){
     alert('Works')
   setListOfWords(prevState => [...prevState,word]);
   setFilled(true);
   }
   
    
     },
  [word,listOfWords]
)
  const [filled, setFilled] = useState(false);
  const [play, setPlay] = useState(false);
  const [back, setBack] = useState(true);
  const handlePressPlay = () => {
    setPlay(true)
  }
  const handlePressBack = () => {
    setBack(true)
    setPlay(false)
  }
  return (
    <View style={styles.container}>
    {!play && back?
    <View style={styles.container}> <Text>React Wordle Starter</Text>
      <TouchableOpacity style={styles.buttonBack} onPress = {handlePressPlay}><Text style={styles.buttonText}>PLAY</Text></TouchableOpacity>
</View>:<View>
      <TouchableOpacity style={styles.buttonBack} onPress = {handlePressBack}><Text style={styles.buttonText}>BACK</Text></TouchableOpacity>
        <Text>Random answer: {randomWord(answers)}</Text>
       <Text>Random word: {randomWord(allwords)}</Text>
      <View style={styles.containerLetters}>
      {
      [0,1,2,3,4,5].map(
        index => {
         return <View key = {`x-${index}`}>
         <Row word = {filled?listOfWords[index]:word}/> 
         </View>
        }
      )
      }
      </View>
       <Keyboard onKeyPress={handleKeyPressCallback}/></View>}
    </View>
  )
}


//Style 

const styles = StyleSheet.create({
  container: {
     flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    
    },

  buttonbar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignContent: 'center',
    justifyContent: 'center',
    height: 24,
  },
  board: {
    flex: 9,
    backgroundColor: 'white',
    margin: 6,
  },
  buttonBack: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
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
  }
  
});
