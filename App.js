import { StatusBar } from "expo-status-bar";
import {
  Button,
  SafeAreaView,
  View,
  FlatList,
  Text,
  StyleSheet,
} from "react-native";
import Header from "./Components/Header";
import { useState } from "react";
import Input from "./Components/Input";
import GoalItem from "./Components/GoalItem";

export default function App() {
  const [receivedData, setReceivedData] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const appName = "My app!";

  function handleInputData(data) {
    console.log("App.js ", data);
    let newGoal = { text: data, id: Math.random().toString() };
    setGoals((prevGoals) => {
      return [...prevGoals, newGoal];
    });
    setModalVisible(false);
  }

  function dismissModal() {
    setModalVisible(false);
  }

  function handleGoalDelete(deletedId) {
    setGoals((prevGoals) => {
      return prevGoals.filter((goalObj) => {
        return goalObj.id != deletedId;
      });
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topView}>
        <Header name={appName}></Header>
        <Button
          title="Add a Goal"
          onPress={function () {
            setModalVisible(true);
          }}
        />
      </View>
      <Input
        textInputFocus={true}
        inputHandler={handleInputData}
        isModalVisible={modalVisible}
        dismissModal={dismissModal}
      />
      <View style={styles.bottomView}>
        <FlatList
          contentContainerStyle={
            goals.length === 0 ? styles.scrollViewContainer : null
          }
          data={goals}
          renderItem={({ item }) => {
            return <GoalItem deleteHandler={handleGoalDelete} goalObj={item} />;
          }}
          ListEmptyComponent={() => (
            <View style={styles.noGoalsContainer}>
              <Text style={styles.noGoalsText}>No goals to show</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  scrollViewContainer: {
    alignItems: "center",
    paddingTop: 10,
  },
  topView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomView: { 
    flex: 4, 
    backgroundColor: "#dcd" 
  },
  noGoalsText: {
    fontSize: 19,
    color: "purple",
  },
  noGoalsContainer: {
    alignItems: "center",
  },
});
