// AddFilmScreen.tsx

import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
// Import the Film type
import { searchFilm, submitFilm, Film } from '../service/film_api';

const AddFilmScreen = () => {
  const [title, setTitle] = useState('');
  const [filmData, setFilmData] = useState<Film | null>(null);
  const navigation = useNavigation();

  // Use the imported function to search for a film
  const handleSearchFilm = async () => {
    try {
      const data: Film = await searchFilm(title);
      setFilmData(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch film data');
    }
  };

  // Use the imported function to submit a film
  const handleSubmitFilm = async () => {
    if (!filmData) return;

    try {
      await submitFilm(filmData);
      Alert.alert('Success', 'Film added successfully');
      navigation.navigate('HomeScreen' as never);
    } catch (error) {
      Alert.alert('Error', 'Failed to add film');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter film title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <Button title="Search" onPress={handleSearchFilm} />
      {filmData && (
        <View style={styles.details}>
          <Text>Title: {filmData.title}</Text>
          {/* Add other film properties as needed */}
          <Button title="Submit Film" onPress={handleSubmitFilm} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  details: { marginTop: 20 },
});

export default AddFilmScreen;