import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

interface HeaderBarProps {
  onUserPress: () => void;
  onFilterPress: () => void;
  onSearchPress: () => void;
}

export const HeaderBar = ({ onUserPress, onFilterPress, onSearchPress }: HeaderBarProps) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onUserPress}>
      <Icon name="person" size={24} color="#bcbcbc" />
    </TouchableOpacity>
    <TouchableOpacity onPress={onFilterPress}>
      <Icon name="filter" size={24} color="#bcbcbc" />
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    elevation: 4,
  },
});
