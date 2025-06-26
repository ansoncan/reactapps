// import React, { useEffect, useState, useRef } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { HeaderBar } from './HeaderBar';
// import { SearchOverlay } from './SearchOverlay';
// import { FilterModal } from './FilterModal';
// import { ScrollIndex } from './ScrollIndex';
// import { FilmList } from './FilmList';

// interface Film {
//   _id: string;
//   title: string;
//   year?: string;
//   released?: string;
//   poster?: string;
// }

// const HomeScreen = () => {
//   const navigation = useNavigation();
//   const [isSearchOverlayVisible, setIsSearchOverlayVisible] = useState(false);
//   const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
//   const [searchText, setSearchText] = useState('');
//   const [scrollOffset, setScrollOffset] = useState(0);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [films, setFilms] = useState<Film[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [months, setMonths] = useState<number[]>([]);
//   const [filteredFilms, setFilteredFilms] = useState<Film[]>([]);
//   const [selectedYears, setSelectedYears] = useState<number[]>([]);
//   const flatListRef = useRef<any>(null);

//   useEffect(() => {
//     fetchFilms();
//   }, []);

//   const fetchFilms = async () => {
//     try {
//       const response = await fetch('http://pcpdfilm.starsknights.com/api/v2/films');
//       const data = await response.json();
//       setFilms(data);
//       setFilteredFilms(data);
//     } catch (error) {
//       console.error("Error fetching films:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!loading) {
//       applyFilters();
//     }
//   }, [months, selectedYears, films, loading]);

//   const applyFilters = () => {
//   const monthMap: { [key: string]: number } = {
//     Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
//     Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
//   };

//   const filtered = films.filter(film => {
//     if (!film.released) return false;

//     const match = film.released.match(/^(\d{1,2})\s([A-Za-z]{3})\s(\d{4})$/);
//     if (!match) return false;

//     const [, , monthAbbr, yearStr] = match;
//     const monthIndex = monthMap[monthAbbr];
//     const year = parseInt(yearStr, 10);

//     if (!monthIndex) return false;

//     const monthMatch = months.length === 0 || months.includes(monthIndex);
//     const yearMatch = selectedYears.length === 0 || selectedYears.includes(year);

//     return monthMatch && yearMatch;
//   });

//   setFilteredFilms(filtered);
// };


//   const clearFilters = () => {
//     setMonths([]);
//     setSelectedYears([]);
//   };

//   const handleMonthSelectHelper = (month: number) => {
//     setMonths(prev => prev.includes(month) ? prev.filter(m => m !== month) : [...prev, month]);
//   };

//   const handleYearSelectHelper = (year: number) => {
//     setSelectedYears(prev => prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]);
//   };

//   const toggleSearchOverlay = () => setIsSearchOverlayVisible(!isSearchOverlayVisible);
//   const toggleFilterModal = () => setIsFilterModalVisible(!isFilterModalVisible);

//   const handleScroll = (event: any) => {
//     const { contentOffset } = event.nativeEvent;
//     setScrollOffset(contentOffset.y);
//     setShowDropdown(contentOffset.y > 100);
//   };

//   const scrollToTop = () => {
//     flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
//   };

//   const hideDropdown = () => setShowDropdown(false);
//   const toggleDropdown = () => setShowDropdown(!showDropdown);

//   const isFiltered = months.length > 0 || selectedYears.length > 0;

//   return (
//     <View style={{ flex: 1, position: 'relative', paddingTop: 50 }}>
//       <HeaderBar
//         onUserPress={() => navigation.navigate('Login')}
//         onFilterPress={toggleFilterModal}
//         onSearchPress={toggleSearchOverlay}
//         isFiltered={isFiltered}
//         onClearFilters={isFiltered ? clearFilters : undefined}
//       />
//       <SearchOverlay
//         isVisible={isSearchOverlayVisible}
//         onClose={toggleSearchOverlay}
//         searchText={searchText}
//         onSearchTextChange={setSearchText}
//       />
//       <FilterModal
//         isVisible={isFilterModalVisible}
//         onClose={toggleFilterModal}
//         months={months}
//         handleMonthSelection={handleMonthSelectHelper}
//         applyFilters={applyFilters}
//         clearFilters={clearFilters}
//         filteredFilms={filteredFilms}
//         selectedYears={selectedYears}
//         handleYearSelection={handleYearSelectHelper}
//       />
//       <ScrollIndex
//         scrollOffset={scrollOffset}
//         showDropdown={showDropdown}
//         toggleDropdown={toggleDropdown}
//         scrollToTop={scrollToTop}
//         hideDropdown={hideDropdown}
//       />
//       {filteredFilms.length > 0 ? (
//         <FilmList
//           ref={flatListRef}
//           films={filteredFilms}
//           onScroll={handleScroll}
//         />
//       ) : (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <Text>No films found matching your criteria.</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// export default HomeScreen;


import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HeaderBar } from './HeaderBar';
import { FilterModal } from './FilterModal';
import { ScrollIndex } from './ScrollIndex';
import { FilmList } from './FilmList';

