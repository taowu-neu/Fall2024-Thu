import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function Header(props) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerStyle}>Welcome to {props.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    fontSize: 20,
    borderColor: 'purple',
    borderWidth: 2,
    margin: 15,
    padding: 10,
    color: 'purple',
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
