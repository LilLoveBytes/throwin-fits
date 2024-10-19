import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Home, Login, LoginScreen, Signup } from "./screens";
import StartLanding from "./screens/StartLanding";
import SignUpScreen from "./screens/SignUpScreen";
import SignUp from "./components/SignUp";
import AddGarmentScreen from "./screens/AddGarmentScreen";

const Stack = createStackNavigator()
export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Start">
				<Stack.Screen
					name="Home"
					component={Home}
          options={{ title: "ThrowinFits" }}
				/>
				<Stack.Screen
					name="LoginScreen"
					component={LoginScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="SignUpScreen"
					component={SignUpScreen}
					options={{ headerShown: false }}
				/>
        <Stack.Screen
        name="Start"
        component={StartLanding}
        options={{ title: "ThrowinFits" }}
        />
        <Stack.Screen
        name="AddGarmentScreen"
        component={AddGarmentScreen}
        options={{ title: "ThrowinFits" }}
        />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
