// 
// import React from 'react';
// import {
//   View,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Octicons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// interface HeaderBarProps {
//   isSearchActive: boolean;
//   searchText: string;
//   onSearchTextChange: (text: string) => void;
//   onSearchPress: () => void;
//   onCancelSearch: () => void;
//   onUserPress: () => void;
//   onFilterPress: () => void;
//   isFiltered: boolean;
//   onClearFilters?: () => void;
// }

// export const HeaderBar = ({
//   isSearchActive,
//   searchText,
//   onSearchTextChange,
//   onSearchPress,
//   onCancelSearch,
//   onUserPress,
//   onFilterPress,
//   isFiltered,
//   onClearFilters,
// }: HeaderBarProps) => {
//   return (
//     <View style={styles.header}>
//       {isSearchActive ? (
//         <View style={styles.searchContainer}>
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search films..."
//             value={searchText}
//             onChangeText={onSearchTextChange}
//             autoFocus
//           />
//           <TouchableOpacity onPress={onCancelSearch}>
//             <Icon name="x" size={24} color="#bcbcbc" />
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <>
//           <TouchableOpacity onPress={onUserPress}>
//             <Icon name="person" size={24} color="#bcbcbc" />
//           </TouchableOpacity>
//           {isFiltered && onClearFilters && (
//             <TouchableOpacity onPress={onClearFilters}>
//               <MaterialIcons name="filter-list-off" size={24} color="#4DA8DA" />
//             </TouchableOpacity>
//           )}
//           <TouchableOpacity onPress={onFilterPress}>
//             <Icon name="filter" size={24} color={isFiltered ? '#4DA8DA' : '#bcbcbc'} />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={onSearchPress}>
//             <Icon name="search" size={24} color="#bcbcbc" />
//           </TouchableOpacity>
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//     height: 50,
//     backgroundColor: '#fff',
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//     paddingHorizontal: 10,
//   },
//   searchInput: {
//     flex: 1,
//     height: 40,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginRight: 10,
//   },
// });


import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface HeaderBarProps {
  isSearchActive: boolean;
  searchText: string;
  onSearchTextChange: (text: string) => void;
  onSearchPress: () => void;
  onCancelSearch: () => void;
  onUserPress: () => void;
  onFilterPress: () => void;
  isFiltered: boolean;
  onClearFilters?: () => void;
  onSearchSubmit: () => void;
}

export const HeaderBar = ({
  isSearchActive,
  searchText,
  onSearchTextChange,
  onSearchPress,
  onCancelSearch,
  onUserPress,
  onFilterPress,
  isFiltered,
  onClearFilters,
  onSearchSubmit,
}: HeaderBarProps) => {
  return (
    <View style={styles.header}>
      {isSearchActive ? (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search films..."
            value={searchText}
            onChangeText={onSearchTextChange}
            onSubmitEditing={() => {
              Keyboard.dismiss();
              onSearchSubmit();
            }}
            returnKeyType="search"
            autoFocus
          />
          <TouchableOpacity onPress={onSearchSubmit}>
            <Icon name="search" size={24} color="#4DA8DA" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onCancelSearch}>
            <Icon name="x" size={24} color="#bcbcbc" />
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <TouchableOpacity onPress={onUserPress}>
            <Icon name="person" size={24} color="#bcbcbc" />
          </TouchableOpacity>
          {isFiltered && onClearFilters && (
            <TouchableOpacity onPress={onClearFilters}>
              <MaterialIcons name="filter-list-off" size={24} color="#4DA8DA" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={onFilterPress}>
            <Icon name="filter" size={24} color={isFiltered ? '#4DA8DA' : '#bcbcbc'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onSearchPress}>
            <Icon name="search" size={24} color="#bcbcbc" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});
