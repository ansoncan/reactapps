// HomeScreen.tsx

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
import { FilmList, Film } from './FilmList';

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
  const [searchResults, setSearchResults] = useState<Film[]>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const flatListRef = useRef<any>(null);

  useEffect(() => {
    fetchFilms();
  }, []);

  const fetchFilms = async () => {
    try {
      setLoading(true);
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
    setSearchResults(null);
  };

  const handleSearchSubmit = () => {
    if (searchText.trim() === '') return;
    triggerSearch(searchText);
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
      const combined = [...filtered, ...(Array.isArray(data2) ? data2 : data2 ? [data2] : [])];
      setSearchResults(combined.length > 0 ? combined : null);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults(null);
    } finally {
      setSearchLoading(false);
    }
  };

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
    if (!isSearchActive) {
      setSearchText('');
      setSearchResults(null);
    }
  };

  const clearFilters = () => {
    setMonths([]);
    setSelectedYears([]);
  };

  const handleScroll = (event: any) => {
    const { contentOffset } = event.nativeEvent;
    setScrollOffset(contentOffset.y);
    setShowDropdown(false);
  };

  const isFiltered = months.length > 0 || selectedYears.length > 0;

  return (
    <View style={styles.container}>
      <HeaderBar
        isSearchActive={isSearchActive}
        searchText={searchText}
        onSearchTextChange={handleSearchTextChange}
        onSearchPress={() => setIsSearchActive(true)}
        onCancelSearch={toggleSearch}
        navigation={navigation} // Pass the navigation prop here
        onFilterPress={() => setIsFilterModalVisible(true)}
        isFiltered={isFiltered}
        onClearFilters={isFiltered ? clearFilters : undefined}
        onSearchSubmit={handleSearchSubmit}
        onClearSearch={() => {
          setSearchText('');
          setSearchResults(null);
        }}
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
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#4DA8DA" />
        </View>
      ) : isSearchActive && searchResults !== null ? (
        searchLoading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#4DA8DA" />
            <Text style={styles.loadingText}>Searching films...</Text>
          </View>
        ) : (
          <FilmList ref={flatListRef} films={searchResults} onScroll={handleScroll} noFilmsMessage={'No films found matching your criteria.'} />
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
  container: {
    flex: 1,
    position: 'relative',
    paddingTop: 50, // Adjusting for iPhone demo
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16, // Adjusting for iPhone demo
    color: '#4DA8DA',
  },
  noResultsText: {
    fontSize: 16, // Adjusting for iPhone demo
    color: '#999',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
