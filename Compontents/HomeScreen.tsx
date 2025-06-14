// //HomeScreen.tsx
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import PosterImage from './PosterImage';
// import { Film, RootStackParamList } from './navigation';

// export default function HomeScreen() {
//   const [films, setFilms] = useState<Film[]>([]);
//   const [loading, setLoading] = useState(true);
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

//   useEffect(() => {
//     const fetchFilms = async () => {
//       try {
//         const response = await fetch('http://pcpdfilm.starsknights.com/api/v2/films');
//         const data = await response.json();
//         setFilms(data);
//       } catch (error) {
//         console.error('Error fetching films:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFilms();
//   }, []);

//   const renderItem = ({ item, index }: { item: Film; index: number }) => (
//     <TouchableOpacity
//       style={styles.item}
//       onPress={() => navigation.navigate('FilmDetail', { film: item })}
//     >
//       <PosterImage uri={item.poster} style={styles.image} />
//       <Text style={styles.title}>{item.title}</Text>
//     </TouchableOpacity>
//   );

//   if (loading) {
//     return <ActivityIndicator style={{ marginTop: 50 }} size="large" />;
//   }

//   return (
//     <FlatList
//       data={films}
//       keyExtractor={(item, index) => `${item._id}_${index}`}
//       renderItem={renderItem}
//       contentContainerStyle={styles.container}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//   },
//   item: {
//     marginBottom: 20,
//     alignItems: 'center',
//   },
//   image: {
//     width: 200,
//     height: 300,
//     borderRadius: 10,
//   },
//   title: {
//     marginTop: 10,
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });

import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import PosterImage from './PosterImage';
import { Film, RootStackParamList } from './navigation';

export default function HomeScreen() {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const flatlistRef = useRef<FlatList>(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await fetch('http://pcpdfilm.starsknights.com/api/v2/films');
        const data = await response.json();
        setFilms(data);
      } catch (error) {
        console.error('Error fetching films:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  const renderItem = ({ item, index }: { item: Film; index: number }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('FilmDetail', { film: item })}
    >
      <PosterImage uri={item.poster} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 50 }} size="large" />;
  }

  const handleScroll = (event: any) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };

  const scrollToTop = () => {
    flatlistRef.current?.scrollToOffset({ offset: 0, animated: true });
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatlistRef}
        data={films}
        keyExtractor={(item, index) => `${item._id}_${index}`}
        renderItem={renderItem}
        contentContainerStyle={styles.flatlistContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      {scrollOffset > 200 && (
        <TouchableOpacity style={styles.arrowContainer} onPress={toggleDropdown}>
          <View style={styles.rectangle}>
            <Text style={styles.arrowCounter}>{Math.floor(scrollOffset / 350) + 1}</Text>
            <Text style={styles.arrowText}>↑</Text>
          </View>
          {showDropdown && (
            <TouchableOpacity
              style={styles.dropdown}
              onPress={scrollToTop}
            >
              <Text style={styles.dropdownText}>Go to Top</Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  flatlistContent: {
    padding: 10,
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
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  arrowContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  rectangle: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 4,
  },
  arrowCounter: {
    color: 'white',
    fontSize: 12,
  },
  dropdown: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    marginTop: 8,
    padding: 8,
    alignItems: 'center',
  },
  dropdownText: {
    color: 'white',
    fontSize: 12,
  },
});
