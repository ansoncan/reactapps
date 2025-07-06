// // // // // // //FilmList;

// // // import React from "react";
// // // import {
// // //   FlatList,
// // //   Text,
// // //   TouchableOpacity,
// // //   StyleSheet,
// // //   NativeSyntheticEvent,
// // //   NativeScrollEvent,
// // //   View,
// // // } from "react-native";
// // // import PosterImage from "./PosterImage";
// // // import { useNavigation, NavigationProp } from "@react-navigation/native";
// // // import { Film } from "../service/film_api";

// // // type Props = {
// // //   films: Film[];
// // //   onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
// // //   listRef: React.RefObject<FlatList<any>>;
// // //   isSearchSubmitted: boolean;
// // // };


// // // const FilmList: React.FC<Props> = ({ films, onScroll, listRef, isSearchSubmitted }) => {
// // //   const navigation = useNavigation<NavigationProp<any, any>>();
// // //   const isSingleItem = films.length === 1;

// // //   return (
// // //     <FlatList
// // //       key={isSingleItem ? "1-column" : "2-columns"}
// // //       ref={listRef}
// // //       data={films}
// // //       keyExtractor={(item) => item._id || Math.random().toString()}
// // //       numColumns={isSingleItem ? 1 : 2}
// // //       renderItem={({ item }) => (
// // //         <View style={isSingleItem ? styles.singleColumn : styles.column}>
// // //           <TouchableOpacity
// // //             onPress={() =>
// // //               navigation.navigate("FilmDetail", {
// // //                 film: {
// // //                   ...item,
// // //                   fromSearch: isSearchSubmitted,
// // //                   source: item.source,
// // //                 },
// // //               })
// // //             }
// // //             //style={styles.item}
// // //             style={[styles.item, isSingleItem ? styles.singleItem : styles.multiItem]}
// // //           >
// // //             <PosterImage
// // //               uri={item.poster}
// // //               style={isSingleItem ? styles.singleImage : styles.image}
// // //             />
// // //             <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
// // //               {item.title}
// // //             </Text>
// // //           </TouchableOpacity>
// // //         </View>
// // //       )}
// // //       onScroll={onScroll}
// // //       scrollEventThrottle={16}
// // //     />
// // //   );
// // // };
// // // const styles = StyleSheet.create({
// // //   column: {
// // //     flex: 1,
// // //     paddingHorizontal: 8,
// // //     paddingBottom: 16,
// // //   },
// // //   singleColumn: {
// // //     flex: 1,
// // //     paddingHorizontal: 16,
// // //     paddingBottom: 16,
// // //   },
// // //   item: {
// // //     alignItems: "center",
// // //     backgroundColor: "#f9f9f9",
// // //     borderRadius: 12,
// // //     padding: 10,
// // //     shadowColor: "#000",
// // //     shadowOffset: { width: 0, height: 2 },
// // //     shadowOpacity: 0.1,
// // //     shadowRadius: 4,
// // //     elevation: 3,
// // //   },
// // //   multiItem: {
// // //     height: 330, // Fixed height for 2-column layout
// // //     justifyContent: "space-between",
// // //   },
// // //   singleItem: {
// // //     // No fixed height, allow content to define it
// // //   },
// // //   image: {
// // //     width: "100%",
// // //     aspectRatio: 2 / 3,
// // //     borderRadius: 12,
// // //   },
// // //   singleImage: {
// // //     width: "80%",
// // //     aspectRatio: 2 / 3,
// // //     borderRadius: 12,
// // //   },
// // //   title: {
// // //     marginTop: 12,
// // //     fontSize: 16,
// // //     fontWeight: "500",
// // //     color: "#333",
// // //     textAlign: "center",
// // //     lineHeight: 30,
// // //   },
// // // });

// // // export default FilmList;


