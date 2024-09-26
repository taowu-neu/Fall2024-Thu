import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, SafeAreaView, ScrollView, FlatList } from 'react-native';

import Header from './Components/Header';
import Input from './Components/Input';
import { useState } from 'react';
import GoalItem from './Components/GoalItem';

export default function App() {
  const appName = "Tao app";

  const [receivedText, setReceivedText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);

  function handleInputData(data) {
    console.log('Callback function called with:', data);
    const newGoal = {
      text: data,
      id: Math.random(),
    };

    setGoals((currentGoals) => [...currentGoals, newGoal]);
    setReceivedText(data);
    setModalVisible(false);
  }

  const handleDeleteGoal = (goalId) => {
    setGoals((currentGoals) => currentGoals.filter((goal) => goal.id !== goalId));
  };

  const handleConfirm = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperContainer}>
        <Header app_name={appName} theme="dark" />
        <Button title='Add a goal' onPress={() => setModalVisible(true)} />
      </View>


      <Input
        inputHandler={handleInputData}
        isModalVisible={modalVisible}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
  <View style={styles.bottomContainer}>

    {goals.length === 0 ? (
      <Text style={styles.textStyle}></Text>
    ) : (
      <FlatList renderItem={({ item }) => {
        return (
          <GoalItem goal={item} onDelete={handleDeleteGoal} />)
      }} data={goals}>
      </FlatList>

    )}
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
  upperContainer: {
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
