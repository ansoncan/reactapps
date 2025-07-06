import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./Components/HomeScreen";
import LoginScreen from "./Components/LoginScreen";
import UserProfileScreen from "./Components/UserProfileScreen";
import FilmDetail from "./Components/FilmDetail";

import { AuthProvider } from "./Components/AuthContext";

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerBackTitleVisible: false,
          }}
        >
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false, title: "" }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserProfileScreen"
            component={UserProfileScreen}
            options={{ title: "Account Info" }}
          />
          {/* ... other screens ... */}
          <Stack.Screen
            name="FilmDetail"
            component={FilmDetail}
            options={{ title: "Film Detail" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