// // import React from "react";
// // import {
// //   FlatList,
// //   Text,
// //   TouchableOpacity,
// //   StyleSheet,
// //   NativeSyntheticEvent,
// //   NativeScrollEvent,
// //   View,
// // } from "react-native";
// // import PosterImage from "./PosterImage";
// // import { useNavigation, NavigationProp } from "@react-navigation/native";
// // import { Film } from "../service/film_api";

// // type Props = {
// //   films: Film[];
// //   onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
// //   listRef: React.RefObject<FlatList<any>>;
// //   isSearchSubmitted: boolean;
// // };

// // const FilmList: React.FC<Props> = ({ films, onScroll, listRef, isSearchSubmitted }) => {
// //   const navigation = useNavigation<NavigationProp<any, any>>();
// //   const isSingleItem = films.length === 1;

// //   // Show "No record" message if search was submitted and no films found
// //   if (isSearchSubmitted && films.length === 0) {
// //     return (
// //       <View style={styles.noRecordContainer}>
// //         <Text style={styles.noRecordText}>No record</Text>
// //       </View>
// //     );
// //   }

// //   return (
// //     <FlatList
// //       key={isSingleItem ? "1-column" : "2-columns"}
// //       ref={listRef}
// //       data={films}
// //       keyExtractor={(item) => item._id || Math.random().toString()}
// //       numColumns={isSingleItem ? 1 : 2}
// //       renderItem={({ item }) => (
// //         <View style={isSingleItem ? styles.singleColumn : styles.column}>
// //           <TouchableOpacity
// //             onPress={() =>
// //               navigation.navigate("FilmDetail", {
// //                 film: {
// //                   ...item,
// //                   fromSearch: isSearchSubmitted,
// //                   source: item.source,
// //                 },
// //               })
// //             }
// //             style={[styles.item, isSingleItem ? styles.singleItem : styles.multiItem]}
// //           >
// //             <PosterImage
// //               uri={item.poster}
// //               style={isSingleItem ? styles.singleImage : styles.image}
// //             />
// //             <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
// //               {item.title}
// //             </Text>
// //           </TouchableOpacity>
// //         </View>
// //       )}
// //       onScroll={onScroll}
// //       scrollEventThrottle={16}
// //     />
// //   );
// // };

// // const styles = StyleSheet.create({
// //   column: {
// //     flex: 1,
// //     paddingHorizontal: 8,
// //     paddingBottom: 16,
// //   },
// //   singleColumn: {
// //     flex: 1,
// //     paddingHorizontal: 16,
// //     paddingBottom: 16,
// //   },
// //   item: {
// //     alignItems: "center",
// //     backgroundColor: "#f9f9f9",
// //     borderRadius: 12,
// //     padding: 10,
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 4,
// //     elevation: 3,
// //   },
// //   multiItem: {
// //     height: 330,
// //     justifyContent: "space-between",
// //   },
// //   singleItem: {},
// //   image: {
// //     width: "100%",
// //     aspectRatio: 2 / 3,
// //     borderRadius: 12,
// //   },
// //   singleImage: {
// //     width: "80%",
// //     aspectRatio: 2 / 3,
// //     borderRadius: 12,
// //   },
// //   title: {
// //     marginTop: 12,
// //     fontSize: 16,
// //     fontWeight: "500",
// //     color: "#333",
// //     textAlign: "center",
// //     lineHeight: 30,
// //   },
// //   noRecordContainer: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     paddingTop: 50,
// //   },
// //   noRecordText: {
// //     fontSize: 18,
// //     color: "#888",
// //   },
// // });

// // export default FilmList;


// import React from "react";
// import {
//   FlatList,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   NativeSyntheticEvent,
//   NativeScrollEvent,
//   View,
// } from "react-native";
// import PosterImage from "./PosterImage";
// import { useNavigation, NavigationProp } from "@react-navigation/native";
// import { Film } from "../service/film_api";

