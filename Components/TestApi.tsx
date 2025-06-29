
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { Buffer } from 'buffer';

// ✅ Ensure Buffer is available globally
global.Buffer = global.Buffer || Buffer;

const TestApi: React.FC = () => {
  const [responseData, setResponseData] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // ✅ Use HTTP version to avoid SSL/port issues in Expo
  const BASE_URL = 'http://pcpdfilm.starsknights.com/api/v2';
  const username = 's244182634';
  const password = '123456789';

  const handleTestApiCall = async () => {
    try {
      console.log('Attempting to log in with:', { username, password });

      const credentials = `${username}:${password}`;
      const encodedCredentials = Buffer.from(credentials).toString('base64');
      console.log('Encoded Credentials:', encodedCredentials);

      const url = `${BASE_URL}/user`;
      console.log('Fetching from:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        console.log('Login Response:', json);
        setResponseData(JSON.stringify(json, null, 2));
        setErrorMessage('');
      } else {
        const errorText = await response.text();
        console.error('Login Error:', response.status, errorText);
        setErrorMessage(`Failed with status: ${response.status} - ${errorText}`);
        setResponseData('');
      }
    } catch (error: any) {
      if (error instanceof TypeError && error.message === 'Network request failed') {
        console.error('Network Request Failed', { message: error.message });
        setErrorMessage('Network request failed. Please check your internet or API server.');
      } else {
        console.error('Error during login:', error);
        setErrorMessage(`Unexpected error: ${JSON.stringify(error, null, 2)}`);
      }
      setResponseData('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Test API Call</Text>
      {errorMessage ? (
        <Text style={styles.error}>{errorMessage}</Text>
      ) : null}
      {responseData ? (
        <Text style={styles.response}>{responseData}</Text>
      ) : null}
      <TouchableOpacity style={styles.button} onPress={handleTestApiCall}>
        <Text style={styles.buttonText}>Test API Call</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 15,
  },
  response: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    textAlign: 'left',
  },
  button: {
    backgroundColor: '#4DA8DA',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  }
});

export default TestApi;
