// 
import React, { useEffect, useState, useRef } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Film, RootStackParamList } from './navigation';
import { SearchOverlay } from './SearchOverlay';
import { FilterModal } from './FilterModal';
import { FilmList } from './FilmList';
import { HeaderBar } from './HeaderBar';
import { ScrollIndex } from './ScrollIndex';
import { extractValidYears, handleMonthSelection as handleMonthSelectHelper } from './filmHelpers';

export default function HomeScreen() {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [year, setYear] = useState<number | null>(null);
  const [months, setMonths] = useState<number[]>([]);
  const [isSearchOverlayVisible, setIsSearchOverlayVisible] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [earliestYear, setEarliestYear] = useState(new Date().getFullYear());
  const [latestYear, setLatestYear] = useState(new Date().getFullYear());
  const [scrollOffset, setScrollOffset] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const flatListRef = useRef<FlatList>(null);
  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await fetch('http://pcpdfilm.starsknights.com/api/v2/films');
        const data: Film[] = await response.json();
        setFilms(data);

        const validYears = extractValidYears(data);
        if (validYears.length > 0) {
          const minYear = Math.min(...validYears);
          const maxYear = Math.max(...validYears);
          setEarliestYear(minYear);
          setLatestYear(maxYear);
          setYear(minYear);
        } else {
          console.warn('No valid years found in the data.');
        }
      } catch (error) {
        console.error('Error fetching films:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setIsSearchOverlayVisible(false);
      setIsFilterModalVisible(false);
      setYear(null);
      setMonths([]);
      setShowDropdown(false); // Reset dropdown on screen focus

      return () => {
        if (dropdownTimerRef.current) {
          clearTimeout(dropdownTimerRef.current);
        }
      };
    }, [])
  );

  const toggleSearchOverlay = () => setIsSearchOverlayVisible(prev => !prev);
  const toggleFilterModal = () => setIsFilterModalVisible(prev => !prev);

  const toggleDropdown = () => {
    setShowDropdown(prev => {
      const newState = !prev;
      if (newState) {
        dropdownTimerRef.current = setTimeout(() => {
          setShowDropdown(false);
        }, 10000); // Auto-hide after 10 seconds
      } else if (dropdownTimerRef.current) {
        clearTimeout(dropdownTimerRef.current);
      }
      return newState;
    });
  };

  const hideDropdown = () => {
    setShowDropdown(false);
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
    }
  };

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    setShowDropdown(false);
  };

  const handleMonthSelection = (month: number) => {
    setMonths(prev => handleMonthSelectHelper(month, prev));
  };

  const applyFilters = () => {
    console.log('Year:', year);
    console.log('Selected Months:', months);
    setIsFilterModalVisible(false);
  };

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setScrollOffset(offsetY);
    if (scrollOffset > 200 && offsetY <= 200) {
      setShowDropdown(false);
    }
    if (showDropdown) setShowDropdown(false);
  };

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 50 }} size="large" />;
  }

  return (
    <View style={{ flex: 1, position: 'relative', paddingTop: 50 }}>
      <HeaderBar
        onUserPress={() => navigation.navigate('Login')}
        onFilterPress={toggleFilterModal}
        onSearchPress={toggleSearchOverlay}
      />

      <SearchOverlay
        isVisible={isSearchOverlayVisible}
        onClose={toggleSearchOverlay}
        searchText={searchText}
        onSearchTextChange={setSearchText}
      />

      <FilterModal
        isVisible={isFilterModalVisible}
        onClose={toggleFilterModal}
        year={year}
        setYear={setYear}
        months={months}
        handleMonthSelection={handleMonthSelection}
        applyFilters={applyFilters}
        earliestYear={earliestYear}
        latestYear={latestYear}
      />

      <ScrollIndex
        scrollOffset={scrollOffset}
        showDropdown={showDropdown}
        toggleDropdown={toggleDropdown}
        scrollToTop={scrollToTop}
        hideDropdown={hideDropdown}
      />

      <FilmList films={films} onScroll={handleScroll} ref={flatListRef} />
    </View>
  );
}
