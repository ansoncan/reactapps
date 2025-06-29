import React, { forwardRef } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import { Film, RootStackParamList } from './navigation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import PosterImage from './PosterImage';

interface FilmListProps {
  films: Film[];
  onScroll: (event: any) => void;
  noFilmsMessage?: string; // Add a prop for the message when there are no films
}

export const FilmList = forwardRef<FlatList, FilmListProps>(
  ({ films, onScroll, noFilmsMessage }, ref) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    if (!films.length && noFilmsMessage) {
      return (
        <View style={styles.centered}>
          <Text>{noFilmsMessage}</Text>
        </View>
      );
    }

    const renderItem = ({ item }: { item: Film }) => (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          !item.poster ? null : navigation.navigate('FilmDetail', { film: item })
        }
      >
        <PosterImage uri={item.poster} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.separator} />
      </TouchableOpacity>
    );

    return (
      <View style={styles.flatlistWrapper}>
        <FlatList
          ref={ref}
          data={films}
          keyExtractor={(item, index) => `${item._id}_${index}`}
          renderItem={renderItem}
          contentContainerStyle={styles.flatlistContent}
          onScroll={onScroll}
          scrollEventThrottle={16}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  flatlistWrapper: {
    flex: 1,
    width: '100%',
  },
  flatlistContent: {
    padding: 20, // Adjust for iPhone demo
  },
  item: {
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 300,
    borderRadius: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 18, // Adjusting for iPhone demo
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  separator: {
    marginTop: 10,
    width: '80%',
    height: 1,
    backgroundColor: '#ccc',
    alignSelf: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});