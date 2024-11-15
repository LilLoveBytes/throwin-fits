import React from "react";
import {
	Modal,
	View,
	TouchableOpacity,
	SafeAreaView,
	StyleSheet,
  Text,
} from "react-native";

const CategorySelector = ({visible, onClose, onSelectCategory}) => {
	
	return (
		<SafeAreaView>
			<View>
				<Modal
					animationType="slide"
					transparent={true}
					visible={visible}
					onRequestClose={onClose}
				>
					<View>
						<View>
							<Text> Select a category for this garment </Text>
							{["Tops", "Bottoms", "Dresses", "Accessories", "Shoes"].map(
								(category) => (
									<TouchableOpacity
										key={category}
										onPress={() => onSelectCategory(category)}
										style={styles.modalButton}
									>
										<Text> {category} </Text>
									</TouchableOpacity>
								)
							)}
							<TouchableOpacity
								onPress={onClose}
								style={styles.cancelButton}
							>
								<Text> Cancel </Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
  },
	button: { 
    padding: 10, 
    backgroundColor: "lightblue", 
    borderRadius: 5 
  },
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	modalContent: {
		width: 300,
		padding: 20,
		backgroundColor: "white",
		borderRadius: 10,
	},
	modalButton: { padding: 10, alignItems: "center" },
	cancelButton: {
		padding: 10,
		alignItems: "center",
		marginTop: 10,
		backgroundColor: "lightgray",
	},
});

export default CategorySelector;
