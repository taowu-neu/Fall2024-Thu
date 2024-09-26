import { StyleSheet, TextInput, Text, Button, View, Modal, Image } from 'react-native';
import React, { useState } from 'react';

const Input = (props) => {
    const [isBlurred, setIsBlurred] = useState(false);
    const [text, setText] = useState('');

    const handleConfirm = () => {
        setText('');
        props.onConfirm();
        props.inputHandler(text);
    };

    const handleCancel = () => {
        setText('');
        props.onCancel();
    };

    return (
        <Modal animationType='slide' visible={props.isModalVisible} transparent={true}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Image
                        style={styles.imageStyle}
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2617/2617812.png' }}
                        alt="image from URL"
                    />
                    <Image
                        style={styles.imageStyle}
                        source={require('../assets/tem.png')}
                        alt="local image"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Type something"
                        onChangeText={(newText) => {
                            setText(newText);
                            if (isBlurred) {
                                setIsBlurred(false);
                            }
                        }}
                        onBlur={() => setIsBlurred(true)}
                        onFocus={() => setIsBlurred(false)}
                        value={text}
                    />
                    {isBlurred && <Text>Thank you</Text>}
                    <View style={styles.buttonContainer}>
                        <Button title='Cancel' onPress={handleCancel} color="#007AFF" />
                        <Button title='Confirm' onPress={handleConfirm} color="#007AFF" disabled={!text} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
      width: 300,
      padding: 20,
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 10,
    },
    input: {
      width: '100%',
      height: 40,
      marginBottom: 20,
      paddingLeft: 10,
      borderColor: '#A020F0',
      borderWidth: 1,
    },
    buttonContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',

    },
    imageStyle: {
      width: 100,
      height: 100,
    },
});

export default Input;