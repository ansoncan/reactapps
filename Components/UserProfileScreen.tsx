// Components/UserProfileScreen.tsx (1-74)
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from './Footer';
import { useNavigation } from '@react-navigation/native';

// Import the functions and types from film_api.ts
import { fetchUser, updatePassword } from '../service/film_api';
import { User, RootParamList } from '../service/film_api'; // Import the User type

const UserProfileScreen = () => {
  const [user, setUser] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const navigation = useNavigation<{ key: keyof RootParamList }>();

  // Fetch user data when component mounts
  useEffect(() => {
    fetchUser().then(setUser).catch((error) => Alert.alert('Error', error.message));
  }, []);

  const handleLogout = async () => {
    Alert.alert('Confirm Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: async () => {
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('user');
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' as keyof RootParamList }],
          });
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.title}>User Profile</Text>
          <Text>Username: {user.username}</Text>
          <Text>First Name: {user.firstname}</Text>
          <Text>Last Name: {user.lastname}</Text>
          <TextInput
            placeholder="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            style={styles.input}
          />
          <Button
            title="Change Password"
            onPress={() => updatePassword(newPassword).catch((error) => Alert.alert('Error', error.message))}
          />
          <Button title="Logout" onPress={handleLogout} color="red" />
        </>
      ) : (
        <Text>Loading user data...</Text>
      )}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10 },
});

export default UserProfileScreen;