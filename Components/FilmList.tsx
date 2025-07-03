// Components/FilmList.tsx

import React from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PosterImage from './PosterImage';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Film } from '../service/film_api';  // Ensure the correct path to your film_api.ts file

type Props = {
  films: Film[];
};

const FilmList: React.FC<Props> = ({ films }) => {
  const navigation = useNavigation<NavigationProp<any, any>>();

  const renderItem = ({ item }: { item: Film }) => (
    <TouchableOpacity onPress={() => navigation.navigate('FilmDetail', { film: item })} style={styles.item}>
      <PosterImage uri={item.poster} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={films}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      onEndReachedThreshold={0.5}
      onEndReached={() => console.log('Load more films...')}
    />
  );
};

const styles = StyleSheet.create({
  item: { marginBottom: 20, alignItems: 'center' },
  image: { width: 200, height: 300, borderRadius: 10 },
  title: { marginTop: 10, fontSize: 18, fontWeight: 'bold' },
});

export default FilmList;