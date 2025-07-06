// // //FilmList;


import React from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import PosterImage from "./PosterImage";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Film } from "../service/film_api";


type Props = {
  films: Film[];
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  listRef: React.RefObject<FlatList<any>>;
  isSearchSubmitted: boolean; // Add this prop
};

const FilmList: React.FC<Props> = ({ films, onScroll, listRef, isSearchSubmitted }) => {
  const navigation = useNavigation<NavigationProp<any, any>>();

  return (
    <FlatList
      ref={listRef}
      data={films}
      keyExtractor={(item) => item._id || Math.random().toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("FilmDetail", {
              film: {
                ...item,
                fromSearch: isSearchSubmitted, // Pass this prop
                source: item.source,
              },
            })
          }
          style={styles.item}
        >
          <PosterImage uri={item.poster} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
      )}
      onScroll={onScroll}
      scrollEventThrottle={16}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    marginBottom: 30,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 180,
    height: 270,
    borderRadius: 12,
  },
  title: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
});

export default FilmList;