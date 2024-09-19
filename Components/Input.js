import { TextInput, Text, StatusBar, StyleSheet, View, Button, Modal } from 'react-native'
import React from 'react'
import { useState } from 'react';

const Input = (props) => {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  }
  const handleBlur = () => {
    setIsFocused(false);
  }

  const handleConfirm = () => {
    console.log('user type:', text);
    props.inputHandler(text);
  }

  return (
    <Modal visible={props.isModalVisible} animationType='slide' transparent={true}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <TextInput
            placeholder='Type something'
            keyboardType='default'
            style={styles.inputContainer}
            value={text}
            autoFocus={props.focus}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={function (changedText) {
              setText(changedText);
            }}
          />
          <Button title='Confirm' onPress={handleConfirm}>Confirm</Button>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  innerContainer: {
    width: '50%',
    backgroundColor: '#E3DEE5',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  buttonStyle: {
    width: '30%',
    margin: 5,
    backgroundColor: 'lightblue'
  },
  inputContainer: {
    fontSize: 15,
    borderColor: 'purple',
    borderWidth: 2,
    margin: 15,
    padding: 10,
    color: 'purple',
    width:135,
  }
});

export default Input;