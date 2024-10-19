import React from "react";
import { SafeAreaView } from "react-native";
import AddGarment from '../components/AddGarment';

const AddGarmentScreen = ({ navigation }) => {

  return (
    <SafeAreaView>
      <AddGarment navigation={navigation} />
    </SafeAreaView>
  )
}

export default AddGarmentScreen