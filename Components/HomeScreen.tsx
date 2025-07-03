import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { getFilms } from '../service/film_api'; // Ensure this is correctly imported
import FilmList from './FilmList';
import Footer from './Footer';

// Import the Film type
import { Film } from '../service/film_api';

const HomeScreen = () => {
  const [films, setFilms] = useState<Film[]>([]); // Define films state with Film[]
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const data = await getFilms();
        setFilms(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFilms();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator size="large" color="#4DA8DA" /> : <FilmList films={films} />}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default HomeScreen;