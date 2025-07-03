//FilmDetail.tsx


import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { addFilm } from '../service/film_api';

// ... existing imports ...

import { Film } from '../service/film_api'; // Import the Film type

// Define the type for route params
interface RouteParams {
  film: Film;
  isAdmin: boolean;
}

// Extract the type of the route params from the useRoute hook
type NavigationRoute = {
  key?: string; // Optional properties to satisfy RouteProp<ParamListBase>
  name?: string; // Optional properties to satisfy RouteProp<ParamListBase>
  path?: string; // Optional properties to satisfy RouteProp<ParamListBase>
} & { params: RouteParams };

const FilmDetail = () => {
  // Type assertion to inform TypeScript about the expected types
  const { film, isAdmin } = useRoute<NavigationRoute>().params;

  const handleAddFilm = () => {
    Alert.alert('Confirm', 'Add this film to the database?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Add',
        onPress: async () => {
          try {
            await addFilm(film);
            Alert.alert('Success', 'Film added.');
          } catch (error) {
            // Handle error as unknown and extract message
            const errMsg = (error as Error).message || 'An error occurred';
            Alert.alert('Error', errMsg);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{film.title}</Text>
      <Text>{film.year}</Text>
      <Text>{film.genre}</Text>
      {isAdmin && (
        <TouchableOpacity onPress={handleAddFilm} style={styles.button}>
          <Text style={styles.buttonText}>Add to Database</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  button: { marginTop: 20, backgroundColor: '#4DA8DA', padding: 10 },
  buttonText: { color: '#fff', textAlign: 'center' },
});

export default FilmDetail;