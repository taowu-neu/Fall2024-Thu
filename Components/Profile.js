import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { auth } from "../Firebase/firebaseSetup";

export default function Profile() {
  const currentUser = auth.currentUser;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Information</Text>
      {currentUser ? (
        <>
          <Text style={styles.info}>Email: {currentUser.email}</Text>
          <Text style={styles.info}>User ID: {currentUser.uid}</Text>
        </>
      ) : (
        <Text style={styles.info}>No user is currently logged in.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
  },
});
