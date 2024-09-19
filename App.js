import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Header from './Components/Header';
import { useState } from 'react';
import Input from './Components/Input';

export default function App() {
  const appName = 'Tao App';
  
  handleInputData = (data) => {
    setReceivedText(data);
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <Header name={appName} />
        {/* <Text>Child 1</Text>

      </Header> */}
      <Input inputHandler={handleInputData}/> 
  
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});