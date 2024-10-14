import { Text, TextInput, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import { SafeAreaView } from 'react-native-safe-area-context';
import SignUp from '../components/SignUp';
import COLORS from '../constants/colors';

const SignUpScreen = ({ navigation }) => {

  return(
  <SafeAreaView>
     <SignUp navigation={navigation} />
  </SafeAreaView>
  )
}

export default SignUpScreen