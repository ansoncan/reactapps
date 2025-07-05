
// import React, { useState, useEffect, useContext } from 'react';
// import {
//   View,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Animated,
//   Text,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Octicons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { AuthContext } from './AuthContext'; // ✅ Import AuthContext

// interface HeaderBarProps {
//   isSearchActive: boolean;
//   searchText: string;
//   onSearchTextChange: (text: string) => void;
//   onSearchPress: () => void;
//   onCancelSearch: () => void;
//   navigation: any;
//   onFilterPress: () => void;
//   isFiltered: boolean;
//   onClearFilters?: () => void;
//   onSearchSubmit: () => void;
//   onClearSearch: () => void;
// }

// export const HeaderBar = ({
//   isSearchActive,
//   searchText,
//   onSearchTextChange,
//   onSearchPress,
//   onCancelSearch,
//   navigation,
//   onFilterPress,
//   isFiltered,
//   onClearFilters,
//   onSearchSubmit,
//   onClearSearch,
// }: HeaderBarProps) => {
//   const [fadeAnim] = useState(new Animated.Value(0));
//   const [rotateYAnim] = useState(new Animated.Value(0));
//   const { isAuthenticated } = useContext(AuthContext); // ✅ Access auth state

//   useEffect(() => {
//     if (!isSearchActive) {
//       startAnimation();
//     }
//   }, []);

//   useEffect(() => {
//     if (!isSearchActive) {
//       startAnimation();
//     } else {
//       Animated.timing(fadeAnim, {
//         toValue: 0,
//         duration: 500,
//         useNativeDriver: true,
//       }).start();

//       Animated.timing(rotateYAnim, {
//         toValue: 0,
//         duration: 500,
//         useNativeDriver: true,
//       }).start();
//     }
//   }, [isSearchActive]);

//   const startAnimation = () => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 500,
//         useNativeDriver: true,
//       }),
//       Animated.timing(rotateYAnim, {
//         toValue: 360,
//         duration: 500,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   };

//   const rotateYInterpolate = rotateYAnim.interpolate({
//     inputRange: [0, 360],
//     outputRange: ['0deg', '360deg'],
//   });

//   // ✅ Handle person icon tap based on auth state
//   const handlePersonIconTap = () => {
//     if (isAuthenticated) {
//       navigation.navigate('UserProfileScreen');
//     } else {
//       navigation.navigate('LoginScreen');
//     }
//   };

//   return (
//     <View style={styles.header}>
//       {!isSearchActive && (
//         <>
//           <Animated.Text
//             style={[
//               styles.filmStoreText,
//               {
//                 opacity: fadeAnim,
//                 transform: [{ rotateY: rotateYInterpolate }],
//               },
//             ]}
//           >
//             Film Store
//           </Animated.Text>

//           <View style={styles.iconsContainer}>
//             {/* ✅ Person icon with auth logic */}
//             <TouchableOpacity onPress={handlePersonIconTap} style={styles.headerIcon}>
//               <Icon name="person" size={24} color="#8e8e93" />
//             </TouchableOpacity>

//             {/* Clear Filters icon */}
//             {isFiltered && onClearFilters && (
//               <TouchableOpacity onPress={onClearFilters} style={styles.headerIcon}>
//                 <MaterialIcons name="filter-list-off" size={24} color="#007AFF" />
//               </TouchableOpacity>
//             )}

//             {/* Filter icon */}
//             <TouchableOpacity onPress={onFilterPress} style={styles.headerIcon}>
//               <Icon name="filter" size={24} color={isFiltered ? '#007AFF' : '#8e8e93'} />
//             </TouchableOpacity>

//             {/* Search icon */}
//             {!isFiltered && (
//               <Animated.View style={{ opacity: fadeAnim }}>
//                 <TouchableOpacity onPress={onSearchPress} style={[styles.headerIcon, styles.searchIcon]}>
//                   <Icon name="search" size={24} color="#8e8e93" />
//                 </TouchableOpacity>
//               </Animated.View>
//             )}
//           </View>
//         </>
//       )}

//       {isSearchActive && (
//         <View style={styles.searchContainer}>
//           <TouchableOpacity onPress={onCancelSearch} style={styles.backIcon}>
//             <Icon name="chevron-left" size={24} color="#8e8e93" />
//           </TouchableOpacity>

