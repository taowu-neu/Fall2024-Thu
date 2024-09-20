import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Header from './Components/Header';
import { useState } from 'react';
import Input from './Components/Input';

export default function App() {
  const appName = 'Tao App';
  const [receivedText, setReceivedText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleInputData = (data) => {
    setReceivedText(data);
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperContainer}>
        <Header name={appName} />
        <Button title='Add a goal' onPress={() => setModalVisible(true)} />
      </View>
      <Input
        focus={true}
        inputHandler={handleInputData}
        isModalVisible={modalVisible}
        cancelHandler={handleCancel}
      />
      <View style={styles.bottomContainer}>
        <Text>Received: {receivedText}</Text>
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
  upperContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#FDD0E6',
    alignItems: 'center',
  },
});
