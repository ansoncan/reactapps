import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



interface HeaderBarProps {
  onUserPress: () => void;
  onFilterPress: () => void;
  onSearchPress: () => void;
  isFiltered: boolean;
  onClearFilters?: () => void;
}

export const HeaderBar = ({ onUserPress, onFilterPress, onSearchPress, isFiltered, onClearFilters }: HeaderBarProps) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onUserPress}>
      <Icon name="person" size={24} color="#bcbcbc" />
    </TouchableOpacity>
    {isFiltered && onClearFilters && (
      <TouchableOpacity onPress={onClearFilters}>
        <MaterialIcons name = "filter-list-off" size={24} color="#4DA8DA" />
      </TouchableOpacity>
    )}
    <TouchableOpacity onPress={onFilterPress}>
      <Icon name="filter" size={24} color={isFiltered ? '#4DA8DA' : '#bcbcbc'} />
    </TouchableOpacity>
    <TouchableOpacity onPress={onSearchPress}>
      <Icon name="search" size={24} color="#bcbcbc" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 50,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});
