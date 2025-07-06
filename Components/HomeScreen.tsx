// import React, { useEffect, useState, useRef } from "react";
// import {
//   View,
//   ActivityIndicator,
//   StyleSheet,
//   NativeSyntheticEvent,
//   NativeScrollEvent,
// } from "react-native";
// import { getFilms, searchFilm, Film } from "../service/film_api";
// import FilmList from "../Components/FilmList";
// import { HeaderBar } from "../Components/HeaderBar";
// import { ScrollIndex } from "../Components/ScrollIndex";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { FilterModal } from "../Components/FilterModal";

// const HomeScreen = ({ navigation }: any) => {
//   const [films, setFilms] = useState<Film[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [scrollOffset, setScrollOffset] = useState(0);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [isSearchActive, setIsSearchActive] = useState(false);
//   const [searchText, setSearchText] = useState("");
//   const [isFiltered, setIsFiltered] = useState(false);
//   const [isFilterModalVisible, setFilterModalVisible] = useState(false);
//   const [months, setMonths] = useState<number[]>([]);
//   const [selectedYears, setSelectedYears] = useState<number[]>([]);
//   const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);
//   const flatListRef = useRef(null);

//   const fetchAllFilms = async () => {
//     try {
//       setLoading(true);
//       const data = await getFilms();
//       const uniqueFilms = Array.from(
//         new Map(data.map((film) => [film._id, film])).values()
//       );
//       setFilms(uniqueFilms);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllFilms();
//   }, []);


//   const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
//     const offset = event.nativeEvent.contentOffset.y;
//     //console.log('Scroll Offset:', offset); // ✅ Add this
//     setScrollOffset(offset);
//   };

//   const toggleDropdown = () => setShowDropdown((prev) => !prev);
//   const hideDropdown = () => setShowDropdown(false);

//   const scrollToTop = () => {
//     flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
//   };

//   const handleSearchPress = () => setIsSearchActive(true);

//   const handleCancelSearch = () => {
//     setIsSearchActive(false);
//     setSearchText("");
//     setIsSearchSubmitted(false);
//     fetchAllFilms();
//   };

//   const handleSearchSubmit = async () => {
//     if (!searchText.trim()) return;
//     try {
//       setLoading(true);
//       const result = await searchFilm(searchText.trim());
//       setFilms([result]);
//       setIsSearchActive(false);
//       setIsSearchSubmitted(true);
//     } catch (error) {
//       console.error("Search failed:", error);
//       setFilms([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClearSearch = async () => {
//     setSearchText("");
//     setIsSearchSubmitted(false);
//     await fetchAllFilms();
//   };

//   const handleFilterPress = () => {
//     setFilterModalVisible(true);
//   };

//   const handleCloseModal = () => {
//     setFilterModalVisible(false);
//   };

//   const handleMonthSelection = (month: number) => {
//     setMonths((prev) =>
//       prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month]
//     );
//   };

//   const handleYearSelection = (year: number) => {
//     setSelectedYears((prev) =>
//       prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
//     );
//   };

//   const applyFilters = () => {
//     setIsFiltered(true);
//     setFilterModalVisible(false);
//   };

//   const handleClearFilters = () => {
//     setMonths([]);
//     setSelectedYears([]);
//     setIsFiltered(false);
//   };

//   const filteredFilms = films.filter((f) => {
//     if (!f.released) return false;
//     const match = f.released.match(/^(\d{1,2})\s([A-Za-z]{3})\s(\d{4})$/);
//     if (!match) return false;
//     const [, , monthAbbr, yearStr] = match;
//     const monthMap: { [key: string]: number } = {
//       Jan: 1,
//       Feb: 2,
//       Mar: 3,
//       Apr: 4,
//       May: 5,
//       Jun: 6,
//       Jul: 7,
//       Aug: 8,
//       Sep: 9,
//       Oct: 10,
//       Nov: 11,
//       Dec: 12,
//     };
//     const monthIndex = monthMap[monthAbbr];
//     const year = parseInt(yearStr, 10);
//     const monthMatch = months.length === 0 || months.includes(monthIndex);
//     const yearMatch =
//       selectedYears.length === 0 || selectedYears.includes(year);
//     return monthMatch && yearMatch;
//   });

//   return (
//     <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
//       <View style={styles.container}>
//         <HeaderBar
//           navigation={navigation}
//           isSearchActive={isSearchActive}
//           searchText={searchText}
//           onSearchTextChange={setSearchText}
//           onSearchPress={handleSearchPress}
//           onCancelSearch={handleCancelSearch}
//           onSearchSubmit={handleSearchSubmit}
//           onClearSearch={handleClearSearch}
//           onFilterPress={handleFilterPress}
//           isFiltered={isFiltered}
//           onClearFilters={handleClearFilters}
//           isSearchSubmitted={isSearchSubmitted}
//         />
//         <View style={styles.content}>
//           {loading ? (
//             <ActivityIndicator size="large" color="#4DA8DA" />
//           ) : (
//             <FilmList
//               films={isFiltered ? filteredFilms : films}
//               onScroll={handleScroll}
//               listRef={flatListRef}
//             />
//           )}
//         </View>

//         {/* Ensure ScrollIndex is above other views */}
//         <View style={styles.scrollIndexWrapper}>
//           <ScrollIndex
//             scrollOffset={scrollOffset}
//             showDropdown={showDropdown}
//             toggleDropdown={toggleDropdown}
//             scrollToTop={scrollToTop}
//             hideDropdown={hideDropdown}
//           />
//         </View>

