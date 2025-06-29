import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Octicons';
import PosterImage from './PosterImage';

export default function FilmDetailScreen({ route }: any) {
  const navigation = useNavigation<any>();
  const { film } = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIcon}>
          <Icon name="chevron-left" size={24} color="#bcbcbc" />
        </TouchableOpacity>
      ),
      headerTitle: film.title,
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#000',
    });
  }, [navigation, film]);

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
    paddingTop: 50, // iPhone-specific adjustment
  },
  image: {
    width: 250,
    height: 350,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24, // Adjusting for iPhone demo
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '80%',
    marginBottom: 5, // Adjusting for iPhone demo
  },
  detailKey: {
    fontSize: 16,
    width: 120,
    textAlign: 'left',
  },
  detailValue: {
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
  headerIcon: {
    marginLeft: 15, // Adjusting for iPhone demo
  },
});