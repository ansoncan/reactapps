
// // import React, { useEffect, useState } from "react";
// // import {
// //   View,
// //   Text,
// //   Button,
// //   Modal,
// //   StyleSheet,
// //   ScrollView,
// // } from "react-native";
// // import AsyncStorage from "@react-native-async-storage/async-storage";
// // import PosterImage from "../Components/PosterImage"; // Ensure correct import
// // import AddFilmScreen from "./AddFilmScreen"; // Assuming this is the correct path
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

// //   // Add console logs to debug
// //   console.log("userData?.type:", userData?.type);
// //   console.log("film.fromSearch:", film.fromSearch);

// //   if (!userData && !film) {
// //     return <Text>Loading...</Text>;
// //   }

// //   return (
// //     <ScrollView contentContainerStyle={styles.container}>
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

// //       {/* Show "Add Film" button only if userData is not null, user.type === 1 and film comes from search */}
// //       {userData && userData.type === 1 && film.fromSearch && (
// //         <Button title="Add Film" onPress={() => setModalVisible(true)} />
// //       )}

// //       <Modal
// //         animationType="slide"
// //         transparent={true}
// //         visible={modalVisible}
// //         onRequestClose={() => {
// //           setModalVisible(!modalVisible);
// //         }}
// //       >
// //         {/* AddFilmScreen component with film data passed */}
// //         {film && (
// //           <View style={styles.modalContainer}>
// //           <AddFilmScreen
// //             film={film}
// //             closeModal={() => setModalVisible(false)}
// //           />
// // </View>

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
// //     width: "90%",
// //     backgroundColor: "#f2f2f7",
// //     borderRadius: 12,
// //     padding: 18,
// //     marginBottom: 8,
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 6,
// //   },
// //   detailRow: {
// //     marginBottom: 10,
// //   },
// //   detailLabel: {
// //     fontSize: 14,
// //     fontWeight: "600",
// //     color: "#3c3c43",
// //     marginBottom: 0,
// //   },
// //   detailValue: {
// //     fontSize: 16,
// //     color: "#1c1c1e",
// //   },
// //   modalContainer: {
// //     flex: 1,
// //     backgroundColor: "rgba(0,0,0,0.4)",
// //     justifyContent: "center",
// //     alignItems: "center",
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
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import PosterImage from "../Components/PosterImage"; // Ensure correct import
// import AddFilmScreen from "./AddFilmScreen"; // Assuming this is the correct path
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
//           console.log("User data:", parsedUser);
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

//   // Add console logs to debug
//   console.log("userData?.type:", userData?.type);
//   console.log("film.fromSearch:", film.fromSearch);

//   if (!userData && !film) {
//     return <Text>Loading...</Text>;
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
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

//       {/* Show "Add Film" button only if userData is not null, user.type === 1 and film comes from search */}
//       {userData && userData.type === 1 && film.fromSearch && (
//         <Button title="Add Film" onPress={() => setModalVisible(true)} />
//       )}

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           setModalVisible(!modalVisible);
//         }}
//       >
//         {/* AddFilmScreen component with film data passed */}
//         {film && (
//           <View style={styles.modalContainer}>
//             <AddFilmScreen
//               film={film}
//               closeModal={() => setModalVisible(false)}
//             />
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
//     width: "90%",
//     backgroundColor: "#f2f2f7",
//     borderRadius: 12,
//     padding: 18,
//     marginBottom: 8,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//   },
//   detailRow: {
//     marginBottom: 10,
//   },
//   detailLabel: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#3c3c43",
//     marginBottom: 0,
//   },
//   detailValue: {
//     fontSize: 16,
//     color: "#1c1c1e",
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: '#fff', // Changed to white for visibility
//   },
// });

// export default FilmDetail;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  ScrollView,
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
          console.log("User data:", parsedUser);
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
  console.log("film.fromSearch:", film.fromSearch);

  if (!userData && !film) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
        <Button title="Add Film" onPress={() => setModalVisible(true)} />
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
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  poster: {
    width: "60%",
    aspectRatio: 2 / 3,
    borderRadius: 12,
    marginBottom: 0,
    backgroundColor: "#eee",
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
    color: "#1c1c1e",
  },
  detailCard: {
    width: "90%",
    backgroundColor: "#f2f2f7",
    borderRadius: 12,
    padding: 18,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  detailRow: {
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3c3c43",
    marginBottom: 0,
  },
  detailValue: {
    fontSize: 16,
    color: "#1c1c1e",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modalContent: {
    width: "85%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});

export default FilmDetail;
