// film_api.ts

import AsyncStorage from '@react-native-async-storage/async-storage';

export const BASE_URL = 'http://pcpdfilm.starsknights.com/api/v2';

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


export const loginUser = async (username: string, password: string) => {
  try {
    const credentials = btoa(`${username}:${password}`);

    // Create a fetch request with timeout
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 5000); // Timeout after 5 seconds

    const res = await fetch(`${BASE_URL}/user`, {
      headers: { Authorization: `Basic ${credentials}` },
      signal: controller.signal,
    });

    clearTimeout(id);

    console.log('Response Status:', res.status); // Log the response status

    if (res.status === 401) {
      throw new Error('Authentication failed'); // Throw error for 401
    }

    if (!res.ok) {
      throw new Error('Login failed');
    }

    const { key } = await res.json();

    const userRes = await fetch(`${BASE_URL}/user/detail`, {
      headers: { k: key },
    });

    if (!userRes.ok) {
      throw new Error('Failed to retrieve user details');
    }

    const user = await userRes.json();

    // Only save after both requests succeed
    await AsyncStorage.setItem('token', key);
    await AsyncStorage.setItem('user', JSON.stringify(user));

    return { key, user };
  } catch (error) {
    const typedError = error as Error;

    if (typedError.name === 'AbortError') {
      throw new Error('Request timed out');
    }

    throw new Error(typedError.message || 'Authentication failed');
  }
};




export const fetchUser = async (): Promise<User> => {
  const token = await AsyncStorage.getItem('token');
  if (!token) throw new Error('Token is missing');

  const response = await fetch(`${BASE_URL}/user/detail`, {
    headers: { k: token },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch user data: ${errorText}`);
  }

  const user = await response.json();

  // Save user details in AsyncStorage
  await AsyncStorage.setItem('user', JSON.stringify(user));

  return user;
};

export const updatePassword = async (newPassword: string): Promise<boolean> => {
  const token = await AsyncStorage.getItem('token');
  const user = await fetchUser();

  if (!token || !user) throw new Error('Token or user data is missing');

  const updatedUser = {
    ...user,
    password: newPassword,
  };

  const response = await fetch(`${BASE_URL}/user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      k: token,
    },
    body: JSON.stringify(updatedUser),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to change password: ${errorText}`);
  }

  const json = await response.json();
  console.log('Full response after password update:', json);

  if (json.key) {
    await AsyncStorage.setItem('token', json.key);
    return true;
  } else {
    console.warn('No new token received after password update.');
    return false;
  }
};

export const getFilms = async (): Promise<Film[]> => {
  const res = await fetch(`${BASE_URL}/films`);
  const films = await res.json();
  return films;
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

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error('Failed to add film');
  }

  const result = await res.json();
  return result;
};

// export const searchFilm = async (title: string): Promise<Film> => {
//   const response = await fetch(`${BASE_URL}/ofilm/${title}`);
//   if (!response.ok) {
//     const errorText = await response.text();
//     throw new Error('Failed to fetch film data');
//   }
//   const film = await response.json();
//   return film;
// };

export const searchFilm = async (title: string): Promise<Film> => {
  const response = await fetch(`${BASE_URL}/ofilm/${title}`);

  console.log('SearchFilm Response Status:', response.status);

  const responseText = await response.text();
  console.log('SearchFilm Response Body:', responseText);

  if (!response.ok) {
    throw new Error('Failed to fetch film data');
  }

  const film = JSON.parse(responseText);
  return film;
};


export const submitFilm = async (film: Film): Promise<void> => {
  const token = await AsyncStorage.getItem('token');
  if (!token) throw new Error('Token is missing');

  console.log('Submitting film:', film);
  console.log('Token:', token);

  const response = await fetch(`${BASE_URL}/film`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      k: token,
    },
    body: JSON.stringify(film),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Server response:', errorText);
    throw new Error(`Failed to add film: ${errorText}`);
  }
};


export const handleLogout = async () => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('user');
};
