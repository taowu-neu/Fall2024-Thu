import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import Header from './Components/Header';
import { useState } from 'react';
import Input from './Components/Input';

export default function App() {
  const appName = 'Tao App';
  const [receivedText, setReceivedText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  handleInputData = (data) => {
    setReceivedText(data);
    setModalVisible(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
      <Header name={appName} />
        {/* <Text>Child 1</Text>

      </Header> */}
        <Button title='Add a goal' onPress={() => setModalVisible(true)}/>
      </View>
      <Input focus={true} inputHandler={handleInputData} isModalVisible={modalVisible}/> 
      <View style={styles.bottomContainer}>
        <View style={styles.textContainer}>
        <Text style={styles.textStyle}>Received: {receivedText}</Text>
        </View>
      </View>
  
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  textStyle: {
    color: 'darkblue',
    padding: 10,
  },
  textContainer: {
    backgroundColor: '#9C979E',
    borderRadius: 10,
    padding: 5,
  },
  topContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 4,
    backgroundColor: '#FDD0E6',
    alignItems: 'center',
    rowGap: 10,
  }
});