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
import { useEffect, useState } from "react";
import Input from "./Input";
import GoalItem from "./GoalItem";
import PressableButton from "./PressableButton";
import { auth, database, storage } from "../Firebase/firebaseSetup";
import {
  writeToDB,
  deleteFromDB,
  deleteAllFromDB,
} from "../Firebase/firestoreHelper";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { ref, uploadBytesResumable } from "firebase/storage";

export default function Home({ navigation }) {
  const [receivedData, setReceivedData] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const appName = "My app!";
  
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(database, "goals"),
        where("owner", "==", auth.currentUser.uid)
      ),
      (querySnapshot) => {
        let newArray = [];
        querySnapshot.forEach((docSnapshot) => {
          newArray.push({ ...docSnapshot.data(), id: docSnapshot.id });
        });
        setGoals(newArray);
      },
      (error) => {
        console.log(error);
        Alert.alert(error.message);
      }
    );
    return () => unsubscribe();
  }, []);

  async function handleInputData(data) {
    const newGoal = { text: data.text, owner: auth.currentUser.uid };

    if (data.imageUri) {
      try {
        const response = await fetch(data.imageUri);
        const blob = await response.blob();

        const imageName = data.imageUri.substring(data.imageUri.lastIndexOf("/") + 1);
        const imageRef = ref(storage, `images/${imageName}`);
        const uploadResult = await uploadBytesResumable(imageRef, blob);

        newGoal.imageUri = uploadResult.metadata.fullPath; // Store the image path in Firestore
      } catch (error) {
        console.log("Error uploading image:", error);
        Alert.alert("Image Upload Failed", "There was an error uploading the image.");
      }
    }

    writeToDB(newGoal, "goals");
    setModalVisible(false);
  }

  function dismissModal() {
    setModalVisible(false);
  }

  function handleGoalDelete(deletedId) {
    deleteFromDB(deletedId, "goals");
  }

  function deleteAll() {
    Alert.alert("Delete All", "Are you sure you want to delete all goals?", [
      {
        text: "Yes",
        onPress: () => {
          deleteAllFromDB("goals");
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
        <PressableButton
          pressedHandler={() => setModalVisible(true)}
          componentStyle={{ backgroundColor: "purple" }}
        >
          <Text style={styles.buttonText}>Add a Goal</Text>
        </PressableButton>
      </View>
      <Input
        textInputFocus={true}
        inputHandler={handleInputData}
        isModalVisible={modalVisible}
        dismissModal={dismissModal}
      />
      <View style={styles.bottomView}>
        <FlatList
          ItemSeparatorComponent={({ highlighted }) => (
            <View
              style={{
                height: 5,
                backgroundColor: highlighted ? "purple" : "gray",
              }}
            />
          )}
          ListEmptyComponent={<Text style={styles.header}>No goals to show</Text>}
          ListHeaderComponent={
            goals.length ? <Text style={styles.header}>My Goals List</Text> : null
          }
          ListFooterComponent={
            goals.length ? <Button title="Delete all" onPress={deleteAll} /> : null
          }
          contentContainerStyle={styles.scrollViewContainer}
          data={goals}
          renderItem={({ item, separators }) => (
            <GoalItem
              separators={separators}
              deleteHandler={handleGoalDelete}
              goalObj={item}
            />
          )}
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
  bottomView: { flex: 4, backgroundColor: "#dcd" },
  header: {
    color: "indigo",
    fontSize: 25,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});
