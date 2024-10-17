import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import PressableButton from "./PressableButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import { addWarningToGoal } from "../Firebase/firestoreHelper";

export default function GoalDetails({ navigation, route }) {
  const [warning, setWarning] = useState(false);

  function warningHandler() {
    setWarning(true);
    navigation.setOptions({ title: "Warning!" });
    if (route.params && route.params.goalData) {
      addWarningToGoal(route.params.goalData.id, "goals");
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <PressableButton
            pressedHandler={warningHandler}
            componentStyle={{ backgroundColor: "purple" }}
            pressedStyle={{ opacity: 0.5, backgroundColor: "purple" }}
          >
            <AntDesign name="warning" size={24} color="white" />
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
});
