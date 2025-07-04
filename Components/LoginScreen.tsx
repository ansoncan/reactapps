
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from '../service/film_api';
import Footer from './Footer';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from './AuthContext';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);


const handleLogin = async () => {
  try {
    const { key } = await loginUser(username, password);
    await login(key);
    navigation.reset({ index: 0, routes: [{ name: 'HomeScreen' }] });
  } catch (error) {
    setErrorMessage(error instanceof Error ? error.message : 'Login failed');
  }
};


  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.content}>
          <Image source={require('../assets/fs_logo.png')} style={styles.logo} />
          <Text style={styles.title}>Welcome Back</Text>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            autoCapitalize="none"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={styles.passwordInput}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon name={showPassword ? 'eye-off' : 'eye'} size={24} color="#888" />
            </TouchableOpacity>
          </View>
          {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <Footer />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, paddingHorizontal: 30, justifyContent: 'space-between' },
  content: { alignItems: 'center' },
  logo: { width: 240, height: 240, marginBottom: 10, resizeMode: 'contain' },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 30, color: '#333' },
  input: {
    width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 10,
    padding: 12, marginBottom: 15, backgroundColor: '#f9f9f9',
  },
  passwordContainer: {
    flexDirection: 'row', alignItems: 'center', borderWidth: 1,
    borderColor: '#ccc', borderRadius: 10, paddingHorizontal: 12,
    backgroundColor: '#f9f9f9', marginBottom: 15, width: '100%',
  },
  passwordInput: { flex: 1, paddingVertical: 12 },
  button: {
    width: '100%', backgroundColor: '#4DA8DA', padding: 15,
    borderRadius: 10, alignItems: 'center', marginTop: 10,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  error: { color: 'red', marginBottom: 10, textAlign: 'center' },
});

export default LoginScreen;
