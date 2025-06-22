import React from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';

interface SearchOverlayProps {
  isVisible: boolean;
  onClose: () => void;
  searchText: string;
  onSearchTextChange: (text: string) => void;
}

export const SearchOverlay = ({ isVisible, onClose, searchText, onSearchTextChange }: SearchOverlayProps) => {
  if (!isVisible) return null;

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.searchOverlay}>
        <View style={styles.overlayBackground} />
        <View style={styles.searchBoxContainer}>
          <Text>Search</Text>
          <TextInput
            placeholder="Enter search text..."
            value={searchText}
            onChangeText={onSearchTextChange}
            style={[styles.searchInput, { width: '80%' }]}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  searchOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  overlayBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  searchBoxContainer: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 10,
    elevation: 4,
    alignItems: 'center', // Center the content inside the search box
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    borderRadius: 25,
    paddingHorizontal: 10,
    marginTop: 10, // Add some margin to separate from the text
  },
});