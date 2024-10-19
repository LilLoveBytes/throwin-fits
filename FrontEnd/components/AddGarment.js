import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";


const AddGarment = ({ navigation }) => {
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  openCamera = async () => {
    if (status.granted === false) {
      const permissionRequest = await requestPermission();
      if (permissionRequest.granted === false) {
        alert('Camera access has not been granted')
        return;
      }
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, 
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    if (!result.canceled) {
      garment_image = result.assets[0]
      console.log(garment_image.uri)
    }

  }

  return (
      <SafeAreaView>
        <View>
          <TouchableOpacity onPress={ openCamera }>
        <Text> Open Camera </Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    
  )
}
export default AddGarment; 