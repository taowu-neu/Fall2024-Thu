import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

export default function Header(props) {

  return (
    <View>
      <Text>Welcome to {props.name}</Text>
      {/* <Text>{props.children}</Text> */}
    </View>
  )
}

const styles = StyleSheet.create({})