import { StatusBar } from "expo-status-bar";
import {
  Button,
  SafeAreaView,
  View,
  FlatList,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import Header from "./Header";
import { useState } from "react";
import Input from "./Input";
import GoalItem from "./GoalItem";

export default function Home({ navigation }) { // 接收 navigation prop
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const appName = "My app!";

  function handleInputData(data) {
    let newGoal = { text: data, id: Math.random().toString() };
    setGoals((prevGoals) => [...prevGoals, newGoal]);
    setModalVisible(false);
  }

  function dismissModal() {
    setModalVisible(false);
  }

  function handleGoalDelete(deletedId) {
    setGoals((prevGoals) => {
      return prevGoals.filter((goalObj) => goalObj.id !== deletedId);
    });
  }

  // 定义导航到 GoalDetails 的回调函数
  function handleGoalDetails(goal) {
    navigation.navigate("Details", { goalText: goal.text });
  }

  function handleDeleteAll() {
    Alert.alert("Delete Goals", "Are you sure to delete all goal items?", [
      { text: "No", style: "cancel" },
      { text: "Yes", onPress: () => setGoals([]) },
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
          style={{ width: "100%" }}
          contentContainerStyle={
            goals.length === 0
              ? styles.scrollViewContainer
              : [styles.scrollViewContainer, { alignItems: "center" }]
          }
          data={goals}
          renderItem={({ item }) => (
            <GoalItem
              deleteHandler={handleGoalDelete}
              goalObj={item}
              onPressDetails={() => handleGoalDetails(item)} // 传递导航回调函数
            />
          )}
          ListEmptyComponent={() => (
            <View style={styles.noGoalsContainer}>
              <Text style={styles.noGoalsText}>No goals to show</Text>
            </View>
          )}
          ListHeaderComponent={() =>
            goals.length > 0 ? (
              <Text style={styles.goalsHeaderText}>My goals</Text>
            ) : null
          }
          ListFooterComponent={() =>
            goals.length > 0 ? (
              <View style={styles.footerContainer}>
                <Button title="Delete All" color="blue" onPress={handleDeleteAll} />
              </View>
            ) : null
          }
          ItemSeparatorComponent={() => <View style={styles.separator} />}
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
    backgroundColor: "#dcd",
  },
  noGoalsText: {
    fontSize: 19,
    color: "purple",
  },
  noGoalsContainer: {
    alignItems: "center",
  },
  goalsHeaderText: {
    fontSize: 19,
    color: "purple",
    textAlign: "center",
    marginVertical: 10,
  },
  footerContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  separator: {
    height: 3,
    width: 130,
    backgroundColor: "gray",
    marginVertical: 5,
  },
});
