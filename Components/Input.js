import { TextInput, Text, StatusBar, StyleSheet, View } from 'react-native'
import React from 'react'
import { useState } from 'react';

const Input = () => {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  }
  const handleBlur = () => {
    setIsFocused(false);
  }

  return (
    <View>
      <TextInput
      placeholder='Type something'
      keyboardType='default'
      style={{borderBottomColor: "purple", borderBottomWidth: 2}}
      value={text}
      autoFocus={props.focus}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChangeText={function (changedText) {
        setText(changedText);
      }}/>
    </View>
  )
}


export default Input;
