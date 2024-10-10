import { Pressable, StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function GoalItem({ goalObj, handleDelete }) {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Details", { goalObj });
      }}
      android_ripple={{
        color: "purple",
        borderless: false,
        radius: 50,
      }}
    >
      <View style={styles.textContainer}>
        <Text style={styles.text}>{goalObj.text}</Text>
        <Button
          title="X"
          onPress={() => {
            handleDelete(goalObj.id);
          }}
          color="grey"
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "purple",
    fontSize: 35,
    padding: 5,
  },
  textContainer: {
    backgroundColor: "#aaa",
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
});
