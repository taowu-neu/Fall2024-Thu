import React from "react";
import Home from "./Components/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoalDetails from "./Components/GoalDetails";
import LoginScreen from "./Components/LoginScreen";
import SignupScreen from "./Components/SignupScreen";
import { Button } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "purple" },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Login" }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ title: "Signup" }} />
        <Stack.Screen name="Home" component={Home} options={{ title: "All My Goals" }} />
        <Stack.Screen name="Details" component={GoalDetails} options={{ title: "More Details" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
