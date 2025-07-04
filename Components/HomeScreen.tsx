

// // Screens/HomeScreen.tsx

// import React, { useEffect, useState, useRef } from 'react';
// import { View, ActivityIndicator, StyleSheet, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
// import { getFilms, Film } from '../service/film_api';
// import FilmList from '../Components/FilmList';
// import Footer from '../Components/Footer';
// import { HeaderBar } from '../Components/HeaderBar';
// import { ScrollIndex } from '../Components/ScrollIndex';

// const HomeScreen = ({ navigation }: any) => {
//   const [films, setFilms] = useState<Film[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [scrollOffset, setScrollOffset] = useState(0);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const flatListRef = useRef(null);

//   useEffect(() => {
//     const fetchFilms = async () => {
//       try {
//         const data = await getFilms();
//         const uniqueFilms = Array.from(new Map(data.map(film => [film._id, film])).values());
//         setFilms(uniqueFilms);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFilms();
//   }, []);

//   const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
//     setScrollOffset(event.nativeEvent.contentOffset.y);
//   };

//   const toggleDropdown = () => setShowDropdown(prev => !prev);
//   const hideDropdown = () => setShowDropdown(false);
//   const scrollToTop = () => {
//     flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
//   };

//   return (
//     <View style={styles.container}>
//       <HeaderBar navigation={navigation} />
//       {loading ? (
//         <ActivityIndicator size="large" color="#4DA8DA" />
//       ) : (
//         <FilmList
//           films={films}
//           onScroll={handleScroll}
//           listRef={flatListRef}
//           footer={<Footer />}
//         />
//       )}
//       <ScrollIndex
//         scrollOffset={scrollOffset}
//         showDropdown={showDropdown}
//         toggleDropdown={toggleDropdown}
//         scrollToTop={scrollToTop}
//         hideDropdown={hideDropdown}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingTop: 50,
//     paddingHorizontal: 16,
//   },
// });

// export default HomeScreen;
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
} from 'react-native';
import { getFilms, Film } from '../service/film_api';
import FilmList from '../Components/FilmList';
import Footer from '../Components/Footer';
import { HeaderBar } from '../Components/HeaderBar';
import { ScrollIndex } from '../Components/ScrollIndex';

const HomeScreen = ({ navigation }: any) => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const data = await getFilms();
        const uniqueFilms = Array.from(new Map(data.map(film => [film._id, film])).values());
        setFilms(uniqueFilms);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFilms();
  }, []);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };

  const toggleDropdown = () => setShowDropdown(prev => !prev);
  const hideDropdown = () => setShowDropdown(false);
  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  return (
    <View style={styles.container}>
      <HeaderBar navigation={navigation} />
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#4DA8DA" />
        ) : (
          <FilmList
            films={films}
            onScroll={handleScroll}
            listRef={flatListRef}
          />
        )}
      </View>
      <Footer />
      <ScrollIndex
        scrollOffset={scrollOffset}
        showDropdown={showDropdown}
        toggleDropdown={toggleDropdown}
        scrollToTop={scrollToTop}
        hideDropdown={hideDropdown}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
    marginBottom: 0, // leave space for footer
  },
});

export default HomeScreen;
