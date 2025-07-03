// App.tsx

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';

import HomeScreen from './Components/HomeScreen';
import LoginScreen from './Components/LoginScreen';
import UserProfileScreen from './Components/UserProfileScreen';
import FilmDetail from './Components/FilmDetail';
import AddFilmScreen from './Components/AddFilmScreen';

// Define a type for the initial route
type InitialRoute = 'HomeScreen' | 'LoginScreen';

const Stack = createStackNavigator();

const App: React.FC = () => {
  const [initialRoute, setInitialRoute] = useState<InitialRoute | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setInitialRoute(token ? 'HomeScreen' : 'LoginScreen');
      } catch (error) {
        console.error(error);
        // Handle error if necessary
      }
    };
    checkLoginStatus();
  }, []);

  // Show loading indicator while checking the initial route
  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4DA8DA" />
      </View>
    );
  }

  // Render the navigation container with initial route set
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} options={{ title: 'Profile' }} />
        <Stack.Screen name="FilmDetail" component={FilmDetail} options={{ title: 'Film Detail' }} />
        <Stack.Screen name="AddFilmScreen" component={AddFilmScreen} options={{ title: 'Add Film' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;