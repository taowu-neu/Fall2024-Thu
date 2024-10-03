import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function GoalDetails({ route }) {
  const { goalText } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Goal Details</Text>
      <Text style={styles.goalText}>{goalText}</Text>
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
