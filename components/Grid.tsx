import React from "react"
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native"
import Row from './Row'

const Grid = () => {
  return (
    <View style = {styles.container}>
    <Row/>
    <Row/>
    <Row/>
    <Row/>
    <Row/>
    <Row/>
    </View>
  )
}
const styles = StyleSheet.create({

  label: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 24,
  },
    container: {
    flex: 1,
    backgroundColor: "transparent",
    padding: 2,
    marginBottom:2,
  },
})

export default Grid
