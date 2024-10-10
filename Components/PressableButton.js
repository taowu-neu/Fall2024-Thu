import { Pressable, Text, StyleSheet } from "react-native";  // 确保导入了Pressable
import React from "react";

export default function PressableButton({ title, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{
        color: "purple",
        borderless: true,
      }}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#ddd" : "#fff",
        },
        styles.button,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "purple",
    alignItems: "center",
  },
  text: {
    color: "purple",
    fontSize: 16,
  },
});
