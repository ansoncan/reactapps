
import React, { useState, useMemo } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
} from "react-native";
import PosterImage from "./PosterImage";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Film } from "../service/film_api";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = {
  films: Film[];
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  listRef: React.RefObject<FlatList<any>>;
  isSearchSubmitted: boolean;
};

const ITEMS_PER_PAGE = 10;

const FilmList: React.FC<Props> = ({
  films,
  onScroll,
  listRef,
  isSearchSubmitted,
}) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const validFilms = films.filter((f) => f != null && typeof f === "object");

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(validFilms.length / ITEMS_PER_PAGE);

  const paginatedFilms = useMemo(() => {
    if (isSearchSubmitted) {
      return validFilms;
    }
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return validFilms.slice(start, start + ITEMS_PER_PAGE);
  }, [validFilms, currentPage, isSearchSubmitted]);

  if (isSearchSubmitted && validFilms.length === 0) {
    return (
      <View style={styles.noRecordContainer}>
        <Text style={styles.noRecordText}>No record</Text>
      </View>
    );
  }

  const isSingleItem = paginatedFilms.length === 1;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        key={isSingleItem ? "1-column" : "2-columns"}
        ref={listRef}
        data={paginatedFilms}
        keyExtractor={(item, index) => item._id || `${item.title}-${index}`}
        numColumns={isSingleItem ? 1 : 2}
        renderItem={({ item }) => (
          <View style={isSingleItem ? styles.singleColumn : styles.column}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("FilmDetail", {
                  film: {
                    ...item,
                    fromSearch: isSearchSubmitted,
                    source: item.source,
                  },
                })
              }
              style={[
                styles.item,
                isSingleItem ? styles.singleItem : styles.multiItem,
              ]}
            >
              <PosterImage
                uri={item.poster}
                style={isSingleItem ? styles.singleImage : styles.image}
              />
              <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
                {item.title}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 0 }}
      />

      {/* Paging Controls with Icons */}
      {!isSearchSubmitted && (
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            <Ionicons
              name="play-back-sharp"
              size={24}
              color={currentPage === 1 ? "#ccc" : "#888"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color={currentPage === 1 ? "#ccc" : "#888"}
            />
          </TouchableOpacity>

          <Text style={styles.pageInfo}>
            {currentPage} / {totalPages}
          </Text>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <Ionicons
              name="chevron-forward"
              size={24}
              color={currentPage === totalPages ? "#ccc" : "#888"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <Ionicons
              name="play-forward-sharp"
              size={24}
              color={currentPage === totalPages ? "#ccc" : "#888"}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    flex: 1,
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  singleColumn: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  item: {
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
  multiItem: {
    height: 330,
    justifyContent: "space-between",
  },
  singleItem: {},
  image: {
    width: "100%",
    aspectRatio: 2 / 3,
    borderRadius: 12,
  },
  singleImage: {
    width: "80%",
    aspectRatio: 2 / 3,
    borderRadius: 12,
  },
  title: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
    lineHeight: 30,
  },
  noRecordContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  noRecordText: {
    fontSize: 18,
    color: "#888",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    borderTopWidth: 0,
    borderColor: "#e0e0e0",
    backgroundColor: "#fff",
    position: "absolute", // Optional: If you want it to overlay
    bottom: -30, // Optional: If you want it to stick to the bottom
    left: 0,
    right: 0,
  },
  iconButton: {
    padding: 8,
  },
  pageInfo: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
});

export default FilmList;
