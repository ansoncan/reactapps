import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Compontents/HomeScreen';
import FilmDetailScreen from './Compontents/FilmDetail';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="FilmDetail" component={FilmDetailScreen} />
      </Stack.Navigator> */}

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
</Stack.Navigator>

    </NavigationContainer>
  );
}

export default App;