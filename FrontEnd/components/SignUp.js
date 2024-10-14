import { Text, StyleSheet, TextInput, Button, Alert,  KeyboardAvoidingView, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import COLORS from '../constants/colors';

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignUp = () => {
    if (!isValidEmail(email)) {
      console.log('Unsuccesful. Please enter a valid email address');
      Alert.alert('Unsuccesful. Please enter a valid email address');
      return;
    }
    const expoGoIp = '10.0.0.6:8081'
    const localIp = '127.0.0.1:5000'
    const newIp = '10.0.0.6:5000'
    axios
      .post(`http://${newIp}/users/register`, { username, email, password })
      .then((response) => {
        console.log('Sign up successful, response:', response.data);
        Alert.alert('Sign up successful');
        navigation.navigate('LoginScreen');
        
      })
      .catch((error) => {
        console.error('Error occurred during sign up:', error);
        Alert.alert('Error occurred during sign up:', error);

        if (error.response) {
          console.log('Server responded with status:', error.response.status);
          console.log('Response data:', error.response.data);
        } else if (error.request) {
          console.log('No response received. Request:', error.request);
        } else {
          console.log('Error during request setup:', error.message);
        }
      })
  }
  return (
    <SafeAreaView>
      <Text style={styles.SignUpText}>Sign Up</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}/>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}/>
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry/>
        <Button title="Sign Up" onPress={handleSignUp}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  SignUpText: {
    margin: 5,
    color: COLORS.teal,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    textShadowColor: COLORS.babypowder,
    textShadowOffset: { width: 6, height: 6 },
    textShadowRadius: 20,
  },
  textInput: {
    margin: 5,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  }
})

export default SignUp;