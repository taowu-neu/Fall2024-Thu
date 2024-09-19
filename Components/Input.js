import { TextInput, Text, StatusBar, StyleSheet, View, Button } from 'react-native'
import React from 'react'
import { useState } from 'react';

const Input = (props) => {
  const [text, setText] = useState('');

  const handleConfirm = () => {
    console.log('user type:', text);
    props.inputHandler(text);
  }

  return (
    <View>
      <TextInput
      placeholder='Type something'
      keyboardType='default'
      style={{borderBottomColor: "purple", borderBottomWidth: 2}}
      value={text}
      onChangeText={function (changedText) {
        setText(changedText);
      }}/>
      <Button title='Confirm' onPress={handleConfirm}>Confirm</Button>
    </View>
  )
}


export default Input;