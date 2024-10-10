import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import PressableButton from "./PressableButton";
import { Ionicons } from '@expo/vector-icons';

export default function GoalDetails({ navigation, route }) {
  const [warning, setWarning] = useState(false);

  function warningHandler() {
    setWarning(true);
    navigation.setOptions({ title: "Warning!" });
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <PressableButton
            pressedHandler={warningHandler}
            componentStyle={styles.warningButton}
            pressedStyle={styles.pressedStyle}
          >
            <Ionicons name="warning-outline" size={24} color="white" />
          </PressableButton>
        );
      },
    });
  }, []);

  function moreDetailsHandler() {
    navigation.push("Details");
  }

  return (
    <View>
      {route.params ? (
        <Text style={warning && styles.warningStyle}>
          This is details of a goal with text {route.params.goalData.text} and
          id {route.params.goalData.id}
        </Text>
      ) : (
        <Text style={warning && styles.warningStyle}>More details</Text>
      )}
      <Button title="More Details" onPress={moreDetailsHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  warningStyle: {
    color: "red",
  },
  warningButton: {
    backgroundColor: "purple",
    padding: 10,
    borderRadius: 5,
  },
  pressedStyle: {
    backgroundColor: "darkred",
    opacity: 0.8,
  },
});
