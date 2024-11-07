import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity} from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const AddGarment = ({ navigation }) => {
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  selectPhotoFromCamera = async () => {
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
     //  console.log(garment_image.uri)
      savePhotoToGarments(garment_image.uri)
    }
  }

  selectPhotoFromAlbum = async () => {
    if (status.granted === false) {
      const permissionRequest = await requestPermission();
      if (permissionRequest.granted === false) {
        alert('Camera access has not been granted')
        return;
      }
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    })
    if (!result.canceled) {
      garment_image = result.assets[0]
      // console.log(garment_image, garment_image.uri)
      savePhotoToGarments(garment_image.uri)
    }

  }

  /* 
  editPhoto = () => {
  }
  */

  savePhotoToGarments = async (result) => {
    const newIp = '10.0.0.6:5000'
    let formData = new FormData();
    formData.append('image', {
      uri: result, 
      name: 'photo', //ToDo: get photo name
      type: 'image/jpeg' //ToDo: get mime type
    });
    formData.append('uri', result)
    formData.append('category', 'Tops')
    console.log('savePhoto response', result)

  
    try {
      const token = await AsyncStorage.getItem('authToken')
      const response = await axios.post(`http://${newIp}/garments`, formData, { 
        headers: {
          'Content-Type': 'multipart/form-data', 
          'Authorization': `Bearer ${token}`,
        }, 
      });
        console.log('Photo saved, response:', response.data);
        navigation.navigate('AddGarmentScreen');
    } catch (error) {
      console.error('Error trying to save photo', error);
     // alert('Error uploading photo')
    }
  }
  


  return (
      <SafeAreaView>
        <View>
          <TouchableOpacity onPress={ selectPhotoFromCamera }>
        <Text> Open Camera </Text>
        </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={ selectPhotoFromAlbum }>
        <Text> Select From Photo Library  </Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    
  )
}
export default AddGarment;