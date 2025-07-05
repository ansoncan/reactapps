// // // film_api.ts

// // import AsyncStorage from '@react-native-async-storage/async-storage';

// // export const BASE_URL = 'http://pcpdfilm.starsknights.com/api/v2';

// // // Define type for a Film object if it's known
// // export type Film = {
// //   _id: string;
// //   title: string;
// //   poster?: string | null;
// //   year?: string;
// //   released?: string;
// //   runtime?: number;
// //   language?: string;
// //   genre?: string;
// //   director?: string;
// // };

// // export type User = {
// //   username: string;
// //   firstname: string;
// //   lastname: string;
// // };

// // export type RootParamList = {
// //   LoginScreen: undefined;
// //   UserProfileScreen: undefined;
// //   // Add other screens here
// // };

// // export const loginUser = async (username: string, password: string) => {
// //   const credentials = btoa(`${username}:${password}`);
// //   const res = await fetch(`${BASE_URL}/user`, {
// //     headers: { Authorization: `Basic ${credentials}` },
// //   });
// //   if (!res.ok) throw new Error('Invalid credentials');
// //   const { key } = await res.json();

// //   // Fetch user detail using the received key
// //   const userRes = await fetch(`${BASE_URL}/user/detail`, {
// //     headers: { k: key },
// //   });

// //   // Parse JSON response to get user details
// //   const user = await userRes.json();
// //   return { key, user };
// // };

// // export const fetchUser = async (): Promise<any> => {
// //   const token = await AsyncStorage.getItem('token');
// //   if (!token) throw new Error('Token is missing');

// //   try {
// //     const response = await fetch(`${BASE_URL}/user/detail`, {
// //       headers: { k: token },
// //     });
// //     if (response.ok) {
// //       return await response.json() as User;
// //     } else {
// //       throw new Error(`Failed to fetch user data: ${await response.text()}`);
// //     }
// //   } catch (error) {
// //     console.error(error);
// //     throw error; // Re-throw the error for handling in the calling function
// //   }
// // };

// // export const updatePassword = async (newPassword: string): Promise<void> => {
// //   const token = await AsyncStorage.getItem('token');
// //   if (!token) throw new Error('Token is missing');

// //   try {
// //     const response = await fetch(`${BASE_URL}/user`, {
// //       method: 'PUT',
// //       headers: { k: token },
// //       body: JSON.stringify({ password: newPassword }),
// //     });

// //     if (response.ok) {
// //       // Refresh the token or re-authenticate
// //       const json = await response.json();
// //       await AsyncStorage.setItem('token', json.key);
// //       alert('Password changed successfully');
// //     } else {
// //       throw new Error(`Failed to change password: ${await response.text()}`);
// //     }
// //   } catch (error) {
// //     console.error(error);
// //     throw error; // Re-throw the error for handling in the calling function
// //   }
// // };

// // export const getFilms = async (): Promise<Film[]> => {
// //   const res = await fetch(`${BASE_URL}/films`);
// //   return res.json();
// // };

// // export const addFilm = async (film: Film) => {
// //   const token = await AsyncStorage.getItem('token');
// //   if (!token) throw new Error('Token is missing');

// //   const res = await fetch(`${BASE_URL}/film`, {
// //     method: 'POST',
// //     headers: {
// //       'Content-Type': 'application/json',
// //       k: token,
// //     },
// //     body: JSON.stringify(film),
// //   });
// //   if (!res.ok) throw new Error('Failed to add film');
// //   return res.json();
// // };

// // export const searchFilm = async (title: string): Promise<Film> => {
// //   const response = await fetch(`${BASE_URL}/ofilm/${title}`);
// //   if (!response.ok) throw new Error('Failed to fetch film data');
// //   return response.json();
// // };

// // export const submitFilm = async (film: Film): Promise<void> => {
// //   const token = await AsyncStorage.getItem('token');
// //   if (!token) throw new Error('Token is missing');

// //   const response = await fetch(`${BASE_URL}/film`, {
// //     method: 'POST',
// //     headers: {
// //       'Content-Type': 'application/json',
// //       k: token,
// //     },
// //     body: JSON.stringify(film),
// //   });
// //   if (!response.ok) throw new Error('Failed to add film');
// // };

// // export const handleLogout = async () => {
// //   await AsyncStorage.removeItem('token');
// //   await AsyncStorage.removeItem('user');
// // };

// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const BASE_URL = 'http://pcpdfilm.starsknights.com/api/v2';

// export type Film = {
//   _id: string;
//   title: string;
//   poster?: string | null;
//   year?: string;
//   released?: string;
//   runtime?: number;
//   language?: string;
//   genre?: string;
//   director?: string;
// };

// export type User = {
//   username: string;
//   firstname: string;
//   lastname: string;
// };

// export const loginUser = async (username: string, password: string) => {
//   const credentials = btoa(`${username}:${password}`);
//   const res = await fetch(`${BASE_URL}/user`, {
//     headers: { Authorization: `Basic ${credentials}` },
//   });
//   if (!res.ok) throw new Error('Invalid credentials');
//   const { key } = await res.json();

//   const userRes = await fetch(`${BASE_URL}/user/detail`, {
//     headers: { k: key },
//   });

//   const user = await userRes.json();
//   return { key, user };
// };

// export const fetchUser = async (): Promise<User> => {
//   const token = await AsyncStorage.getItem('token');
//   if (!token) throw new Error('Token is missing');

//   const response = await fetch(`${BASE_URL}/user/detail`, {
//     headers: { k: token },
//   });

//   if (!response.ok) {
//     throw new Error(`Failed to fetch user data: ${await response.text()}`);
//   }

//   return await response.json();
// };