//           <TextInput
//             value={searchText}
//             onChangeText={onSearchTextChange}
//             onSubmitEditing={onSearchSubmit}
//             placeholder="Search"
//             style={[styles.searchInput, searchText && styles.clearText]}
//           />

//           {searchText.length > 0 && (
//             <TouchableOpacity onPress={onClearSearch} style={styles.clearButton}>
//               <MaterialIcons name="clear" size={24} color="#8e8e93" />
//             </TouchableOpacity>
//           )}

//           <TouchableOpacity onPress={onSearchSubmit} style={styles.checkIcon}>
//             <Icon name="check" size={24} color="#007AFF" />
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     height: 60,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 0,
//     backgroundColor: '#ffffff',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//     width: '100%',
//   },
//   filmStoreText: {
//     fontSize: 22,
//     fontWeight: '600',
//     color: '#1c1c1e',
//     marginLeft: 15,
//     fontFamily: 'System',
//   },
//   iconsContainer: {
//     flexDirection: 'row',
//     flex: 1,
//     justifyContent: 'space-evenly',
//     alignItems: 'center',
//   },
//   headerIcon: {
//     marginLeft: 0,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//   },
//   backIcon: {
//     marginRight: 5,
//     paddingHorizontal: 20,
//   },
//   searchInput: {
//     flex: 1,
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 20,
//     paddingHorizontal: 10,
//     backgroundColor: '#fff',
//     paddingRight: 50,
//   },
//   clearText: {
//     color: 'gray',
//   },
//   clearButton: {
//     position: 'absolute',
//     right: 65,
//     top: 8,
//   },
//   checkIcon: {
//     marginLeft: 15,
//     paddingRight: 20,
//   },
// });

// import React, { useState, useEffect, useContext } from 'react';
// import {
//   View,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Animated,
//   Text,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Octicons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { AuthContext } from './AuthContext';

// interface HeaderBarProps {
//   isSearchActive: boolean;
//   searchText: string;
//   onSearchTextChange: (text: string) => void;
//   onSearchPress: () => void;
//   onCancelSearch: () => void;
//   navigation: any;
//   onFilterPress: () => void;
//   isFiltered: boolean;
//   onClearFilters?: () => void;
//   onSearchSubmit: () => void;
//   onClearSearch: () => void;
//   isSearchSubmitted: boolean; // ✅ New prop to track search submission
// }

// export const HeaderBar = ({
//   isSearchActive,
//   searchText,
//   onSearchTextChange,
//   onSearchPress,
//   onCancelSearch,
//   navigation,
//   onFilterPress,
//   isFiltered,
//   onClearFilters,
//   onSearchSubmit,
//   onClearSearch,
//   isSearchSubmitted,
// }: HeaderBarProps) => {
//   const [fadeAnim] = useState(new Animated.Value(0));
//   const [rotateYAnim] = useState(new Animated.Value(0));
//   const { isAuthenticated } = useContext(AuthContext);

//   useEffect(() => {
//     if (!isSearchActive) {
//       startAnimation();
//     }
//   }, []);

//   useEffect(() => {
//     if (!isSearchActive) {
//       startAnimation();
//     } else {
//       Animated.timing(fadeAnim, {
//         toValue: 0,
//         duration: 500,
//         useNativeDriver: true,
//       }).start();

//       Animated.timing(rotateYAnim, {
//         toValue: 0,
//         duration: 500,
//         useNativeDriver: true,
//       }).start();
//     }
//   }, [isSearchActive]);

//   const startAnimation = () => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 500,
//         useNativeDriver: true,
//       }),
//       Animated.timing(rotateYAnim, {
//         toValue: 360,
//         duration: 500,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   };

//   const rotateYInterpolate = rotateYAnim.interpolate({
//     inputRange: [0, 360],
//     outputRange: ['0deg', '360deg'],
//   });

//   const handlePersonIconTap = () => {
//     if (isAuthenticated) {
//       navigation.navigate('UserProfileScreen');
//     } else {
//       navigation.navigate('LoginScreen');
//     }
//   };

//   const handleHomeIconTap = () => {
//     navigation.navigate('HomeScreen');
//   };

