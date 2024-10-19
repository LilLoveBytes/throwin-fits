import {
	SafeAreaView,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Icon,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import COLORS from "../constants/colors";

const Home = ({ navigation }) => {
	return (
		<LinearGradient
			style={styles.container}
			colors={[COLORS.babypowder, COLORS.paynesgrey, COLORS.khaki]}
		>
			<SafeAreaView style={styles.safeArea}>
				<View style={styles.headerView}>
					<Text style={styles.headerText}> Home </Text>
				</View>

				<View style={styles.row}>
					<TouchableOpacity
						style={styles.square}
						onPress={
							() => navigation.navigate("AddGarmentScreen") /* open camera/camera roll */
						}
					>
						<Text style={styles.subText}>Add Garment</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.row}>
					<TouchableOpacity
						style={styles.square}
						onPress={() => navigation.navigate("Closet")}
					>
						<Text style={styles.subText}>Generate Outfit</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</LinearGradient>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
	},
	safeArea: {
		justifyContent: "center",
		alignItems: "flex-start",
	},
	headerView: {
		alignContent: "center",
		justifyContent: "center",
		flexWrap: "wrap",
	},
	headerText: {
		color: COLORS.paynesgrey,
		fontSize: 30,
		fontWeight: "bold",
		textAlign: "center",
		marginTop: 1,
		marginBottom: 100,
		textShadowColor: COLORS.khaki,
		textShadowOffset: { width: 6, height: 6 },
		textShadowRadius: 20,
	},
	subText: {
		color: COLORS.babypowder,
		fontSize: 20,
		textAlign: "center",
		margin: 10,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		width: "100%",
		marginTop: 20,
	},
	square: {
		width: 150,
		height: 150,
		justifyContent: "center",
		alignItems: "center",
		margin: 10,
	},
});
export default Home;
