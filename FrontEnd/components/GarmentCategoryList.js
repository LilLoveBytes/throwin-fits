import { View, Text } from 'react-native'
import React from 'react'
import GarmentCategory from './GarmentCategories'

const GarmentCategoryList = () => {
  return (
    <View>
      <Text>GarmentCategoryList</Text>
      <ul>
        <li><GarmentCategory /></li>
        <li><GarmentCategory /></li>
      </ul>
    </View>
  )
}

export default GarmentCategoryList