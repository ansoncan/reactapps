
// // import React, { useEffect, useState } from "react";
// // import {
// //   View,
// //   Text,
// //   Button,
// //   Modal,
// //   StyleSheet,
// //   ScrollView,
// //   TouchableOpacity,
// // } from "react-native";
// // import AsyncStorage from "@react-native-async-storage/async-storage";
// // import PosterImage from "../Components/PosterImage";
// // import AddFilmScreen from "./AddFilmScreen";
// // import { useRoute } from "@react-navigation/native";

// // const FilmDetail = () => {
// //   const route = useRoute();

// //   const [userData, setUserData] = useState(null);
// //   const [modalVisible, setModalVisible] = useState(false);

// //   useEffect(() => {
// //     const getUser = async () => {
// //       try {
// //         const token = await AsyncStorage.getItem("token");
// //         if (!token) {
// //           console.log("User is not authenticated");
// //           setUserData(null);
// //           return;
// //         }

// //         const user = await AsyncStorage.getItem("user");
// //         if (user) {
// //           const parsedUser = JSON.parse(user);
// //           console.log("User data:", parsedUser);
// //           setUserData(parsedUser);
// //         } else {
// //           console.log("No user data found");
// //           setUserData(null);
// //         }
// //       } catch (error) {
// //         console.error("Error retrieving user data:", error);
// //       }
// //     };

// //     getUser();
// //   }, []);

// //   if (!route.params?.film) {
// //     console.error("No film data found in route params");
// //     return <Text>No Film Data Available</Text>;
// //   }

// //   const film = route.params.film;

// //   console.log("userData?.type:", userData?.type);
// //   console.log("film.fromSearch:", film.fromSearch);

// //   if (!userData && !film) {
// //     return <Text>Loading...</Text>;
// //   }

// //   return (
// //     // <ScrollView contentContainerStyle={styles.container}>
// //     <ScrollView contentContainerStyle={[styles.container, { flexGrow: 1 }]}>

// //       <PosterImage uri={film.poster} style={styles.poster} />
// //       <Text style={styles.title}>{film.title}</Text>
// //       <View style={styles.detailCard}>
// //         {[
// //           { label: "Year", value: film.year },
// //           { label: "Released", value: film.released },
// //           { label: "Runtime", value: `${film.runtime} minutes` },
// //           { label: "Language", value: film.language },
// //           { label: "Genre", value: film.genre },
// //           { label: "Director", value: film.director },
// //         ].map((item, index) => (
// //           <View key={index} style={styles.detailRow}>
// //             <Text style={styles.detailLabel}>{item.label}</Text>
// //             <Text style={styles.detailValue}>{item.value}</Text>
// //           </View>
// //         ))}
// //       </View>

// //       {userData && userData.type === 1 && film.fromSearch && (
      


// //           <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
// //             <Text style={styles.addButtonText}>Add Film</Text>
// //           </TouchableOpacity>

// //       )}

// //       <Modal
// //         animationType="slide"
// //         transparent={true}
// //         visible={modalVisible}
// //         onRequestClose={() => {
// //           setModalVisible(!modalVisible);
// //         }}
// //       >
// //         {film && (
// //           <View style={styles.modalContainer}>
// //             <View style={styles.modalContent}>
// //               <AddFilmScreen film={film} closeModal={() => setModalVisible(false)} />
// //             </View>
// //           </View>
// //         )}
// //       </Modal>
// //     </ScrollView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     padding: 20,
// //     backgroundColor: "#fff",
// //     alignItems: "center",
// //   },
// //   poster: {
// //     width: "60%",
// //     aspectRatio: 2 / 3,
// //     borderRadius: 12,
// //     marginBottom: 0,
// //     backgroundColor: "#eee",
// //   },
// //   title: {
// //     fontSize: 26,
// //     fontWeight: "600",
// //     textAlign: "center",
// //     marginBottom: 10,
// //     color: "#1c1c1e",
// //   },
// //   detailCard: {
// //   width: "100%",
// //   backgroundColor: "#fff",
// //   borderRadius: 16,
// //   paddingVertical: 20,
// //   paddingHorizontal: 24,
// //   marginBottom: 16,
// //   shadowColor: "#000",
// //   shadowOffset: { width: 0, height: 2 },
// //   shadowOpacity: 0.08,
// //   shadowRadius: 10,
// //   elevation: 3,
// // },

