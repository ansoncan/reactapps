// import React, { useEffect, useState, useRef, useCallback } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
//   TouchableWithoutFeedback,
// } from 'react-native';
// import { useNavigation, useFocusEffect } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import PosterImage from './PosterImage';
// import { Film, RootStackParamList } from './navigation';

// export default function HomeScreen() {
//   const [films, setFilms] = useState<Film[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [scrollOffset, setScrollOffset] = useState(0);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//   const flatlistRef = useRef<FlatList>(null);

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

//   useFocusEffect(
//     useCallback(() => {
//       setShowDropdown(false);
//     }, [])
//   );

//   const renderItem = ({ item }: { item: Film }) => (
//     <TouchableOpacity
//       style={styles.item}
//       onPress={() => navigation.navigate('FilmDetail', { film: item })}
//     >
//       <PosterImage uri={item.poster} style={styles.image} />
//       <Text style={styles.title}>{item.title}</Text>
//       <View style={styles.separator} />
//     </TouchableOpacity>
//   );

//   const handleScroll = (event: any) => {
//     setScrollOffset(event.nativeEvent.contentOffset.y);
//     setShowDropdown(false);
//   };

//   const scrollToTop = () => {
//     flatlistRef.current?.scrollToOffset({ offset: 0, animated: true });
//     setShowDropdown(false);
//   };

//   const toggleDropdown = (() => {
//     let lastTap = 0;
//     return () => {
//       const now = Date.now();
//       if (now - lastTap < 300) return;
//       lastTap = now;
//       setShowDropdown(prev => !prev);
//     };
//   })();

//   const dismissDropdown = () => {
//     if (showDropdown) setShowDropdown(false);
//   };

//   if (loading) {
//     return <ActivityIndicator style={{ marginTop: 50 }} size="large" />;
//   }

//   return (
//     <TouchableWithoutFeedback onPress={dismissDropdown}>
//       <View style={styles.container}>
//         <FlatList
//           ref={flatlistRef}
//           data={films}
//           keyExtractor={(item, index) => `${item._id}_${index}`}
//           renderItem={renderItem}
//           contentContainerStyle={styles.flatlistContent}
//           onScroll={handleScroll}
//           scrollEventThrottle={16}
//         />
//         {scrollOffset > 200 && (
//           <View style={styles.arrowContainer}>
//             <TouchableOpacity
//               style={styles.rectangle}
//               onPress={toggleDropdown}
//               hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
//             >
//               <Text style={styles.arrowCounter}>↑</Text>
//               <Text style={styles.arrowText}>{Math.floor(scrollOffset / 350) + 1}</Text>
//             </TouchableOpacity>
//             {showDropdown && (
//               <View style={styles.dropdown}>
//                 <TouchableOpacity onPress={scrollToTop}>
//                   <Text style={styles.dropdownText} numberOfLines={1} ellipsizeMode="tail">
//                     Go to Top Item
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//           </View>
//         )}
//       </View>
//     </TouchableWithoutFeedback>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: 'relative',
//   },
//   flatlistContent: {
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
//     paddingHorizontal: 10, // Add padding to keep distance from the left and right
//     numberOfLines: 0, // Allow text to wrap based on available space
//   },
//   separator: {
//     marginTop: 10,
//     width: '80%', // Adjust width as needed
//     height: 1,
//     backgroundColor: '#ccc', // Light grey color for the horizontal line
//     alignSelf: 'center',
//   },
//   arrowContainer: {
//     position: 'absolute',
//     top: 30,
//     right: 10,
//     alignItems: 'flex-end',
//     zIndex: 10,
//   },
//   rectangle: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     flexDirection: 'row',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   arrowText: {
//     color: '#aaa',
//     fontSize: 14,
//     marginLeft: 4,
//   },
//   arrowCounter: {
//     color: '#aaa',
//     fontSize: 12,
//   },
//   dropdown: {
//     marginTop: 4,
//     backgroundColor: 'white',
//     borderRadius: 8,
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     minWidth: 130,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 5,
//     alignItems: 'center',
//   },
//   dropdownText: {
//     color: '#aaa',
//     fontSize: 16,
//   },
// });

import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Slider,
  ScrollView,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import PosterImage from './PosterImage';
import { Film, RootStackParamList } from './navigation';
import { SearchBar } from 'react-native-elements';

