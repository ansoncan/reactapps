// //HomeScreen.tsx

// // import React, { useEffect, useState, useRef } from 'react';
// // import {
// //   View,
// //   Text,
// //   FlatList,
// //   TouchableOpacity,
// //   StyleSheet,
// //   ActivityIndicator,
// // } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';
// // import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // import PosterImage from './PosterImage';
// // import { Film, RootStackParamList } from './navigation';

// // export default function HomeScreen() {
// //   const [films, setFilms] = useState<Film[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [scrollOffset, setScrollOffset] = useState(0);
// //   const [showDropdown, setShowDropdown] = useState(false);
// //   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
// //   const flatlistRef = useRef<FlatList>(null);

// //   useEffect(() => {
// //     const fetchFilms = async () => {
// //       try {
// //         const response = await fetch('http://pcpdfilm.starsknights.com/api/v2/films');
// //         const data = await response.json();
// //         setFilms(data);
// //       } catch (error) {
// //         console.error('Error fetching films:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchFilms();
// //   }, []);

// //   const renderItem = ({ item, index }: { item: Film; index: number }) => (
// //     <TouchableOpacity
// //       style={styles.item}
// //       onPress={() => navigation.navigate('FilmDetail', { film: item })}
// //     >
// //       <PosterImage uri={item.poster} style={styles.image} />
// //       <Text style={styles.title}>{item.title}</Text>
// //     </TouchableOpacity>
// //   );

// //   if (loading) {
// //     return <ActivityIndicator style={{ marginTop: 50 }} size="large" />;
// //   }

// //   const handleScroll = (event: any) => {
// //     setScrollOffset(event.nativeEvent.contentOffset.y);
// //   };

// //   const scrollToTop = () => {
// //     flatlistRef.current?.scrollToOffset({ offset: 0, animated: true });
// //     setShowDropdown(false);
// //   };

// //   const toggleDropdown = () => {
// //     setShowDropdown(!showDropdown);
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <FlatList
// //         ref={flatlistRef}
// //         data={films}
// //         keyExtractor={(item, index) => `${item._id}_${index}`}
// //         renderItem={renderItem}
// //         contentContainerStyle={styles.flatlistContent}
// //         onScroll={handleScroll}
// //         scrollEventThrottle={16}
// //       />
// //       {scrollOffset > 200 && (
// //         <TouchableOpacity style={styles.arrowContainer} onPress={toggleDropdown}>
// //           <View style={styles.rectangle}>
// //             <Text style={styles.arrowCounter}>{Math.floor(scrollOffset / 350) + 1}</Text>
// //             <Text style={styles.arrowText}>↑</Text>
// //           </View>
// //           {showDropdown && (
// //             <TouchableOpacity
// //               style={styles.dropdown}
// //               onPress={scrollToTop}
// //             >
// //               <Text style={styles.dropdownText}>Go to Top Item</Text>
// //             </TouchableOpacity>
// //           )}
// //         </TouchableOpacity>
// //       )}
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     position: 'relative',
// //   },
// //   flatlistContent: {
// //     padding: 10,
// //   },
// //   item: {
// //     marginBottom: 20,
// //     alignItems: 'center',
// //   },
// //   image: {
// //     width: 200,
// //     height: 300,
// //     borderRadius: 10,
// //   },
// //   title: {
// //     marginTop: 10,
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //     textAlign: 'center',
// //   },
// //   arrowContainer: {
// //     position: 'absolute',
// //     bottom: 20,
// //     right: 20,
// //   },
// //   rectangle: {
// //     backgroundColor: 'rgba(0,0,0,0.5)',
// //     borderRadius: 10,
// //     padding: 8,
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //   },
// //   arrowText: {
// //     color: 'white',
// //     fontSize: 14,
// //     marginLeft: 4,
// //   },
// //   arrowCounter: {
// //     color: 'white',
// //     fontSize: 12,
// //   },
// //   dropdown: {
// //     backgroundColor: 'rgba(0,0,0,0.5)',
// //     borderRadius: 10,
// //     marginTop: 8,
// //     padding: 8,
// //     alignItems: 'center',
// //   },
// //   dropdownText: {
// //     color: 'white',
// //     fontSize: 12,
// //   },
// // });

// // import React, { useEffect, useState, useRef } from 'react';
// // import {
// //   View,
// //   Text,
// //   FlatList,
// //   TouchableOpacity,
// //   StyleSheet,
// //   ActivityIndicator,
// //   Animated,
// // } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';
// // import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // import PosterImage from './PosterImage';
// // import { Film, RootStackParamList } from './navigation';

// // export default function HomeScreen() {
// //   const [films, setFilms] = useState<Film[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [scrollOffset, setScrollOffset] = useState(0);
// //   const [showDropdown, setShowDropdown] = useState(false);
// //   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
// //   const flatlistRef = useRef<FlatList>(null);
// //   const fadeAnim = useRef(new Animated.Value(0)).current;

// //   useEffect(() => {
// //     const fetchFilms = async () => {
// //       try {
// //         const response = await fetch('http://pcpdfilm.starsknights.com/api/v2/films');
// //         const data = await response.json();
// //         setFilms(data);
// //       } catch (error) {
// //         console.error('Error fetching films:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchFilms();
// //   }, []);

// //   useEffect(() => {
// //     Animated.timing(fadeAnim, {
// //       toValue: showDropdown ? 1 : 0,
// //       duration: 300,
// //       useNativeDriver: true,
// //     }).start();
// //   }, [showDropdown]);

