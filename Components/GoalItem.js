import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from '@react-navigation/native';

export default function GoalItem({ goalObj, deleteHandler }) {
  const navigation = useNavigation();

  function handleDelete() {
    deleteHandler(goalObj.id);
  }

  function handlePress() {
    navigation.navigate('Details', { goalText: goalObj.text });
  }

  return (
    <View style={styles.textContainer}>
      <Text style={styles.text} onPress={handlePress}>{goalObj.text}</Text>
      <Button title="X" color="grey" onPress={handleDelete} />
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
