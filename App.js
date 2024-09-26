import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import Header from './Components/Header';
import { useState } from 'react';
import Input from './Components/Input';

export default function App() {
  const appName = 'Tao App';
  const [goals, setGoals] = useState([]);  
  const [modalVisible, setModalVisible] = useState(false);

  const handleInputData = (data) => {
    const newGoal = {
      text: data, 
      id: Math.random().toString()
    };
    
    setGoals((currentGoals) => [...currentGoals, newGoal]);
    setModalVisible(false);
  }

  const handleCancel = () => {
    setModalVisible(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperContainer}>
        <Header name={appName} />
        <Button title='Add a goal' onPress={() => setModalVisible(true)} />
      </View>
      <Input focus={true} inputHandler={handleInputData} isModalVisible={modalVisible} cancelHandler={handleCancel} />
      <ScrollView style={styles.bottomContainer} contentContainerStyle={styles.scrollViewContent}>
        {goals.map((item) => (
          <View key={item.id} style={styles.textContainer}>
            <Text style={styles.textStyle}>{item.text}</Text>
          </View>
        ))}
      </ScrollView>
  
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
    marginVertical: 5, 
  },
  upperContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 4,
    backgroundColor: '#FDD0E6',
    width: '100%', 
    padding: 10,
  },
  scrollViewContent: {
    alignItems: 'center',
    rowGap: 10,
  },
});
