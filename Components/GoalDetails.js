import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";

export default function GoalDetails({ route, navigation }) {
  const { goalObj } = route.params;


  function handleMoreDetails() {

    navigation.navigate("Details", {
      goalObj: {
        ...goalObj, 
        text: goalObj.text + " - More Details", 
      },
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Goal Details</Text>
      <Text style={styles.goalText}>ID: {goalObj.id}</Text> 
      <Text style={styles.goalText}>Text: {goalObj.text}</Text> 
      <Button title="More Details" onPress={handleMoreDetails} /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  goalText: {
    fontSize: 18,
    color: "gray",
  },
});
