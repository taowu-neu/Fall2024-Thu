import { TextInput, Text, StatusBar, StyleSheet, View, Button, Modal } from 'react-native'
import React from 'react'
import { useState } from 'react';

const Input = (props) => {
  const [text, setText] = useState('');

  const handleConfirm = () => {
    console.log('user type:', text);
    props.inputHandler(text);
  }

  return (
    <Modal visible={props.isModalVisible} animationType='slide'>
      <View style={styles.container}>
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
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcf',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Input;