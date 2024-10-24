import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { addDocToSubcollection, getDocsFromSubcollection } from "../Firebase/firestoreHelper";

export default function GoalUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const goalId = "your-goal-id"; 

  useEffect(() => {
    async function fetchUsers() {
      try {

        const existingUsers = await getDocsFromSubcollection("goals", "users", goalId);

        if (existingUsers.length > 0) {

          setUsers(existingUsers);
          setLoading(false);
        } else {

          const response = await fetch("https://jsonplaceholder.typicode.com/users");
          const data = await response.json();
          setUsers(data);

          data.forEach(async (user) => {
            await addDocToSubcollection(user, "goals", "users", goalId);
          });

          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
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
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()} 
        renderItem={({ item }) => (
          <Text style={styles.userText}>{item.name}</Text>
        )}
        ListEmptyComponent={<Text>No users found.</Text>}
      />
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
