import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import PressableButton from "./PressableButton";
import { MaterialIcons } from '@expo/vector-icons';

export default function GoalItem({ goalObj, deleteHandler }) {
  const navigation = useNavigation();

  function handleDelete() {
    console.log("deleted");
    deleteHandler(goalObj.id);
  }
  function handlePress() {
    navigation.navigate("Details", { goalData: goalObj });
  }
  return (
    <View style={styles.textContainer}>
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => {
          return [styles.horizontalContainer, pressed && styles.pressedStyle];
        }}
        android_ripple={{ color: "red", radius: 25 }}
      >
        <Text style={styles.text}>{goalObj.text}</Text>

        {/* Icon for delete button */}
        <PressableButton
          componentStyle={styles.deleteButton}
          pressedHandler={handleDelete}
          pressedStyle={styles.pressedStyle}
        >
          {/* Replace Text component with a MaterialIcons delete icon */}
          <MaterialIcons name="delete" size={24} color="white" />
        </PressableButton>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "purple",
    padding: 5,
    fontSize: 30,
  },
  textContainer: {
    borderRadius: 5,
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  horizontalContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#aaa",
  },
  pressedStyle: {
    opacity: 0.5,
    backgroundColor: "red",
  },
  deleteButton: {
    backgroundColor: "grey",
  },
});
