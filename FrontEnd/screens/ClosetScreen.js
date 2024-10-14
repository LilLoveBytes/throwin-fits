import { View, Text } from 'react-native'
import React from 'react'
import Closet from '../components/Closet'

const ClosetScreen = () => {
  return (
    <View>
      <Closet />
      <View>
        <Text> New Garment Category </Text>
        <Text> Remove Garment Category </Text>
      </View>
    </View>
  )
}

export default ClosetScreen