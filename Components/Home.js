import { StatusBar } from "expo-status-bar";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
} from "react-native";
import Header from "./Header";
import { useState } from "react";
import Input from "./Input";
import GoalItem from "./GoalItem";

export default function Home({ navigation }) {
  const [receivedData, setReceivedData] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const appName = "My app!";

  // handle input data from the input component
  function handleInputData(data) {
    let newGoal = { text: data, id: Math.random() };
    setGoals((prevGoals) => [...prevGoals, newGoal]);
    setModalVisible(false);
  }

  function dismissModal() {
    setModalVisible(false);
  }

  // delete a goal based on its id
  function handleGoalDelete(deletedId) {
    setGoals((prevGoals) => {
      return prevGoals.filter((goalObj) => goalObj.id !== deletedId);
    });
  }

  // delete all goals with confirmation alert
  function deleteAll() {
    Alert.alert("Delete All", "Are you sure you want to delete all goals?", [
      {
        text: "Yes",
        onPress: () => {
          setGoals([]);
        },
      },
      { text: "No", style: "cancel" },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topView}>
        <Header name={appName}></Header>
        <Button
          title="Add a Goal"
          onPress={() => setModalVisible(true)}
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
          ItemSeparatorComponent={
            <View
              style={{
                height: 5,
                backgroundColor: "gray",
              }}
            />
          }
          ListEmptyComponent={<Text style={styles.header}>No goals to show</Text>}
          ListHeaderComponent={
            goals.length ? <Text style={styles.header}>My Goals List</Text> : null
          }
          ListFooterComponent={
            goals.length ? <Button title="Delete all" onPress={deleteAll} /> : null
          }
          contentContainerStyle={styles.scrollViewContainer}
          data={goals}
          renderItem={({ item }) => {
            return (
              <GoalItem
                navigation={navigation}
                deleteHandler={handleGoalDelete}
                goalObj={item}
              />
            );
          }}
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
  },
  topView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomView: {
    flex: 4,
    backgroundColor: "#dcd",
  },
  header: {
    color: "indigo",
    fontSize: 25,
    marginTop: 10,
  },
});
