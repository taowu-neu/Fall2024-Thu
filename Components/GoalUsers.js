import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator, FlatList } from "react-native";

export default function GoalUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 定义异步函数
    async function fetchUsers() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        setUsers(data); // 使用获取到的数据设置 users 状态变量
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }
    // 调用异步函数
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
        keyExtractor={(item) => item.id.toString()} // 确保 key 是字符串
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
