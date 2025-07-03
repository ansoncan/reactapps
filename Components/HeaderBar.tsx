import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface HeaderBarProps {
  isSearchActive: boolean;
  searchText: string;
  onSearchTextChange: (text: string) => void;
  onSearchPress: () => void;
  onCancelSearch: () => void;
  navigation: any; // Ensure this is defined
  onFilterPress: () => void;
  isFiltered: boolean;
  onClearFilters?: () => void;
  onSearchSubmit: () => void;
  onClearSearch: () => void;
}

export const HeaderBar = ({
  isSearchActive,
  searchText,
  onSearchTextChange,
  onSearchPress,
  onCancelSearch,
  navigation, // Destructure 'navigation' prop
  onFilterPress,
  isFiltered,
  onClearFilters,
  onSearchSubmit,
  onClearSearch,
}: HeaderBarProps) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [rotateYAnim] = useState(new Animated.Value(0));

  // Re-run animation when the component mounts or when it is not in search mode
  useEffect(() => {
    if (!isSearchActive) {
      startAnimation();
    }
  }, []);

  // Restart animation whenever `isSearchActive` changes to false
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
      })
    ]).start();
  }

  const rotateYInterpolate = rotateYAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.header]}>
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

          {/* Icons container */}
          <View style={styles.iconsContainer}>
            {isFiltered && onClearFilters && (
              <TouchableOpacity onPress={onClearFilters} style={styles.headerIcon}>
                <MaterialIcons name="filter-list-off" size={24} color="#4DA8DA" />
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} style={styles.headerIcon}>
              <Icon name="person" size={24} color="#bcbcbc" />
            </TouchableOpacity>

            <TouchableOpacity onPress={onFilterPress} style={styles.headerIcon}>
              <Icon name="filter" size={24} color={isFiltered ? '#4DA8DA' : '#bcbcbc'} />
            </TouchableOpacity>

            {!isFiltered && (
              <Animated.View style={{ opacity: fadeAnim }}>
                <TouchableOpacity onPress={onSearchPress} style={[styles.headerIcon, styles.searchIcon]}>
                  <Icon name="search" size={24} color="#bcbcbc" />
                </TouchableOpacity>
              </Animated.View>
            )}
          </View>
        </>
      )}

      {isSearchActive && (
        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={onCancelSearch} style={styles.backIcon}>
            <Icon name="chevron-left" size={24} color="#bcbcbc" />
          </TouchableOpacity>

          <TextInput
            value={searchText}
            onChangeText={(text) => {
              onSearchTextChange(text);
            }}
            onSubmitEditing={onSearchSubmit}
            placeholder="Search"
            style={[styles.searchInput, searchText && styles.clearText]}
          />

          {searchText.length > 0 && (
            <TouchableOpacity
              onPress={onClearSearch}
              style={styles.clearButton}
            >
              <MaterialIcons name="clear" size={24} color="#bcbcbc" />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={onSearchSubmit}
            style={styles.checkIcon}
          >
            <Icon name="check" size={24} color="#4DA8DA" />
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
    paddingHorizontal: 10,
    backgroundColor: '#f8f9fa',
  },
  filmStoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 15, // Add left margin to center text within the header
  },
  iconsContainer: {
    flexDirection: 'row',         // Align children horizontally in a row
    flex: 1,                      // Take up remaining space in the container
    justifyContent: 'space-evenly',// Distribute icons evenly across the available width
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
    paddingHorizontal: 20, // Adjust padding for better positioning
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    paddingRight: 50, // Adjust padding for clear button
  },
  clearText: {
    color: 'gray', // You can style the placeholder text differently
  },
  clearButton: {
    position: 'absolute',
    right: 65, // Adjusted to make space for check icon
    top: 8,
  },
  checkIcon: {
    marginLeft: 15, // Adjust spacing between search input and check button
    paddingRight: 20, // Add padding for better positioning
  }
});