//         <FilterModal
//           isVisible={isFilterModalVisible}
//           onClose={handleCloseModal}
//           months={months}
//           handleMonthSelection={handleMonthSelection}
//           applyFilters={applyFilters}
//           clearFilters={handleClearFilters}
//           filteredFilms={films}
//           selectedYears={selectedYears}
//           handleYearSelection={handleYearSelection}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   container: {
//     flex: 1,
//   },
//   content: {
//     flex: 1,
//   },
//   scrollIndexWrapper: {
//     position: "absolute",
//     bottom: 20,
//     right: 20,
//     zIndex: 10,
//   },
// });

// export default HomeScreen;


import React, { useEffect, useState, useRef } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { getFilms, searchFilm, Film } from "../service/film_api";
import FilmList from "../Components/FilmList";
import { HeaderBar } from "../Components/HeaderBar";
import { ScrollIndex } from "../Components/ScrollIndex";
import { SafeAreaView } from "react-native-safe-area-context";
import { FilterModal } from "../Components/FilterModal";

const HomeScreen = ({ navigation }: any) => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [months, setMonths] = useState<number[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false); // Track search submission
  const flatListRef = useRef(null);

  const fetchAllFilms = async () => {
    try {
      setLoading(true);
      const data = await getFilms();
      const uniqueFilms = Array.from(
        new Map(data.map((film) => [film._id, film])).values()
      );
      setFilms(uniqueFilms);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllFilms();
  }, []);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = event.nativeEvent.contentOffset.y;
    //console.log('Scroll Offset:', offset); // ✅ Add this
    setScrollOffset(offset);
  };

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const hideDropdown = () => setShowDropdown(false);

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const handleSearchPress = () => setIsSearchActive(true);

  const handleCancelSearch = () => {
    setIsSearchActive(false);
    setSearchText("");
    setIsSearchSubmitted(false); // Reset search submission
    fetchAllFilms();
  };

  const handleSearchSubmit = async () => {
    if (!searchText.trim()) return;
    try {
      setLoading(true);
      const result = await searchFilm(searchText.trim());
      setFilms([result]);
      setIsSearchActive(false);
      setIsSearchSubmitted(true); // Mark as search submitted
    } catch (error) {
      console.error("Search failed:", error);
      setFilms([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = async () => {
    setSearchText("");
    setIsSearchSubmitted(false); // Reset search submission
    await fetchAllFilms();
  };

  const handleFilterPress = () => {
    setFilterModalVisible(true);
  };

  const handleCloseModal = () => {
    setFilterModalVisible(false);
  };

  const handleMonthSelection = (month: number) => {
    setMonths((prev) =>
      prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month]
    );
  };

  const handleYearSelection = (year: number) => {
    setSelectedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  const applyFilters = () => {
    setIsFiltered(true);
    setFilterModalVisible(false);
  };

  const handleClearFilters = () => {
    setMonths([]);
    setSelectedYears([]);
    setIsFiltered(false);
  };

  const filteredFilms = films.filter((f) => {
    if (!f.released) return false;
    const match = f.released.match(/^(\d{1,2})\s([A-Za-z]{3})\s(\d{4})$/);
    if (!match) return false;
    const [, , monthAbbr, yearStr] = match;
    const monthMap: { [key: string]: number } = {
      Jan: 1,
      Feb: 2,
      Mar: 3,
      Apr: 4,
      May: 5,
      Jun: 6,
      Jul: 7,
      Aug: 8,
      Sep: 9,
      Oct: 10,
      Nov: 11,
      Dec: 12,
    };
    const monthIndex = monthMap[monthAbbr];
    const year = parseInt(yearStr, 10);
    const monthMatch = months.length === 0 || months.includes(monthIndex);
    const yearMatch =
      selectedYears.length === 0 || selectedYears.includes(year);
    return monthMatch && yearMatch;
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <HeaderBar
          navigation={navigation}
          isSearchActive={isSearchActive}
          searchText={searchText}
          onSearchTextChange={setSearchText}
          onSearchPress={handleSearchPress}
          onCancelSearch={handleCancelSearch}
          onSearchSubmit={handleSearchSubmit}
          onClearSearch={handleClearSearch}
          onFilterPress={handleFilterPress}
          isFiltered={isFiltered}
          onClearFilters={handleClearFilters}
          isSearchSubmitted={isSearchSubmitted} // Pass this prop
        />
        <View style={styles.content}>
          {loading ? (
            <ActivityIndicator size="large" color="#4DA8DA" />
          ) : (
            <FilmList
              films={isFiltered ? filteredFilms : films}
              onScroll={handleScroll}
              listRef={flatListRef}
              isSearchSubmitted={isSearchSubmitted} // Pass this prop
            />
          )}
        </View>
        {/* Ensure ScrollIndex is above other views */}
        <View style={styles.scrollIndexWrapper}>
          <ScrollIndex
            scrollOffset={scrollOffset}
            showDropdown={showDropdown}
            toggleDropdown={toggleDropdown}
            scrollToTop={scrollToTop}
            hideDropdown={hideDropdown}
          />
        </View>
        <FilterModal
          isVisible={isFilterModalVisible}
          onClose={handleCloseModal}
          months={months}
          handleMonthSelection={handleMonthSelection}
          applyFilters={applyFilters}
          clearFilters={handleClearFilters}
          filteredFilms={films}
          selectedYears={selectedYears}
          handleYearSelection={handleYearSelection}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollIndexWrapper: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 10,
  },
});

export default HomeScreen;