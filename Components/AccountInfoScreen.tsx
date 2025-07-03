
// AccountInfoScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL, updatePassword } from '../service/film_api'

interface Props {}

const AccountInfoScreen: React.FC<Props> = () => {
  const [userData, setUserData] = useState<any | null>(null);

  useEffect(() => {
    // Fetch user data and token from AsyncStorage
    const getUserData = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
      }
    };

    getUserData();
  }, []);

  // Handle password change using the new function from film_api.ts
  const changeUserPassword = async () => {
    try {
      const newPassword = 'new_password'; // Get this from user input in real scenario
      await updatePassword(newPassword);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {userData && (
        <>
          <Text>First Name: {userData.firstname}</Text>
          <Text>Last Name: {userData.lastname}</Text>
          <Text>Username: {userData.username}</Text>
          <TouchableOpacity onPress={changeUserPassword} style={styles.button}>
            <Text>Change Password</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: '#4DA8DA',
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default AccountInfoScreen;