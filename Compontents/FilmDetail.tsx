//FilmDetail.tsx

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import PosterImage from './PosterImage'; // Adjust path if needed

export default function FilmDetailScreen({ route }: any) {
  const { film } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PosterImage uri={film.poster} style={styles.image} />
      <Text style={styles.title}>{film.title}</Text>
      <View style={styles.detailRow}>
        <Text style={styles.detailKey}>Year:</Text>
        <Text style={styles.detailValue}>{film.year}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailKey}>Released:</Text>
        <Text style={styles.detailValue}>{film.released}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailKey}>Runtime:</Text>
        <Text style={styles.detailValue}>{film.runtime} mins</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailKey}>Language:</Text>
        <Text style={styles.detailValue}>{film.language}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailKey}>Genre:</Text>
        <Text style={styles.detailValue}>{film.genre}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailKey}>Director:</Text>
        <Text style={styles.detailValue}>{film.director}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 350,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Align items to the start
    width: '80%',
    marginBottom: 5,
  },
  detailKey: {
    fontSize: 16,
    width: 120, // Fixed width for the key
    textAlign: 'left',
  },
  detailValue: {
    fontSize: 16,
    flex: 1, // Takes up remaining space for the value
    marginLeft: 10, // Space between key and value
  },
});