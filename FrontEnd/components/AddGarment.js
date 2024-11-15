import React, { useState, useCallback } from "react";
import {
	SafeAreaView,
	View,
	Text,
	TouchableOpacity,
	Alert,
  Button,
} from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CategorySelector from "./CategorySelector";

const AddGarment = ({ navigation }) => {
	const [cameraPermision, requestCameraPermission] =
		ImagePicker.useCameraPermissions();
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [selectedUri, setSelectedUri] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSaveButton, setShowSaveButton] = useState(false);

	const handleCameraAccess = useCallback(async () => {
		if (!cameraPermision?.granted) {
			const { granted } = await requestCameraPermission();
			if (!granted) {
				Alert.alert("Camera access was not granted.");
				return;
			}
		}
		openImagePicker(ImagePicker.launchCameraAsync);
	}, [cameraPermision, requestCameraPermission]);

	const handleAlbumAccess = useCallback(() => {
		openImagePicker(ImagePicker.launchImageLibraryAsync);
	}, []);

	const openImagePicker = async (launchFunction) => {
		const result = await launchFunction({
			mediaTypes: ['images'],
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		if (!result.canceled) {
			setSelectedUri(result.assets[0].uri);
			setShowModal(true);
		}
	};


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

	savePhotoToGarments = useCallback(async () => {
		if (!selectedCategory || !selectedUri) return;

		const formData = new FormData();
		formData.append("image", {
			uri: selectedUri,
			name: "photo", //ToDo: get photo name
			type: "image/jpeg", //ToDo: geet mime type
		});
		formData.append("category", selectedCategory);

		try {
			const token = await AsyncStorage.getItem("authToken");
			const response = await axios.post(
				"http://10.0.0.6:5000/garments",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log("Photo saved with respsonse:", response.data);
			navigation.navigate("AddGarmentScreen"); //ToDo: navigate to edits screen
		} catch (error) {
			console.error("Error saving photo", error);
		}
	}, [selectedCategory, selectedUri, navigation]);

	const confirmSave = useCallback(() => {
		Alert.alert(
			"Confirm Save",
			`Save this garment in ${selectedCategory} category?`,
			[
				{ text: "Cancel", style: "cancel" },
				{ text: "Save", onPress: savePhotoToGarments },
			]
		);
    // setShowSaveButton(false);
	}, [selectedCategory, savePhotoToGarments]);

	// useEffect(() => {
	// 	if (selectedCategory) {
	// 		confirmSave();
	// 	}
	// }, [selectedCategory, confirmSave]);

	return (
		<SafeAreaView>
			<View>
				<TouchableOpacity onPress={handleCameraAccess}>
					<Text> Open Camera </Text>
				</TouchableOpacity>
			</View>
			<View>
				<TouchableOpacity onPress={handleAlbumAccess}>
					<Text> Select From Photo Library </Text>
				</TouchableOpacity>
			</View>
      <CategorySelector 
      visible={showModal}
      onClose={() => setShowModal(false)}
      onSelectCategory={(category) => {
        if (category) {
          setSelectedCategory(category);
          setShowModal(false);
          setShowSaveButton(true);
        }
      }} 
      />
      {showSaveButton && (
        <Button title="Save Garment" onPress={confirmSave} />
      )}
		</SafeAreaView>
	);
};
export default AddGarment;