// export const updatePassword = async (newPassword: string): Promise<void> => {
//   const token = await AsyncStorage.getItem('token');
//   const user = await fetchUser();

//   if (!token || !user) throw new Error('Token or user data is missing');

//   const updatedUser = {
//     ...user,
//     password: newPassword,
//   };

//   const response = await fetch(`${BASE_URL}/user`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       k: token,
//     },
//     body: JSON.stringify(updatedUser),
//   });

//   if (!response.ok) {
//     throw new Error(`Failed to change password: ${await response.text()}`);
//   }

//   const json = await response.json();
//   await AsyncStorage.setItem('token', json.key);
// };

// export const getFilms = async (): Promise<Film[]> => {
//   const res = await fetch(`${BASE_URL}/films`);
//   return res.json();
// };

// export const addFilm = async (film: Film) => {
//   const token = await AsyncStorage.getItem('token');
//   if (!token) throw new Error('Token is missing');

//   const res = await fetch(`${BASE_URL}/film`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       k: token,
//     },
//     body: JSON.stringify(film),
//   });
//   if (!res.ok) throw new Error('Failed to add film');
//   return res.json();
// };

// export const searchFilm = async (title: string): Promise<Film> => {
//   const response = await fetch(`${BASE_URL}/ofilm/${title}`);
//   if (!response.ok) throw new Error('Failed to fetch film data');
//   return response.json();
// };

// export const submitFilm = async (film: Film): Promise<void> => {
//   const token = await AsyncStorage.getItem('token');
//   if (!token) throw new Error('Token is missing');

//   const response = await fetch(`${BASE_URL}/film`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       k: token,
//     },
//     body: JSON.stringify(film),
//   });
//   if (!response.ok) throw new Error('Failed to add film');
// };

// export const handleLogout = async () => {
//   await AsyncStorage.removeItem('token');
//   await AsyncStorage.removeItem('user');
// };


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
  console.log('Logging in user:', username);
  const credentials = btoa(`${username}:${password}`);
  const res = await fetch(`${BASE_URL}/user`, {
    headers: { Authorization: `Basic ${credentials}` },
  });
  console.log('Login response status:', res.status);
  if (!res.ok) throw new Error('Invalid credentials');
  const { key } = await res.json();
  console.log('Received key:', key);

  const userRes = await fetch(`${BASE_URL}/user/detail`, {
    headers: { k: key },
  });
  console.log('User detail response status:', userRes.status);
  const user = await userRes.json();
  console.log('Fetched user:', user);
  return { key, user };
};

export const fetchUser = async (): Promise<User> => {
  const token = await AsyncStorage.getItem('token');
  console.log('Fetched token from storage:', token);
  if (!token) throw new Error('Token is missing');

  const response = await fetch(`${BASE_URL}/user/detail`, {
    headers: { k: token },
  });
  console.log('Fetch user response status:', response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error fetching user:', errorText);
    throw new Error(`Failed to fetch user data: ${errorText}`);
  }

  const user = await response.json();
  console.log('Fetched user data:', user);
  return user;
};

export const updatePassword = async (newPassword: string): Promise<void> => {
  const token = await AsyncStorage.getItem('token');
  console.log('Token for password update:', token);
  const user = await fetchUser();
  console.log('User data for password update:', user);

  if (!token || !user) throw new Error('Token or user data is missing');

  const updatedUser = {
    ...user,
    password: newPassword,
  };
  console.log('Updated user payload:', updatedUser);

  const response = await fetch(`${BASE_URL}/user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      k: token,
    },
    body: JSON.stringify(updatedUser),
  });
  console.log('Update password response status:', response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error updating password:', errorText);
    throw new Error(`Failed to change password: ${errorText}`);
  }

  const json = await response.json();
  console.log('New token after password update:', json.key);
  await AsyncStorage.setItem('token', json.key);
};

export const getFilms = async (): Promise<Film[]> => {
  console.log('Fetching films...');
  const res = await fetch(`${BASE_URL}/films`);
  console.log('Get films response status:', res.status);
  const films = await res.json();
  // console.log('Fetched films:', films);
  return films;
};

export const addFilm = async (film: Film) => {
  const token = await AsyncStorage.getItem('token');
  console.log('Token for adding film:', token);
  if (!token) throw new Error('Token is missing');

  console.log('Adding film:', film);
  const res = await fetch(`${BASE_URL}/film`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      k: token,
    },
    body: JSON.stringify(film),
  });
  console.log('Add film response status:', res.status);
  if (!res.ok) {
    const errorText = await res.text();
    console.error('Error adding film:', errorText);
    throw new Error('Failed to add film');
  }
  const result = await res.json();
  console.log('Added film response:', result);
  return result;
};

export const searchFilm = async (title: string): Promise<Film> => {
  console.log('Searching for film with title:', title);
  const response = await fetch(`${BASE_URL}/ofilm/${title}`);
  console.log('Search film response status:', response.status);
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error searching film:', errorText);
    throw new Error('Failed to fetch film data');
  }
  const film = await response.json();
  console.log('Found film:', film);
  return film;
};

export const submitFilm = async (film: Film): Promise<void> => {
  const token = await AsyncStorage.getItem('token');
  console.log('Token for submitting film:', token);
  if (!token) throw new Error('Token is missing');

  console.log('Submitting film:', film);
  const response = await fetch(`${BASE_URL}/film`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      k: token,
    },
    body: JSON.stringify(film),
  });
  console.log('Submit film response status:', response.status);
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error submitting film:', errorText);
    throw new Error('Failed to add film');
  }
};

export const handleLogout = async () => {
  console.log('Logging out...');
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('user');
  console.log('Logout complete.');
};
