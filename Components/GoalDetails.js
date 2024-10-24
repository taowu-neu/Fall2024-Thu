import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import PressableButton from "./PressableButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import { updateDB } from "../Firebase/firestoreHelper";
import GoalUsers from "./GoalUsers"; 

export default function GoalDetails({ navigation, route }) {
  const [warning, setWarning] = useState(false);
  const goalId = route.params.goalData.id;

  function warningHandler() {
    setWarning(true);
    navigation.setOptions({ title: "Warning!" });
    updateDB(goalId, { warning: true }, "goals");
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
          id {goalId}
        </Text>
      ) : (
        <Text style={warning && styles.warningStyle}>More details</Text>
      )}
      <Button title="More Details" onPress={moreDetailsHandler} />
      <GoalUsers goalId={goalId} /> 
    </View>
  );
}

const styles = StyleSheet.create({
  warningStyle: {
    color: "red",
  },
});
