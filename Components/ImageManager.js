import { Alert, Button, Image, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function ImageManager({ onImageTaken }) {
  const [imageUri, setImageUri] = useState(null);
  const [response, requestPermission] = ImagePicker.useCameraPermissions();

  async function verifyPermission() {
    try {
      if (response.granted) {
        return true;
      }
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    } catch (err) {
      console.log("verify permission ", err);
    }
  }

  async function takeImageHandler() {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert("You need to give permission for the camera.");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });

      if (!result.canceled && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setImageUri(uri);
        onImageTaken(uri); // Call the passed function with the image URI
      }
    } catch (err) {
      console.log("take image ", err);
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Take An Image" onPress={takeImageHandler} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
});
