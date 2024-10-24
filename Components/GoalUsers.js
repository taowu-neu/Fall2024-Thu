import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";

export default function GoalUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchUsers() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="purple" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Users:</Text>
      {users.map((user) => (
        <Text key={user.id} style={styles.userText}>
          {user.name} - {user.email}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  userText: {
    fontSize: 16,
    marginVertical: 2,
  },
});
