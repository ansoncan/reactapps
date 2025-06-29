// App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Components/HomeScreen'; // Ensure this path is correct
import FilmDetailScreen from './Components/FilmDetail'; // Ensure this path is correct
import LoginScreen from './Components/LoginScreen'; // Ensure this path is correct
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TestApi from './Components/TestApi';

// Define the param list for the stack navigator
export type RootStackParamList = {
  HomeScreen: undefined;
  FilmDetail: undefined;
  LoginScreen: undefined; // Ensure this matches the name used in LoginScreen.tsx
  TestApi: undefined; 
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="HomeScreen" 
            component={HomeScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="FilmDetail" 
            component={FilmDetailScreen} 
            options={{ headerShown: true }} 
          />
          <Stack.Screen 
            name="LoginScreen" 
            component={LoginScreen} 
            options={{ 
              headerShown: true, 
              headerTitle: 'Member Login', // Set the title for the LoginScreen
              headerBackTitle: '', // Set the back button text to an empty string
            }} 
          />

          <Stack.Screen name="TestApi" component={TestApi} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