// // detailRow: {
// //   flexDirection: "row",
// //   justifyContent: "space-between",
// //   alignItems: "center",
// //   paddingVertical: 12,
// //   borderBottomWidth: 1,
// //   borderBottomColor: "#ececec",
// // },

// // detailLabel: {
// //   fontSize: 16,
// //   fontWeight: "500",
// //   color: "#8e8e93",
// // },

// // detailValue: {
// //   fontSize: 16,
// //   fontWeight: "400",
// //   color: "#1c1c1e",
// //   textAlign: "right",
// //   flexShrink: 1,
// // },

// //   modalContainer: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     backgroundColor: "rgba(0, 0, 0, 0.3)",
// //   },

// //   addButton: {
// //   backgroundColor: "#007AFF", // iOS blue
// //   paddingVertical: 12,
// //   paddingHorizontal: 24,
// //   borderRadius: 10,
// //   marginTop: 16,
// //   shadowColor: "#000",
// //   shadowOffset: { width: 0, height: 2 },
// //   shadowOpacity: 0.2,
// //   shadowRadius: 4,
// //   elevation: 3,
// // },

// // addButtonText: {
// //   color: "#fff",
// //   fontSize: 16,
// //   fontWeight: "600",
// //   textAlign: "center",
// // },

// //   modalContent: {
// //     width: "85%",
// //     padding: 20,
// //     backgroundColor: "#fff",
// //     borderRadius: 16,
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 4 },
// //     shadowOpacity: 0.3,
// //     shadowRadius: 8,
// //     elevation: 5,
// //   },
// // });

// // export default FilmDetail;

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Button,
//   Modal,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import PosterImage from "../Components/PosterImage";
// import AddFilmScreen from "./AddFilmScreen";
// import { useRoute } from "@react-navigation/native";

// const FilmDetail = () => {
//   const route = useRoute();

//   const [userData, setUserData] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);

//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const token = await AsyncStorage.getItem("token");
//         if (!token) {
//           console.log("User is not authenticated");
//           setUserData(null);
//           return;
//         }

//         const user = await AsyncStorage.getItem("user");
//         if (user) {
//           const parsedUser = JSON.parse(user);
//           console.log("User data:", JSON.stringify(parsedUser, null, 2));
//           setUserData(parsedUser);
//         } else {
//           console.log("No user data found");
//           setUserData(null);
//         }
//       } catch (error) {
//         console.error("Error retrieving user data:", error);
//       }
//     };

//     getUser();
//   }, []);

//   if (!route.params?.film) {
//     console.error("No film data found in route params");
//     return <Text>No Film Data Available</Text>;
//   }

//   const film = route.params.film;

//   console.log("userData?.type:", userData?.type);
//   console.log("film.fromSearch:", JSON.stringify(film.fromSearch));

//   if (!userData && !film) {
//     return <Text>Loading...</Text>;
//   }

//   return (
//     // <ScrollView contentContainerStyle={styles.container}>
//     <ScrollView contentContainerStyle={[styles.container, { flexGrow: 1 }]}>

//       <PosterImage uri={film.poster} style={styles.poster} />
//       <Text style={styles.title}>{film.title}</Text>
//       <View style={styles.detailCard}>
//         {[
//           { label: "Year", value: film.year },
//           { label: "Released", value: film.released },
//           { label: "Runtime", value: `${film.runtime} minutes` },
//           { label: "Language", value: film.language },
//           { label: "Genre", value: film.genre },
//           { label: "Director", value: film.director },
//         ].map((item, index) => (
//           <View key={index} style={styles.detailRow}>
//             <Text style={styles.detailLabel}>{item.label}</Text>
//             <Text style={styles.detailValue}>{item.value}</Text>
//           </View>
//         ))}
//       </View>

