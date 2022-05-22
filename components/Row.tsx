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

  return (
    <View style = {styles.row}>
  <Box color = {props.color} letter = { word && word[0]}/> 
  <Box color = {props.color} letter = { word && word[1]}/>
  <Box color = {props.color} letter = { word && word[2]}/>
  <Box color = {props.color} letter = { word && word[3]}/>
  <Box color = {props.color} letter = { word && word[4]}/ >
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