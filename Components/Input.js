import { TextInput, Text, StatusBar, StyleSheet, View, Button, Modal, Alert, Image } from 'react-native';
import React, { useState } from 'react';

const Input = (props) => {
  const [text, setText] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const handleConfirm = () => {
    console.log('user type:', text);
    props.inputHandler(text);
    setText('');
    setIsDisabled(true);
  }

  const handleCancel = () => {
    Alert.alert(
      "Cancel",
      "Are you sure you want to cancel?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK", 
          onPress: () => {
            props.cancelHandler();
            setText('');
            setIsDisabled(true);
          }
        }
      ]
    );
  }

  const handleTextChange = (changedText) => {
    setText(changedText);
    setIsDisabled(changedText.length === 0);
  }

  return (
    <Modal visible={props.isModalVisible} animationType='slide' transparent={true}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
        <Image
            style={styles.imageStyle}
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2617/2617812.png' }}
            alt="random alt 1"
          />
          <Image
            style={styles.imageStyle}
            source={require('../assets/tem.png')}
            alt="random alt 2"
          />
          <TextInput
            placeholder='Type something'
            keyboardType='default'
            style={styles.inputContainer}
            value={text}
            autoFocus={props.focus}
            onChangeText={handleTextChange}
          />
          <View style={styles.buttonContainer}>
            <Button title='Cancel' onPress={handleCancel} />
            <Button title='Confirm' onPress={handleConfirm} disabled={isDisabled} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  innerContainer: {
    width: '70%',
    backgroundColor: '#E3DEE5',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  inputContainer: {
    fontSize: 15,
    borderColor: 'purple',
    borderWidth: 2,
    margin: 15,
    padding: 10,
    color: 'purple',
    width: 200,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  imageStyle: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
});

export default Input;
