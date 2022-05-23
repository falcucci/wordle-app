const qwert: any =
  'Q W E R T Y U I O P A S D F G H J K L Z X C V B N M ⌫';
const keyboardDict: any  = {}
qwert.split(' ').map((letter:any) => {
  return keyboardDict[ letter ] = { color: 'red' }
})

export default keyboardDict