//   return (
//     <View style={styles.header}>
//       {!isSearchActive && (
//         <>
//           <Animated.Text
//             style={[
//               styles.filmStoreText,
//               {
//                 opacity: fadeAnim,
//                 transform: [{ rotateY: rotateYInterpolate }],
//               },
//             ]}
//           >
//             Film Store
//           </Animated.Text>

//           <View style={styles.iconsContainer}>
//             {/* 🏠 Home Icon */}
//             <TouchableOpacity onPress={handleHomeIconTap} style={styles.headerIcon}>
//               <MaterialIcons name="home" size={24} color="#8e8e93" />
//             </TouchableOpacity>

//             {/* 👤 Person Icon */}
//             <TouchableOpacity onPress={handlePersonIconTap} style={styles.headerIcon}>
//               <Icon name="person" size={24} color="#8e8e93" />
//             </TouchableOpacity>

//             {/* 🧹 Clear Filters Icon */}
//             {isFiltered && onClearFilters && (
//               <TouchableOpacity onPress={onClearFilters} style={styles.headerIcon}>
//                 <MaterialIcons name="filter-list-off" size={24} color="#007AFF" />
//               </TouchableOpacity>
//             )}

//             {/* 🔍 Filter Icon - hidden after search is submitted */}
//             {!isSearchSubmitted && (
//               <TouchableOpacity onPress={onFilterPress} style={styles.headerIcon}>
//                 <Icon name="filter" size={24} color={isFiltered ? '#007AFF' : '#8e8e93'} />
//               </TouchableOpacity>
//             )}

//             {/* 🔎 Search Icon */}
//             {!isFiltered && (
//               <Animated.View style={{ opacity: fadeAnim }}>
//                 <TouchableOpacity onPress={onSearchPress} style={[styles.headerIcon, styles.searchIcon]}>
//                   <Icon name="search" size={24} color="#8e8e93" />
//                 </TouchableOpacity>
//               </Animated.View>
//             )}
//           </View>
//         </>
//       )}

//       {isSearchActive && (
//         <View style={styles.searchContainer}>
//           <TouchableOpacity onPress={onCancelSearch} style={styles.backIcon}>
//             <Icon name="chevron-left" size={24} color="#8e8e93" />
//           </TouchableOpacity>

//           <TextInput
//             value={searchText}
//             onChangeText={onSearchTextChange}
//             onSubmitEditing={onSearchSubmit}
//             placeholder="Search"
//             style={[styles.searchInput, searchText && styles.clearText]}
//           />

//           {searchText.length > 0 && (
//             <TouchableOpacity onPress={onClearSearch} style={styles.clearButton}>
//               <MaterialIcons name="clear" size={24} color="#8e8e93" />
//             </TouchableOpacity>
//           )}

//           <TouchableOpacity onPress={onSearchSubmit} style={styles.checkIcon}>
//             <Icon name="check" size={24} color="#007AFF" />
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     height: 60,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 0,
//     backgroundColor: '#ffffff',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//     width: '100%',
//   },
//   filmStoreText: {
//     fontSize: 22,
//     fontWeight: '600',
//     color: '#1c1c1e',
//     marginLeft: 15,
//     fontFamily: 'System',
//   },
//   iconsContainer: {
//     flexDirection: 'row',
//     flex: 1,
//     justifyContent: 'space-evenly',
//     alignItems: 'center',
//   },
//   headerIcon: {
//     marginLeft: 0,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//   },
//   backIcon: {
//     marginRight: 5,
//     paddingHorizontal: 20,
//   },
//   searchInput: {
//     flex: 1,
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 20,
//     paddingHorizontal: 10,
//     backgroundColor: '#fff',
//     paddingRight: 50,
//   },
//   clearText: {
//     color: 'gray',
//   },
//   clearButton: {
//     position: 'absolute',
//     right: 65,
//     top: 8,
//   },
//   checkIcon: {
//     marginLeft: 15,
//     paddingRight: 20,
//   },
// });
import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from './AuthContext';
import { useNavigation } from '@react-navigation/native';

interface HeaderBarProps {
  isSearchActive: boolean;
  searchText: string;
  onSearchTextChange: (text: string) => void;
  onSearchPress: () => void;
  onCancelSearch: () => void;
  onFilterPress: () => void;
  isFiltered: boolean;
  onClearFilters?: () => void;
  onSearchSubmit: () => void;
  onClearSearch: () => void;
  isSearchSubmitted: boolean;
}

