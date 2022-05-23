import React from "react"
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native"
import Box from './Box'
import Colors from '../constants/Colors'

const Row = (props) => {
  const word = props.word;
  const wordle = props.wordle;
  let defaultRow = ['', '', '', '', ''];
  
  //we need the wordle to compare and put the right color
  //guess (ok)

  return (
    <View style = {styles.row}>
    {
      defaultRow.map((letter,index) => {
      let color = Colors.white

      //rules to know color of letter

      //colorize when hit ENTER

       return <Box color = {color} letter = {word && word[index]}/>
    })
    }
      

</View>
)
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingBottom: 5,
    marginBottom: 5,
  },
  label: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 24,
  },
});

export default Row;