import React from "react"
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native"

const qwert: any =
  'Q W E R T Y U I O P A S D F G H J K L Z X C V B N M ⌫';
const keyboardDict: any  = {}
qwert.split(' ').map((letter:any) => {
  return keyboardDict[ letter ] = { color: '#ecf0f1' }
})

const KeyboardRow =({
  letters,
  keyboard,
  onKeyPress,
}: {
  letters: string[],
  keyboard: any,
  onKeyPress: (letter: string) => void,
}) => (
  <View style={styles.keyboardRow}>
    {letters.map(letter => (
      <TouchableOpacity onPress={() => onKeyPress(letter)}>
        <View style={[styles.key, {backgroundColor: keyboard[letter].color}]}>
          <Text style={styles.keyLetter}>{letter}</Text>
        </View>
      </TouchableOpacity>
    ))}
  </View>
)

const Keyboard =  ({ onKeyPress, keys }: { onKeyPress: (letter: string) => void }) => {
  const keyboardKeys = Object.keys(keys)

  const row1 = keyboardKeys.slice(0, keyboardKeys.indexOf('A'))
  const row2 = keyboardKeys.slice(keyboardKeys.indexOf('A'), keyboardKeys.indexOf('X'))
  const row3 = keyboardKeys.slice(keyboardKeys.indexOf('Z'))

  return (
    <View style={styles.keyboard}>
      <KeyboardRow letters={row1} keyboard={keyboardDict} onKeyPress={onKeyPress}/>
      <KeyboardRow letters={row2} keyboard={keyboardDict} onKeyPress={onKeyPress}/>
      <KeyboardRow letters={row3} keyboard={keyboardDict} onKeyPress={onKeyPress} />
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