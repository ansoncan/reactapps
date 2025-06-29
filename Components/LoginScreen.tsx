import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type LoginScreenRouteProp = RouteProp<RootStackParamList, 'LoginScreen'>;

type Props = {
  route: LoginScreenRouteProp;
  navigation: any; // Add navigation prop type
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Set base URL for API requests
  const BASE_URL = 'https://pcpdfilm.starsknights.com:18888/api/v2'; // Change to 'https://' if supported

  // Set navigation header options
  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Member Login',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIcon}>
          <MaterialIcons name="chevron-left" size={28} color="#bcbcbc" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleLogin = async () => {
    try {
      console.log('Attempting to log in with:', { username, password });

      // Create credentials and encode them for Basic Authentication
      const credentials = `${username}:${password}`;
      const encodedCredentials = btoa(credentials);
      console.log('Encoded Credentials:', encodedCredentials);

      // Login request with Basic Authorization header using fetch
      const response = await fetch(`${BASE_URL}/user`, {
        method: 'GET',
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
        },
      });

      console.log('Login Response Status:', response.status);
      console.log('Login Response Headers:', response.headers);

      if (response.ok) {
        const data = await response.json();
        console.log('Login Response Data:', data);

        // Save token to AsyncStorage
        const k = data.k;
        await AsyncStorage.setItem('token', k);

        // Get user details request with key (k) in headers using fetch
        const userDetailsResponse = await fetch(`${BASE_URL}/user/detail`, {
          method: 'GET',
          headers: {
            'k': k,
          },
        });

        console.log('User  Details Response Status:', userDetailsResponse.status);
        console.log('User  Details Response Headers:', userDetailsResponse.headers);

        if (userDetailsResponse.ok) {
          const userData = await userDetailsResponse.json();
          console.log('User  Details Response Data:', userData);

          // Save user data to AsyncStorage
          await AsyncStorage.setItem('user', JSON.stringify(userData));

          // Navigate to HomeScreen
          navigation.navigate('HomeScreen');
        } else {
          const userDetailsError = await userDetailsResponse.text();
          console.error('User  Details Error:', userDetailsResponse.status, userDetailsError);
          setErrorMessage('Failed to fetch user details. Please try again later.');
        }
      } else {
        const loginError = await response.text();
        console.error('Login Error:', response.status, loginError);
        setErrorMessage('Invalid credentials or login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/fs_logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={secureTextEntry}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setSecureTextEntry(!secureTextEntry)}
        >
          <Icon name={secureTextEntry ? 'eye-off' : 'eye'} size={20} />
        </TouchableOpacity>
      </View>
      {errorMessage !== '' && (
        <Text style={styles.error}>{errorMessage}</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* New Button to Navigate to TestApi Screen */}
      <TouchableOpacity
        style={[styles.button, styles.testButton]}
        onPress={() => navigation.navigate('TestApi')}
      >
        <Text style={styles.buttonText}>Go to API Test</Text>
      </TouchableOpacity>




    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4DA8DA',
    borderRadius: 8,
    paddingVertical: 14,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  headerIcon: {
    marginLeft: 15,
  },
});

export default LoginScreen;
