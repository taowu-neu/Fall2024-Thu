import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState, useLayoutEffect } from "react";

export default function GoalDetails({ navigation, route }) {
  const [isWarning, setIsWarning] = useState(false);
  const goalData = route.params?.goalData;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isWarning ? "Warning!" : goalData?.text || "More Details",
      headerRight: () => (
        <Button
          title="Warning"
          onPress={() => setIsWarning(true)}
        />
      ),
    });
  }, [navigation, isWarning, goalData]);

  return (
    <View>
      {goalData ? (
        <Text style={[styles.text, isWarning && { color: "red" }]}>
          This is details of a goal with text {goalData.text} and id {goalData.id}
        </Text>
      ) : (
        <Text style={[styles.text, isWarning && { color: "red" }]}>
          More details
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: "black",
  },
});