// type Props = {
//   films: Film[];
//   onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
//   listRef: React.RefObject<FlatList<any>>;
//   isSearchSubmitted: boolean;
// };

// const FilmList: React.FC<Props> = ({ films, onScroll, listRef, isSearchSubmitted }) => {
//   const navigation = useNavigation<NavigationProp<any, any>>();

//   // Filter out any null or undefined items
//   const validFilms = films.filter((f) => f && f._id);

//   // Show "No record" message if search was submitted and no valid films found
//   if (isSearchSubmitted && validFilms.length === 0) {
//     return (
//       <View style={styles.noRecordContainer}>
//         <Text style={styles.noRecordText}>No record</Text>
//       </View>
//     );
//   }

//   const isSingleItem = validFilms.length === 1;

//   return (
//     <FlatList
//       key={isSingleItem ? "1-column" : "2-columns"}
//       ref={listRef}
//       data={validFilms}
//       keyExtractor={(item) => item._id || Math.random().toString()}
//       numColumns={isSingleItem ? 1 : 2}
//       renderItem={({ item }) => (
//         <View style={isSingleItem ? styles.singleColumn : styles.column}>
//           <TouchableOpacity
//             onPress={() =>
//               navigation.navigate("FilmDetail", {
//                 film: {
//                   ...item,
//                   fromSearch: isSearchSubmitted,
//                   source: item.source,
//                 },
//               })
//             }
//             style={[styles.item, isSingleItem ? styles.singleItem : styles.multiItem]}
//           >
//             <PosterImage
//               uri={item.poster}
//               style={isSingleItem ? styles.singleImage : styles.image}
//             />
//             <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
//               {item.title}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       )}
//       onScroll={onScroll}
//       scrollEventThrottle={16}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   column: {
//     flex: 1,
//     paddingHorizontal: 8,
//     paddingBottom: 16,
//   },
//   singleColumn: {
//     flex: 1,
//     paddingHorizontal: 16,
//     paddingBottom: 16,
//   },
//   item: {
//     alignItems: "center",
//     backgroundColor: "#f9f9f9",
//     borderRadius: 12,
//     padding: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   multiItem: {
//     height: 330,
//     justifyContent: "space-between",
//   },
//   singleItem: {},
//   image: {
//     width: "100%",
//     aspectRatio: 2 / 3,
//     borderRadius: 12,
//   },
//   singleImage: {
//     width: "80%",
//     aspectRatio: 2 / 3,
//     borderRadius: 12,
//   },
//   title: {
//     marginTop: 12,
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#333",
//     textAlign: "center",
//     lineHeight: 30,
//   },
//   noRecordContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingTop: 50,
//   },
//   noRecordText: {
//     fontSize: 18,
//     color: "#888",
//   },
// });

// export default FilmList;


import React from "react";
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



type Props = {
  films: Film[];
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  listRef: React.RefObject<FlatList<any>>;
  isSearchSubmitted: boolean;
};




const FilmList: React.FC<Props> = ({ films, onScroll, listRef, isSearchSubmitted }) => {
  const navigation = useNavigation<NavigationProp<any, any>>();

  // Filter out only truly invalid entries (null or undefined)
  const validFilms = films.filter((f) => f != null && typeof f === "object");

  // Show "No record" only if search was submitted and no valid film objects exist
  if (isSearchSubmitted && validFilms.length === 0) {
    return (
      <View style={styles.noRecordContainer}>
        <Text style={styles.noRecordText}>No record</Text>
      </View>
    );
  }


//   console.log("FilmList received films:", films);
// console.log("isSearchSubmitted:", isSearchSubmitted);

  const isSingleItem = validFilms.length === 1;

  return (
    <FlatList
      key={isSingleItem ? "1-column" : "2-columns"}
      ref={listRef}
      data={validFilms}
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
            style={[styles.item, isSingleItem ? styles.singleItem : styles.multiItem]}
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
    />
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
});

export default FilmList;