export const HeaderBar = ({
  isSearchActive,
  searchText,
  onSearchTextChange,
  onSearchPress,
  onCancelSearch,
  onFilterPress,
  isFiltered,
  onClearFilters,
  onSearchSubmit,
  onClearSearch,
  isSearchSubmitted,
}: HeaderBarProps) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [rotateYAnim] = useState(new Animated.Value(0));
  const { isAuthenticated } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    if (!isSearchActive) {
      startAnimation();
    }
  }, []);

  useEffect(() => {
    if (!isSearchActive) {
      startAnimation();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();

      Animated.timing(rotateYAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isSearchActive]);

  const startAnimation = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(rotateYAnim, {
        toValue: 360,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const rotateYInterpolate = rotateYAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const handlePersonIconTap = () => {
    if (isAuthenticated) {
      navigation.navigate('UserProfileScreen');
    } else {
      navigation.navigate('LoginScreen');
    }
  };

const handleHomeIconTap = () => {
  navigation.reset({
    index: 0,
    routes: [{ name: 'HomeScreen' }],
  });
};


  return (
    <View style={styles.header}>
      {!isSearchActive && (
        <>
          <Animated.Text
            style={[
              styles.filmStoreText,
              {
                opacity: fadeAnim,
                transform: [{ rotateY: rotateYInterpolate }],
              },
            ]}
          >
            Film Store
          </Animated.Text>

          <View style={styles.iconsContainer}>
            {/* 🏠 Home Icon */}
            <TouchableOpacity onPress={handleHomeIconTap} style={styles.headerIcon}>
              <MaterialIcons name="home" size={24} color="#8e8e93" />
            </TouchableOpacity>

            {/* 👤 Person Icon */}
            <TouchableOpacity onPress={handlePersonIconTap} style={styles.headerIcon}>
              <Icon name="person" size={24} color="#8e8e93" />
            </TouchableOpacity>

            {/* 🧹 Clear Filters Icon */}
            {isFiltered && onClearFilters && (
              <TouchableOpacity onPress={onClearFilters} style={styles.headerIcon}>
                <MaterialIcons name="filter-list-off" size={24} color="#007AFF" />
              </TouchableOpacity>
            )}

            {/* 🔍 Filter Icon - hidden after search is submitted */}
            {!isSearchSubmitted && (
              <TouchableOpacity onPress={onFilterPress} style={styles.headerIcon}>
                <Icon name="filter" size={24} color={isFiltered ? '#007AFF' : '#8e8e93'} />
              </TouchableOpacity>
            )}

            {/* 🔎 Search Icon */}
            {!isFiltered && (
              <Animated.View style={{ opacity: fadeAnim }}>
                <TouchableOpacity onPress={onSearchPress} style={[styles.headerIcon, styles.searchIcon]}>
                  <Icon name="search" size={24} color="#8e8e93" />
                </TouchableOpacity>
              </Animated.View>
            )}
          </View>
        </>
      )}

      {isSearchActive && (
        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={onCancelSearch} style={styles.backIcon}>
            <Icon name="chevron-left" size={24} color="#8e8e93" />
          </TouchableOpacity>

          <TextInput
            value={searchText}
            onChangeText={onSearchTextChange}
            onSubmitEditing={onSearchSubmit}
            placeholder="Search"
            style={[styles.searchInput, searchText && styles.clearText]}
          />

          {searchText.length > 0 && (
            <TouchableOpacity onPress={onClearSearch} style={styles.clearButton}>
              <MaterialIcons name="clear" size={24} color="#8e8e93" />
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={onSearchSubmit} style={styles.checkIcon}>
            <Icon name="check" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
  },
  filmStoreText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1c1c1e',
    marginLeft: 15,
    fontFamily: 'System',
  },
  iconsContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: 0,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  backIcon: {
    marginRight: 5,
    paddingHorizontal: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    paddingRight: 50,
  },
  clearText: {
    color: 'gray',
  },
  clearButton: {
    position: 'absolute',
    right: 65,
    top: 8,
  },
  checkIcon: {
    marginLeft: 15,
    paddingRight: 20,
  },
});
