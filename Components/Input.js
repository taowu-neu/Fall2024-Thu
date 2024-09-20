import { TextInput, StyleSheet, View, Button, Modal } from 'react-native';
import React, { useState } from 'react';

const Input = (props) => {
  const [text, setText] = useState('');

  const handleConfirm = () => {
    props.inputHandler(text);
    setText('');  
  };

  const handleCancel = () => {
    props.cancelHandler();
    setText('');  
  };

  const isConfirmDisabled = text.length < 3; 

  return (
    <Modal visible={props.isModalVisible} animationType='slide' transparent={true}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <TextInput
            placeholder='Type something'
            keyboardType='default'
            style={styles.inputContainer}
            value={text}
            onChangeText={setText}
            autoFocus={props.focus}
          />
          <View style={styles.buttonContainer}>
            <Button title='Confirm' onPress={handleConfirm} disabled={isConfirmDisabled} />
            <Button title='Cancel' onPress={handleCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

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
  },
  inputContainer: {
    borderColor: 'purple',
    borderWidth: 2,
    margin: 15,
    padding: 10,
    color: 'purple',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
});

export default Input;
