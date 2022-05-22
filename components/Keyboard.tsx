import React from "react"
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native"

//function that pushes the letters pressed on keyboard inside of a list of length 5, if letters.
//render row while giving input
//disable keyboard when list is full except for enter and delete button
//enable enter key only when list is full
//validate on press "enter", returns an array of object with letter, color
//that array of 5 objects needs to be displayed again (render grid)


//history variable = list of guesses
//handle


//keyboard handleinput
//function onpress (key, event)

const KeyboardRow =({
  letters,
  onKeyPress,
}: {
  letters: string[],
  onKeyPress: (letter: string) => void,
}) => (
  <View style={styles.keyboardRow}>
    {letters.map(letter => (
      <TouchableOpacity onPress={() => onKeyPress(letter)}>
        <View style={styles.key}>
          <Text style={styles.keyLetter}>{letter}</Text>
        </View>
      </TouchableOpacity>
    ))}
  </View>
)

const Keyboard =  ({ onKeyPress }: { onKeyPress: (letter: string) => void }) => {
  const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
  const row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
  const row3 = ["Z", "X", "C", "V", "B", "N", "M", "⌫"]

  return (
    <View style={styles.keyboard}>
      <KeyboardRow letters={row1} onKeyPress={onKeyPress}/>
      <KeyboardRow letters={row2} onKeyPress={onKeyPress}/>
      <KeyboardRow letters={row3} onKeyPress={onKeyPress} />
      <View style={styles.keyboardRow}>
        <TouchableOpacity>
          <View style={styles.key}>
            <Text style={styles.keyLetter} onPress={() => onKeyPress("ENTER")}>ENTER</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  // ...

  container: {
    justifyContent: "space-between",
    flex: 1,
  },

  // keyboard
  keyboard: { flexDirection: "column" },
  keyboardRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  key: {
    backgroundColor: "#d3d6da",
    padding: 10,
    margin: 3,
    borderRadius: 5,
  },
  keyLetter: {
    fontWeight: "500",
    fontSize: 15,
  },
})

export default Keyboard