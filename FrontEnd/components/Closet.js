import { View, Text, StyleSheet, TextInput, Button, Alert, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import COLORS from '../constants/colors';


const Closet = ({ navigation }) => {
  const [garmentCategoriesList, setGarmentCategoriesList] = useState([]);

  useEffect(() => {
    const getAllGarmentCategories =  async () => {
      const IpAddress = '10.0.0.6:5000'
      try {
        const response = await axios.get(`http://${IpAddress}/garmentCategories`);
        let category_names = response.data.map((category) => category.category_name);
        setGarmentCategoriesList(category_names);
      } catch(error){
        console.error('Error occured during get all garments:', error);
        Alert.alert('Error occured during get all garments:', error);
      };
    } 
    getAllGarmentCategories();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View>
        <Text style={styles.listheading}>{item}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Closet</Text>
      <FlatList
      data={garmentCategoriesList}
      renderItem={renderItem}
      />
    </SafeAreaView>
  );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    heading: {
      fontSize: 20,
      fontWeight: 'bold',
      color: COLORS.white,
    },
    listheading: {
      fontSize: 28,
      fontWeight: 'bold',
      color: COLORS.black,
      padding: 10,
    }
  });
export default Closet