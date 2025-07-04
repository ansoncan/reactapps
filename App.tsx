import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './Components/HomeScreen';
import LoginScreen from './Components/LoginScreen';
import UserProfileScreen from './Components/UserProfileScreen';
import FilmDetail from './Components/FilmDetail';
import AddFilmScreen from './Components/AddFilmScreen';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserProfileScreen"
          component={UserProfileScreen}
          options={{ title: 'Profile' }}
        />
        <Stack.Screen
          name="FilmDetail"
          component={FilmDetail}
          options={{ title: 'Film Detail' }}
        />
        <Stack.Screen
          name="AddFilmScreen"
          component={AddFilmScreen}
          options={{ title: 'Add Film' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