interface Film {
  _id: string;
  title: string;
  year?: string;
  released?: string;
  poster?: string;
}

const HomeScreen = () => {
  const navigation = useNavigation();
  const [films, setFilms] = useState<Film[]>([]);
  const [filteredFilms, setFilteredFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [months, setMonths] = useState<number[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<Film[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const flatListRef = useRef<any>(null);

  useEffect(() => {
    fetchFilms();
  }, []);

  const fetchFilms = async () => {
    try {
      const response = await fetch('http://pcpdfilm.starsknights.com/api/v2/films');
      const data = await response.json();
      setFilms(data);
      setFilteredFilms(data);
    } catch (error) {
      console.error("Error fetching films:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) applyFilters();
  }, [months, selectedYears, films, loading]);

  const applyFilters = () => {
    const monthMap: { [key: string]: number } = {
      Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
      Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
    };

    const filtered = films.filter(film => {
      if (!film.released) return false;
      const match = film.released.match(/^(\d{1,2})\s([A-Za-z]{3})\s(\d{4})$/);
      if (!match) return false;
      const [, , monthAbbr, yearStr] = match;
      const monthIndex = monthMap[monthAbbr];
      const year = parseInt(yearStr, 10);
      if (!monthIndex) return false;
      const monthMatch = months.length === 0 || months.includes(monthIndex);
      const yearMatch = selectedYears.length === 0 || selectedYears.includes(year);
      return monthMatch && yearMatch;
    });

    setFilteredFilms(filtered);
  };

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
    if (text.trim() === '') {
      setSearchResults([]);
      return;
    }
    triggerSearch(text);
  };

  const handleSearchSubmit = () => {
    if (searchText.trim() !== '') {
      triggerSearch(searchText);
    }
  };

  const triggerSearch = async (text: string) => {
    setSearchLoading(true);
    try {
      const [res1, res2] = await Promise.all([
        fetch('http://pcpdfilm.starsknights.com/api/v2/films'),
        fetch(`http://pcpdfilm.starsknights.com/api/v2/ofilm/${encodeURIComponent(text)}`),
      ]);
      const data1 = await res1.json();
      const data2 = await res2.json();
      const filtered = data1.filter((film: Film) =>
        film.title.toLowerCase().includes(text.toLowerCase())
      );
      const combined = [...filtered, ...(Array.isArray(data2) ? data2 : [data2])];
      setSearchResults(combined);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setSearchLoading(false);
    }
  };

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
    setSearchText('');
    setSearchResults([]);
  };

  const clearFilters = () => {
    setMonths([]);
    setSelectedYears([]);
  };

  const handleScroll = (event: any) => {
    const { contentOffset } = event.nativeEvent;
    setScrollOffset(contentOffset.y);
    setShowDropdown(contentOffset.y > 100);
  };

  const isFiltered = months.length > 0 || selectedYears.length > 0;

  return (
    <View style={{ flex: 1, position: 'relative', paddingTop: 50 }}>
      <HeaderBar
        isSearchActive={isSearchActive}
        searchText={searchText}
        onSearchTextChange={handleSearchTextChange}
        onSearchPress={toggleSearch}
        onCancelSearch={toggleSearch}
        onUserPress={() => navigation.navigate('Login')}
        onFilterPress={() => setIsFilterModalVisible(true)}
        isFiltered={isFiltered}
        onClearFilters={isFiltered ? clearFilters : undefined}
        onSearchSubmit={handleSearchSubmit}
      />

      {!isSearchActive && (
        <>
          <FilterModal
            isVisible={isFilterModalVisible}
            onClose={() => setIsFilterModalVisible(false)}
            months={months}
            handleMonthSelection={(month) =>
              setMonths((prev) =>
                prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month]
              )
            }
            applyFilters={applyFilters}
            clearFilters={clearFilters}
            filteredFilms={filteredFilms}
            selectedYears={selectedYears}
            handleYearSelection={(year) =>
              setSelectedYears((prev) =>
                prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
              )
            }
          />

          <ScrollIndex
            scrollOffset={scrollOffset}
            showDropdown={showDropdown}
            toggleDropdown={() => setShowDropdown(!showDropdown)}
            scrollToTop={() =>
              flatListRef.current?.scrollToOffset({ offset: 0, animated: true })
            }
            hideDropdown={() => setShowDropdown(false)}
          />
        </>
      )}

      {isSearchActive ? (
        searchText.trim() === '' ? null : searchLoading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#4DA8DA" />
            <Text style={styles.loadingText}>Searching films...</Text>
          </View>
        ) : searchResults.length > 0 ? (
          <FilmList ref={flatListRef} films={searchResults} onScroll={handleScroll} />
        ) : (
          <View style={styles.centered}>
            <Text style={styles.noResultsText}>
              We couldn’t find any films matching your search. Try a different title!
            </Text>
          </View>
        )
      ) : filteredFilms.length > 0 ? (
        <FilmList ref={flatListRef} films={filteredFilms} onScroll={handleScroll} />
      ) : (
        <View style={styles.centered}>
          <Text>No films found matching your criteria.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#4DA8DA',
  },
  noResultsText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