// //   const renderItem = ({ item, index }: { item: Film; index: number }) => (
// //     <TouchableOpacity
// //       style={styles.item}
// //       onPress={() => navigation.navigate('FilmDetail', { film: item })}
// //     >
// //       <PosterImage uri={item.poster} style={styles.image} />
// //       <Text style={styles.title}>{item.title}</Text>
// //     </TouchableOpacity>
// //   );

// //   const handleScroll = (event: any) => {
// //     setScrollOffset(event.nativeEvent.contentOffset.y);
// //   };

// //   const scrollToTop = () => {
// //     flatlistRef.current?.scrollToOffset({ offset: 0, animated: true });
// //     setShowDropdown(false);
// //   };

// //   const toggleDropdown = () => {
// //     setShowDropdown(!showDropdown);
// //   };

// //   if (loading) {
// //     return <ActivityIndicator style={{ marginTop: 50 }} size="large" />;
// //   }

// //   return (
// //     <View style={styles.container}>
// //       <FlatList
// //         ref={flatlistRef}
// //         data={films}
// //         keyExtractor={(item, index) => `${item._id}_${index}`}
// //         renderItem={renderItem}
// //         contentContainerStyle={styles.flatlistContent}
// //         onScroll={handleScroll}
// //         scrollEventThrottle={16}
// //       />
// //       {scrollOffset > 200 && (
// //         <View style={styles.arrowContainer}>
// //           <TouchableOpacity style={styles.rectangle} onPress={toggleDropdown}>
// //             <Text style={styles.arrowCounter}>↑</Text>
// //             <Text style={styles.arrowText}>{Math.floor(scrollOffset / 350) + 1}</Text>
// //           </TouchableOpacity>
// //           {showDropdown && (
// //             <Animated.View style={[styles.dropdown, { opacity: fadeAnim }]}>
// //               <TouchableOpacity onPress={scrollToTop}>
// //                 <Text style={styles.dropdownText} numberOfLines={1} ellipsizeMode="tail">
// //                     Go to Top Item
// //                 </Text>

// //               </TouchableOpacity>
// //             </Animated.View>
// //           )}
// //         </View>
// //       )}
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     position: 'relative',
// //   },
// //   flatlistContent: {
// //     padding: 10,
// //   },
// //   item: {
// //     marginBottom: 20,
// //     alignItems: 'center',
// //   },
// //   image: {
// //     width: 200,
// //     height: 300,
// //     borderRadius: 10,
// //   },
// //   title: {
// //     marginTop: 10,
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //     textAlign: 'center',
// //   },
// //   arrowContainer: {
// //     position: 'absolute',
// //     top: 80,
// //     right: 10,
// //     alignItems: 'flex-end',
// //     zIndex: 10,
// //   },
// //   rectangle: {
// //     backgroundColor: 'white',
// //     borderRadius: 8,
// //     paddingVertical: 4,
// //     paddingHorizontal: 8,
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.2,
// //     shadowRadius: 4,
// //     elevation: 5,
// //   },
// //   arrowText: {
// //     color: '#aaa',
// //     fontSize: 14,
// //     marginLeft: 4,
// //   },
// //   arrowCounter: {
// //     color: '#aaa',
// //     fontSize: 12,
// //   },
// // dropdown: {
// //   position: 'absolute',
// //   top: 40,
// //   right: 0,
// //   backgroundColor: 'white',
// //   borderRadius: 8,
// //   paddingVertical: 8,
// //   paddingHorizontal: 12,
// //   minWidth: 120, // Ensures enough space for the text
// //   shadowColor: '#000',
// //   shadowOffset: { width: 0, height: 2 },
// //   shadowOpacity: 0.2,
// //   shadowRadius: 4,
// //   elevation: 5,
// //   alignItems: 'center',
// // },

// //   dropdownText: {
// //     color: '#aaa',
// //     fontSize: 12,
// //   },
// // });
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
//   const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

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
//       setShowDropdown(false); // Reset dropdown when screen is focused
//     }, [])
//   );

//   const renderItem = ({ item }: { item: Film }) => (
//     <TouchableOpacity
//       style={styles.item}
//       onPress={() => navigation.navigate('FilmDetail', { film: item })}
//     >
//       <PosterImage uri={item.poster} style={styles.image} />
//       <Text style={styles.title}>{item.title}</Text>
//     </TouchableOpacity>
//   );

//   const handleScroll = (event: any) => {
//     setScrollOffset(event.nativeEvent.contentOffset.y);

//     if (scrollTimeout.current) {
//       clearTimeout(scrollTimeout.current);
//     }

//     scrollTimeout.current = setTimeout(() => {
//       setShowDropdown(false);
//     }, 15); // Hide dropdown after 150ms of no scroll
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
//     position: 'absolute',
//     top: 50,
//     right: 0,
//     backgroundColor: 'white',
//     borderRadius: 8,
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     minWidth: 150,
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
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
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

  useFocusEffect(
    useCallback(() => {
      setShowDropdown(false); // Reset dropdown when screen is focused
    }, [])
  );

  const renderItem = ({ item }: { item: Film }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('FilmDetail', { film: item })}
    >
      <PosterImage uri={item.poster} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  const handleScroll = (event: any) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
    setShowDropdown(false); // Immediately hide dropdown on scroll
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
  dropdown: {
    marginTop: 4, // closer to the arrow
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 130,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  dropdownText: {
    color: '#aaa',
    fontSize: 16,
  },
});

