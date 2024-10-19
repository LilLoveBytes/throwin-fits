import { Text } from 'react-native'
import { SafeAreaView } from 'react-native';
import React from 'react'
import LogIn from '../components/LogIn'

const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <LogIn navigation={navigation}/>
    </SafeAreaView>
  )
  }

export default LoginScreen