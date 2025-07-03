// film_api.ts

import AsyncStorage from '@react-native-async-storage/async-storage';

export const BASE_URL = 'http://pcpdfilm.starsknights.com/api/v2';

// Define type for a Film object if it's known
export type Film = {
  _id: string;
  title: string;
  poster?: string | null;
  year?: string;
  released?: string;
  runtime?: number;
  language?: string;
  genre?: string;
  director?: string;
};

export type User = {
  username: string;
  firstname: string;
  lastname: string;
};

export type RootParamList = {
  LoginScreen: undefined;
  UserProfileScreen: undefined;
  // Add other screens here
};

export const loginUser = async (username: string, password: string) => {
  const credentials = btoa(`${username}:${password}`);
  const res = await fetch(`${BASE_URL}/user`, {
    headers: { Authorization: `Basic ${credentials}` },
  });
  if (!res.ok) throw new Error('Invalid credentials');
  const { key } = await res.json();

  // Fetch user detail using the received key
  const userRes = await fetch(`${BASE_URL}/user/detail`, {
    headers: { k: key },
  });

  // Parse JSON response to get user details
  const user = await userRes.json();
  return { key, user };
};

export const fetchUser = async (): Promise<any> => {
  const token = await AsyncStorage.getItem('token');
  if (!token) throw new Error('Token is missing');

  try {
    const response = await fetch(`${BASE_URL}/user/detail`, {
      headers: { k: token },
    });
    if (response.ok) {
      return await response.json() as User;
    } else {
      throw new Error(`Failed to fetch user data: ${await response.text()}`);
    }
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error for handling in the calling function
  }
};

export const updatePassword = async (newPassword: string): Promise<void> => {
  const token = await AsyncStorage.getItem('token');
  if (!token) throw new Error('Token is missing');

  try {
    const response = await fetch(`${BASE_URL}/user`, {
      method: 'PUT',
      headers: { k: token },
      body: JSON.stringify({ password: newPassword }),
    });

    if (response.ok) {
      // Refresh the token or re-authenticate
      const json = await response.json();
      await AsyncStorage.setItem('token', json.key);
      alert('Password changed successfully');
    } else {
      throw new Error(`Failed to change password: ${await response.text()}`);
    }
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error for handling in the calling function
  }
};

export const getFilms = async (): Promise<Film[]> => {
  const res = await fetch(`${BASE_URL}/films`);
  return res.json();
};

export const addFilm = async (film: Film) => {
  const token = await AsyncStorage.getItem('token');
  if (!token) throw new Error('Token is missing');

  const res = await fetch(`${BASE_URL}/film`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      k: token,
    },
    body: JSON.stringify(film),
  });
  if (!res.ok) throw new Error('Failed to add film');
  return res.json();
};

export const searchFilm = async (title: string): Promise<Film> => {
  const response = await fetch(`${BASE_URL}/ofilm/${title}`);
  if (!response.ok) throw new Error('Failed to fetch film data');
  return response.json();
};

export const submitFilm = async (film: Film): Promise<void> => {
  const token = await AsyncStorage.getItem('token');
  if (!token) throw new Error('Token is missing');

  const response = await fetch(`${BASE_URL}/film`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      k: token,
    },
    body: JSON.stringify(film),
  });
  if (!response.ok) throw new Error('Failed to add film');
};

export const handleLogout = async () => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('user');
};