import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Button,
  Alert,
  Pressable,
} from "react-native";
import {
  addDocToSubcollection,
  getDocsFromSubcollection,
  deleteDocFromSubcollection,
} from "../Firebase/firestoreHelper";

export default function GoalUsers({ goalId }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const existingUsers = await getDocsFromSubcollection(
          "goals",
          "users",
          goalId
        );

        if (existingUsers.length > 0) {
          setUsers(existingUsers);
          setLoading(false);
        } else {
          const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
          );
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
  }, [goalId]);

  async function handleAddUser() {
    const newUser = {
      name: "John Doe",
    };

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const createdUser = await response.json();
      Alert.alert("User Added", `Added user with ID: ${createdUser.id}`);

      setUsers((prevUsers) => [...prevUsers, createdUser]);
      await addDocToSubcollection(createdUser, "goals", "users", goalId);
    } catch (error) {
      console.error("Error adding user:", error);
      Alert.alert("Error", "Could not add user.");
    }
  }

  async function handleDeleteUser(userId) {
    try {
      await deleteDocFromSubcollection("goals", "users", goalId, userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      Alert.alert("User Deleted", `User with ID: ${userId} has been deleted.`);
    } catch (error) {
      console.error("Error deleting user:", error);
      Alert.alert("Error", "Could not delete user.");
    }
  }

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
          <View style={styles.userContainer}>
            <Text style={styles.userText}>{item.name}</Text>
            <Pressable
              style={styles.deleteButton}
              onPress={() => handleDeleteUser(item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={<Text>No users found.</Text>}
      />
      <Button title="Add User" onPress={handleAddUser} />
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
  userContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  userText: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
