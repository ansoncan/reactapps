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
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

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
  const fadeAnim = useState(new Animated.Value(0))[0];
  const rotateYAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(rotateYAnim, {
      toValue: 360,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, rotateYAnim]);

  const rotateYInterpolate = rotateYAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const panGesture = Gesture.Pan()
    .onEnd(({ translationX }) => {
      if (translationX < -50) {
        onCancelSearch();
      }
    });

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

          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} style={styles.headerIcon}>
            <Icon name="person" size={24} color="#bcbcbc" />
          </TouchableOpacity>

          {isFiltered && onClearFilters && (
            <TouchableOpacity onPress={onClearFilters} style={styles.headerIcon}>
              <MaterialIcons name="filter-list-off" size={24} color="#4DA8DA" />
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={onFilterPress} style={styles.headerIcon}>
            <Icon name="filter" size={24} color={isFiltered ? '#4DA8DA' : '#bcbcbc'} />
          </TouchableOpacity>

          {!isFiltered && (
            <Animated.View style={{ opacity: fadeAnim }}>
              <TouchableOpacity onPress={onSearchPress} style={styles.headerIcon}>
                <Icon name="search" size={24} color="#bcbcbc" />
              </TouchableOpacity>
            </Animated.View>
          )}
        </>
      )}

      {isSearchActive && (
        <GestureDetector gesture={panGesture}>
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
        </GestureDetector>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f8f9fa',
  },
  filmStoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerIcon: {
    marginLeft: 10,
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
  },
});