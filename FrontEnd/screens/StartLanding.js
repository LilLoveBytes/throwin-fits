import { SafeAreaView, Text, StyleSheet, Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';
import React from 'react'
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';

const StartLanding = ({ navigation }) => {
  return (
    <LinearGradient
      style={styles.container}
      colors={[COLORS.babypowder, COLORS.paynesgrey, COLORS.khaki]}>

      <SafeAreaView >
        <Text style={styles.welcomeText}> Welcome to ThrowinFits!</Text>
        <Text style={styles.subText}> sign in or sign up for your virtual closet </Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
      </SafeAreaView>

    </LinearGradient>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {  
    flex: 1,  
    paddingTop: 100,
    color: COLORS.paynesgrey,
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    textShadowColor: COLORS.babypowder,
    textShadowOffset: { width: 6, height: 6 },
    textShadowRadius: 20,
    
  },
  subText: {
    flex: 1,
    color: COLORS.babypowder,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  buttonText: {
    fontSize: 20,
    color: COLORS.babypowder,
    textAlign: 'center',
    paddingBottom: 50,
    margin: 10,
  },
})
export default StartLanding