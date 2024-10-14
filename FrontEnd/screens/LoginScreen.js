import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
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