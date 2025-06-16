import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Compontents/HomeScreen';
import FilmDetailScreen from './Compontents/FilmDetail';
import SearchScreen from './Compontents/SearchScreen';
import LoginScreen from './Compontents/LoginScreen';
import AnimatedLabel from './Compontents/AnimatedLabel';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="FilmDetail" component={FilmDetailScreen} />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="FilmDetail" component={FilmDetailScreen} />
    </Stack.Navigator>
  );
}

function LoginStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = '';
            let label = '';

            if (route.name === 'Film Store') {
              iconName = focused ? 'home' : 'home-outline';
              label = 'Home';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
              label = 'Search';
            } else if (route.name === 'Login') {
              iconName = focused ? 'log-in' : 'log-in-outline';
              label = 'Login';
            }

            return (
              <View style={{ alignItems: 'center', justifyContent: 'center', width: 70, height: 50 }}>
                <Ionicons name={iconName} size={24} color={color} />
                <AnimatedLabel label={label} focused={focused} />
              </View>
            );
          },
        })}
      >
        <Tab.Screen name="Film Store" component={HomeStack} />
        <Tab.Screen name="Search" component={SearchStack} />
        <Tab.Screen name="Login" component={LoginStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
