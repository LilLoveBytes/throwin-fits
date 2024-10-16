import { Text, StyleSheet, TextInput, Button} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import React from 'react'
import COLORS from '../constants/colors';
import axios from 'axios';

const LogIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  handleLogIn = () => {
    const newIp = '10.0.0.6:5000'
    axios
    .post(`http://${newIp}/users/login`, { email, password })
    .then((response) => {
      console.log('Log in successful, response:', response.data);
      navigation.navigate('Home');
    })
    .catch((error) => {
      console.error('Error occurred during log in:', error);
      console.error(email, password)

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
      <Text style={styles.SignUpText}>Existing User LogIn</Text>
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
        <Button title="Log In" onPress={handleLogIn}/>
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

export default LogIn