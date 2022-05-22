import React from "react"
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native"

const Box = (props) => {
  return <View style = {[styles.box, {backgroundColor: props.color}]}><Text style = {styles.text}>{props.letter}</Text></View>
}

const styles = StyleSheet.create({
  box: {
    width: 50,
    height: 50,
    marginBottom: 5,
    borderColor: "#d3d6da",
    borderWidth: 2,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 15,
  }
});

export default Box;