import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, Alert } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const AddGarment = ({ navigation }) => {
  const [cameraPermision, requestCameraPermission] = ImagePicker.useCameraPermissions();
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedUri, setSelectedUri] = useState(null)

  const handleCameraAccess = useCallback(async () => { 
    if(!cameraPermision?.granted) {
      const { granted } = await requestCameraPermission();
      if (!granted) {
        Alert.alert('Camera access was not granted.');
        return;
      }
    } 
    openImagePicker(ImagePicker.launchCameraAsync);
  }, [cameraPermision, requestCameraPermission]);

  const handleAlbumAccess = useCallback ( () => {
    openImagePicker(ImagePicker.launchImageLibraryAsync);
  }, []
  );

  const openImagePicker = async (launchFunction) => {
    const result = await launchFunction({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, 
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    if (!result.canceled) {
      setSelectedUri(result.assets[0].uri);
      promptCategorySelect();
    };
  }

  const promptCategorySelect = useCallback(() => {
    Alert.alert('Select a category for this garment', 
      [
        { text: "Tops", onPress: () => setSelectedCategory("Tops")},
        { text: "Bottoms", onPress: () => setSelectedCategory("Bottoms")},
        { text: "Dresses", onPress: () => setSelectedCategory("Dresses")},
        { text: "Accessories", onPress: () => setSelectedCategory("Accessories")},
        { text: "Shoes", onPress: () => setSelectedCategory("Shoes")},
        { text: "Cancel", style: "cancel"},
      ]
    );
  }, []);

// Should category selection happen during selecting from camera 
// or during save or its own method to implement in select or save methods
  /* 
  const editPhoto = async (image) => {
    const editedPhoto = await ImageManipulator.manipulateAsync(
      image, 
      [ 
        {rotate: rotation },
      ]
    )

  }
  */
  const confirmSave = useCallback(() => {
    Alert.alert(
      "Confirm Save",
      `Save this garment in ${selectedCategory} category?`,
      [
        { text: "Cancel", style: "cancel" }, 
        { text: "Save", onPress: savePhotoToGarments },
      ]
    );
  }, [selectedCategory, savePhotoToGarments]);

  savePhotoToGarments = useCallback(async () => {
    if (!selectedCategory || !selectedUri) return; 

    const formData = new FormData();
    formData.append('imagee', {
      uri: selectedUri,
      name: 'photo', //ToDo: get photo name
      type: 'image/jpeg' //ToDo: geet mime type
    })
    formData.append("category", selectedCategory)

    try {
      const token = await AsyncStorage.getItem('authToken')
      const response = await axios.post("http://10.0.0.6:5000/garments", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
        console.log('Photo saved with respsonse:', response.data)
        navigation.navigate('AddGarmentScreen'); //ToDo: navigate to edits screen
    } catch (error) {
      console.error('Error saving photo', error)
    }

    }, [selectedCategory, selectedUri, navigation]);

    useEffect(() => {
      if (selectedCategory) {
        confirmSave();
      };
    }, [selectedCategory, confirmSave]);

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