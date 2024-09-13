import { TextInput, Text, StatusBar, StyleSheet, View } from 'react-native'
import React from 'react'
import { useState } from 'react';

const Input = () => {
  const [text, setText] = useState('');

  return (
    <View>
      <TextInput
      placeholder='Type something'
      keyboardType='default'
      style={{borderBottomColor: "purple", borderBottomWidth: 2}}
      value={text}
      autoFocus={props.focus}
      onChangeText={function (changedText) {
        setText(changedText);
      }}/>
    </View>
  )
}


export default Input;
