// 
import React, { useState, useEffect } from 'react';
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

interface HeaderBarProps {
  isSearchActive: boolean;
  searchText: string;
  onSearchTextChange: (text: string) => void;
  onSearchPress: () => void;
  onCancelSearch: () => void;
  navigation: any;
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
  navigation,
  onFilterPress,
  isFiltered,
  onClearFilters,
  onSearchSubmit,
  onClearSearch,
}: HeaderBarProps) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [rotateYAnim] = useState(new Animated.Value(0));

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
            {isFiltered && onClearFilters && (
              <TouchableOpacity onPress={onClearFilters} style={styles.headerIcon}>
                <MaterialIcons name="filter-list-off" size={24} color="#007AFF" />
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} style={styles.headerIcon}>
              <Icon name="person" size={24} color="#8e8e93" />
            </TouchableOpacity>

            <TouchableOpacity onPress={onFilterPress} style={styles.headerIcon}>
              <Icon name="filter" size={24} color={isFiltered ? '#007AFF' : '#8e8e93'} />
            </TouchableOpacity>

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
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