export default function HomeScreen() {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
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

  useFocusEffect(
    useCallback(() => {
      setShowDropdown(false);
    }, [])
  );

  const renderItem = ({ item }: { item: Film }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('FilmDetail', { film: item })}
    >
      <PosterImage uri={item.poster} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.separator} />
    </TouchableOpacity>
  );

  const handleScroll = (event: any) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
    setShowDropdown(false);
  };

  const scrollToTop = () => {
    flatlistRef.current?.scrollToOffset({ offset: 0, animated: true });
    setShowDropdown(false);
  };

  const toggleDropdown = (() => {
    let lastTap = 0;
    return () => {
      const now = Date.now();
      if (now - lastTap < 300) return;
      lastTap = now;
      setShowDropdown(prev => !prev);
    };
  })();

  const dismissDropdown = () => {
    if (showDropdown) setShowDropdown(false);
  };

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 50 }} size="large" />;
  }

  return (
    <TouchableWithoutFeedback onPress={dismissDropdown}>
      <View style={styles.container}>
        <SearchBar
          placeholder="Search..."
          value={searchText}
          onChangeText={setSearchText}
          onFocus={toggleDropdown}
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.inputContainerStyle}
        />
        {showDropdown && (
          <View style={styles.dropdown}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              {/* Year Slider */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Year</Text>
                <Slider
                  value={year}
                  minimumValue={1900}
                  maximumValue={new Date().getFullYear()}
                  step={1}
                  onValueChange={(value) => setYear(Math.round(value))}
                  thumbTintColor="#3f51b5"
                  trackStyle={{ height: 2 }}
                  thumbStyle={{ height: 24, width: 24 }}
                />
                <Text style={styles.sliderValue}>{year}</Text>
              </View>
              <View style={styles.separator} />

              {/* Month Slider */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Month</Text>
                <Slider
                  value={month}
                  minimumValue={1}
                  maximumValue={12}
                  step={1}
                  onValueChange={(value) => setMonth(Math.round(value))}
                  thumbTintColor="#3f51b5"
                  trackStyle={{ height: 2 }}
                  thumbStyle={{ height: 24, width: 24 }}
                />
                <Text style={styles.sliderValue}>{new Date(0, month - 1).toLocaleString('default', { month: 'long' })}</Text>
              </View>
              <View style={styles.separator} />

              {/* Search Box */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Search</Text>
                <SearchBar
                  placeholder="Enter search text..."
                  value={searchText}
                  onChangeText={setSearchText}
                  containerStyle={styles.searchBoxContainer}
                  inputContainerStyle={styles.inputContainerStyle}
                />
              </View>
            </ScrollView>
          </View>
        )}
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
          <View style={styles.arrowContainer}>
            <TouchableOpacity
              style={styles.rectangle}
              onPress={toggleDropdown}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              <Text style={styles.arrowCounter}>↑</Text>
              <Text style={styles.arrowText}>{Math.floor(scrollOffset / 350) + 1}</Text>
            </TouchableOpacity>
            {showDropdown && (
              <View style={styles.dropdown}>
                <TouchableOpacity onPress={scrollToTop}>
                  <Text style={styles.dropdownText} numberOfLines={1} ellipsizeMode="tail">
                    Go to Top Item
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  searchBarContainer: {
    backgroundColor: '#fff',
    borderBottomColor: '#ccc',
    borderTopColor: '#ccc',
    padding: 0,
  },
  inputContainerStyle: {
    backgroundColor: '#f8f8f8',
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  dropdown: {
    position: 'absolute',
    top: 60, // Adjust based on SearchBar height
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  scrollViewContent: {
    maxWidth: '90%',
    alignSelf: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sliderValue: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 14,
    color: '#3f51b5',
  },
  searchBoxContainer: {
    backgroundColor: '#fff',
    borderBottomColor: '#ccc',
    borderTopColor: '#ccc',
    padding: 0,
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
    paddingHorizontal: 10,
    numberOfLines: 0,
  },
  separator: {
    marginTop: 10,
    width: '80%',
    height: 1,
    backgroundColor: '#ccc',
    alignSelf: 'center',
  },
  arrowContainer: {
    position: 'absolute',
    top: 30,
    right: 10,
    alignItems: 'flex-end',
    zIndex: 10,
  },
  rectangle: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  arrowText: {
    color: '#aaa',
    fontSize: 14,
    marginLeft: 4,
  },
  arrowCounter: {
    color: '#aaa',
    fontSize: 12,
  },
});