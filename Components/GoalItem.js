import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function GoalItem({ goalObj, deleteHandler, onPressDetails }) {

  function handleDelete() {
    deleteHandler(goalObj.id);
  }

  function handlePressDetails() {
    onPressDetails(goalObj);
  }

  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>{goalObj.text}</Text>
      <Button title="X" color="grey" onPress={handleDelete} />
      <Button title="i" color="blue" onPress={handlePressDetails} />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "purple",
    padding: 5,
    fontSize: 16,
  },
  textContainer: {
    backgroundColor: "#aaa",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent: "space-between",
    alignSelf: "center",
    maxWidth: '90%',
    flexWrap: 'wrap',
    marginVertical: 5,
  },
});
