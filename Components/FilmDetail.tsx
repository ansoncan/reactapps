// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   Platform,
//   ScrollView,
// } from 'react-native';
// import { useRoute } from '@react-navigation/native';
// import { addFilm, Film } from '../service/film_api';
// import PosterImage from '../Components/PosterImage';

// interface RouteParams {
//   film: Film;
//   isAdmin: boolean;
// }

// type NavigationRoute = {
//   key?: string;
//   name?: string;
//   path?: string;
//   params: RouteParams;
// };

// const FilmDetail = () => {
//   const { film, isAdmin } = useRoute<NavigationRoute>().params;

//   const handleAddFilm = () => {
//     Alert.alert('Confirm', 'Add this film to the database?', [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Add',
//         onPress: async () => {
//           try {
//             await addFilm(film);
//             Alert.alert('Success', 'Film added.');
//           } catch (error) {
//             const errMsg = (error as Error).message || 'An error occurred';
//             Alert.alert('Error', errMsg);
//           }
//         },
//       },
//     ]);
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <PosterImage uri={film.poster} style={styles.poster} />
//       <Text style={styles.title}>{film.title}</Text>

//       <View style={styles.detailBlock}>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailKey}>Year:</Text>
//           <Text style={styles.detailValue}>{film.year}</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailKey}>Released:</Text>
//           <Text style={styles.detailValue}>{film.released}</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailKey}>Runtime:</Text>
//           <Text style={styles.detailValue}>{film.runtime} minutes</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailKey}>Language:</Text>
//           <Text style={styles.detailValue}>{film.language}</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailKey}>Genre:</Text>
//           <Text style={styles.detailValue}>{film.genre}</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailKey}>Director:</Text>
//           <Text style={styles.detailValue}>{film.director}</Text>
//         </View>
//       </View>

//       {isAdmin && (
//         <TouchableOpacity onPress={handleAddFilm} style={styles.button}>
//           <Text style={styles.buttonText}>Add to Database</Text>
//         </TouchableOpacity>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//   },
//   poster: {
//     width: '65%',
//     aspectRatio: 2 / 3,
//     borderRadius: 10,
//     marginBottom: 20,
//     backgroundColor: '#eee',
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: '600',
//     textAlign: 'center',
//     marginBottom: 20,
//     color: '#333',
//   },
//   detailBlock: {
//     width: '100%',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 4,
//     width: '80%',
//   },
//   detailKey: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     width: 100,
//     textAlign: 'left',
//     marginRight: 10,
//   },
//   detailValue: {
//     fontSize: 16,
//     color: '#555',
//     flex: 1,
//     textAlign: 'left',
//   },
//   button: {
//     marginTop: 30,
//     backgroundColor: Platform.OS === 'ios' ? '#007AFF' : '#4DA8DA',
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '500',
//     textAlign: 'center',
//   },
// });

// export default FilmDetail;
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  ScrollView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { addFilm, Film } from '../service/film_api';
import PosterImage from '../Components/PosterImage';

interface RouteParams {
  film: Film;
  isAdmin: boolean;
}

type NavigationRoute = {
  key?: string;
  name?: string;
  path?: string;
  params: RouteParams;
};

const FilmDetail = () => {
  const { film, isAdmin } = useRoute<NavigationRoute>().params;

  const handleAddFilm = () => {
    Alert.alert('Confirm', 'Add this film to the database?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Add',
        onPress: async () => {
          try {
            await addFilm(film);
            Alert.alert('Success', 'Film added.');
          } catch (error) {
            const errMsg = (error as Error).message || 'An error occurred';
            Alert.alert('Error', errMsg);
          }
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PosterImage uri={film.poster} style={styles.poster} />
      <Text style={styles.title}>{film.title}</Text>

      <View style={styles.detailCard}>
        {[
          { label: 'Year', value: film.year },
          { label: 'Released', value: film.released },
          { label: 'Runtime', value: `${film.runtime} minutes` },
          { label: 'Language', value: film.language },
          { label: 'Genre', value: film.genre },
          { label: 'Director', value: film.director },
        ].map((item, index) => (
          <View key={index} style={styles.detailRow}>
            <Text style={styles.detailLabel}>{item.label}</Text>
            <Text style={styles.detailValue}>{item.value}</Text>
          </View>
        ))}
      </View>

      {isAdmin && (
        <TouchableOpacity onPress={handleAddFilm} style={styles.button}>
          <Text style={styles.buttonText}>Add to Database</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  poster: {
    width: '65%',
    aspectRatio: 2 / 3,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  detailCard: {
    width: '90%',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  detailRow: {
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    color: '#555',
  },
  button: {
    backgroundColor: Platform.OS === 'ios' ? '#007AFF' : '#4DA8DA',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default FilmDetail;