//       {userData && userData.type === 1 && film.fromSearch && (
//           <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
//           <Text style={styles.addButtonText}>Add Film</Text>
//         </TouchableOpacity>
//       )}

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           setModalVisible(!modalVisible);
//         }}
//       >
//         {film && (
//           <View style={styles.modalContainer}>
//             <View style={styles.modalContent}>
//               <AddFilmScreen film={film} closeModal={() => setModalVisible(false)} />
//             </View>
//           </View>
//         )}
//       </Modal>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: "#fff",
//     alignItems: "center",
//   },
//   poster: {
//     width: "60%",
//     aspectRatio: 2 / 3,
//     borderRadius: 12,
//     marginBottom: 0,
//     backgroundColor: "#eee",
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: "600",
//     textAlign: "center",
//     marginBottom: 10,
//     color: "#1c1c1e",
//   },
//   detailCard: {
//   width: "100%",
//   backgroundColor: "#fff",
//   borderRadius: 16,
//   paddingVertical: 20,
//   paddingHorizontal: 24,
//   marginBottom: 16,
//   shadowColor: "#000",
//   shadowOffset: { width: 0, height: 2 },
//   shadowOpacity: 0.08,
//   shadowRadius: 10,
//   elevation: 3,
// },

// detailRow: {
//   flexDirection: "row",
//   justifyContent: "space-between",
//   alignItems: "center",
//   paddingVertical: 12,
//   borderBottomWidth: 1,
//   borderBottomColor: "#ececec",
// },

// detailLabel: {
//   fontSize: 16,
//   fontWeight: "500",
//   color: "#8e8e93",
// },

// detailValue: {
//   fontSize: 16,
//   fontWeight: "400",
//   color: "#1c1c1e",
//   textAlign: "right",
//   flexShrink: 1,
// },

//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.3)",
//   },

//   addButton: {
//   backgroundColor: "#007AFF", // iOS blue
//   paddingVertical: 12,
//   paddingHorizontal: 24,
//   borderRadius: 10,
//   marginTop: 16,
//   shadowColor: "#000",
//   shadowOffset: { width: 0, height: 2 },
//   shadowOpacity: 0.2,
//   shadowRadius: 4,
//   elevation: 3,
// },

// addButtonText: {
//   color: "#fff",
//   fontSize: 16,
//   fontWeight: "600",
//   textAlign: "center",
// },

//   modalContent: {
//     width: "85%",
//     padding: 20,
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 5,
//   },
// });

// export default FilmDetail;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PosterImage from "../Components/PosterImage";
import AddFilmScreen from "./AddFilmScreen";
import { useRoute } from "@react-navigation/native";

const FilmDetail = () => {
  const route = useRoute();

  const [userData, setUserData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          console.log("User is not authenticated");
          setUserData(null);
          return;
        }

        const user = await AsyncStorage.getItem("user");
        if (user) {
          const parsedUser = JSON.parse(user);
          console.log("User data:", JSON.stringify(parsedUser, null, 2));
          setUserData(parsedUser);
        } else {
          console.log("No user data found");
          setUserData(null);
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };

    getUser();
  }, []);

  if (!route.params?.film) {
    console.error("No film data found in route params");
    return <Text>No Film Data Available</Text>;
  }

  const film = route.params.film;

  console.log("userData?.type:", userData?.type);
  console.log("film.fromSearch:", JSON.stringify(film.fromSearch));

  if (!userData && !film) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={[styles.container, { flexGrow: 1 }]}>
      <PosterImage uri={film.poster} style={styles.poster} />
      <Text style={styles.title}>{film.title}</Text>
      <View style={styles.detailCard}>
        {[
          { label: "Year", value: film.year },
          { label: "Released", value: film.released },
          { label: "Runtime", value: `${film.runtime} minutes` },
          { label: "Language", value: film.language },
          { label: "Genre", value: film.genre },
          { label: "Director", value: film.director },
        ].map((item, index) => (
          <View key={index} style={styles.detailRow}>
            <Text style={styles.detailLabel}>{item.label}</Text>
            <Text style={styles.detailValue}>{item.value}</Text>
          </View>
        ))}
      </View>

      {userData && userData.type === 1 && film.fromSearch && (
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>Add Film</Text>
        </TouchableOpacity>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        {film && (
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <AddFilmScreen film={film} closeModal={() => setModalVisible(false)} />
            </View>
          </View>
        )}
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  poster: {
    width: "60%",
    aspectRatio: 2 / 3,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: "#eee",
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 15,
    color: "#1c1c1e",
  },
  detailCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ececec",
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#8e8e93",
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "400",
    color: "#1c1c1e",
    textAlign: "right",
    flexShrink: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modalContent: {
    width: "85%",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  addButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: -10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default FilmDetail;
