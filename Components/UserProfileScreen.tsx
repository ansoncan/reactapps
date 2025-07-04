

// // import React, { useEffect, useState, useContext } from 'react';
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   Button,
// //   Alert,
// //   StyleSheet
// // } from 'react-native';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import Footer from './Footer';
// // import { useNavigation } from '@react-navigation/native';

// // import { fetchUser, updatePassword } from '../service/film_api';
// // import { User, RootParamList } from '../service/film_api';
// // import { AuthContext } from '../Components/AuthContext';

// // const UserProfileScreen = () => {
// //   const [user, setUser] = useState<User | null>(null);
// //   const [newPassword, setNewPassword] = useState('');
// //   const navigation = useNavigation();
// //   const { isAuthenticated, logout } = useContext(AuthContext);

// //   // Redirect to LoginScreen if not authenticated
// //   useEffect(() => {
// //     if (!isAuthenticated) {
// //       navigation.reset({
// //         index: 0,
// //         routes: [{ name: 'LoginScreen' as never }],
// //       });
// //     }
// //   }, [isAuthenticated]);

// //   // Fetch user data
// //   useEffect(() => {
// //     if (isAuthenticated) {
// //       fetchUser()
// //         .then(setUser)
// //         .catch((error) => Alert.alert('Error', error.message));
// //     }
// //   }, [isAuthenticated]);

// //   const handleLogout = async () => {
// //     Alert.alert('Confirm Logout', 'Are you sure you want to logout?', [
// //       { text: 'Cancel', style: 'cancel' },
// //       {
// //         text: 'Logout',
// //         onPress: async () => {
// //           await AsyncStorage.removeItem('token');
// //           await AsyncStorage.removeItem('user');
// //           await logout();
// //           navigation.reset({
// //             index: 0,
// //             routes: [{ name: 'LoginScreen' as never }],
// //           });
// //         },
// //       },
// //     ]);
// //   };

// //   return (
// //     <View style={styles.container}>
// //       {user ? (
// //         <>
// //                    <Text>First Name: {user.firstname}</Text>
// //           <Text>Last Name: {user.lastname}</Text>
// //           <TextInput
// //             placeholder="New Password"
// //             value={newPassword}
// //             onChangeText={setNewPassword}
// //             secureTextEntry
// //             style={styles.input}
// //           />
// //           <Button
// //             title="Change Password"
// //             onPress={() =>
// //               updatePassword(newPassword).catch((error) =>
// //                 Alert.alert('Error', error.message)
// //               )
// //             }
// //           />
// //           <Button title="Logout" onPress={handleLogout} color="red" />
// //         </>
// //       ) : (
// //         <Text>Loading user data...</Text>
// //       )}
// //       <Footer />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: { padding: 20 },
// //   title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
// //   input: { borderWidth: 1, padding: 10, marginVertical: 10 },
// // });

// // export default UserProfileScreen;

// import React, { useEffect, useState, useContext } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   Alert,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   TouchableOpacity
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Footer from './Footer';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Ionicons';

// import { fetchUser, updatePassword } from '../service/film_api';
// import { User } from '../service/film_api';
// import { AuthContext } from '../Components/AuthContext';

// const UserProfileScreen = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const navigation = useNavigation();
//   const { isAuthenticated, logout } = useContext(AuthContext);

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigation.reset({
//         index: 0,
//         routes: [{ name: 'LoginScreen' as never }],
//       });
//     }
//   }, [isAuthenticated]);

//   useEffect(() => {
//     if (isAuthenticated) {
//       fetchUser()
//         .then(setUser)
//         .catch((error) => Alert.alert('Error', error.message));
//     }
//   }, [isAuthenticated]);

//   const handleLogout = async () => {
//     Alert.alert('Confirm Logout', 'Are you sure you want to logout?', [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Logout',
//         onPress: async () => {
//           await AsyncStorage.removeItem('token');
//           await AsyncStorage.removeItem('user');
//           await logout();
//           navigation.reset({
//             index: 0,
//             routes: [{ name: 'LoginScreen' as never }],
//           });
//         },
//       },
//     ]);
//   };

//   const handleChangePassword = () => {
//     if (!newPassword || !confirmPassword) {
//       Alert.alert('Error', 'Please fill in both password fields.');
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match.');
//       return;
//     }

//     Alert.alert('Confirm', 'Are you sure you want to change your password?', [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Yes',
//         onPress: () => {
//           updatePassword(newPassword)
//             .then(() => {
//               Alert.alert('Success', 'Password updated successfully.');
//               setNewPassword('');
//               setConfirmPassword('');
//             })
//             .catch((error) => Alert.alert('Error', error.message));
//         },
//       },
//     ]);
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.wrapper}
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//     >
//       <ScrollView contentContainerStyle={styles.container}>
//         {user ? (
//           <>
//             <Text style={styles.title}>User Profile</Text>
//             <Text style={styles.label}>First Name: {user.firstname}</Text>
//             <Text style={styles.label}>Last Name: {user.lastname}</Text>

//             <View style={styles.passwordContainer}>
//               <TextInput
//                 placeholder="New Password"
//                 value={newPassword}
//                 onChangeText={setNewPassword}
//                 secureTextEntry={!showNewPassword}
//                 style={styles.input}
//               />
//               <TouchableOpacity
//                 style={styles.eyeIcon}
//                 onPress={() => setShowNewPassword(!showNewPassword)}
//               >
//                 <Icon name={showNewPassword ? 'eye-off' : 'eye'} size={24} />
//               </TouchableOpacity>
//             </View>

//             <View style={styles.passwordContainer}>
//               <TextInput
//                 placeholder="Confirm New Password"
//                 value={confirmPassword}
//                 onChangeText={setConfirmPassword}
//                 secureTextEntry={!showConfirmPassword}
//                 style={styles.input}
//               />
//               <TouchableOpacity
//                 style={styles.eyeIcon}
//                 onPress={() => setShowConfirmPassword(!showConfirmPassword)}
//               >
//                 <Icon name={showConfirmPassword ? 'eye-off' : 'eye'} size={24} />
//               </TouchableOpacity>
//             </View>

//             <Button title="Change Password" onPress={handleChangePassword} />
//             <View style={styles.logoutButton}>
//               <Button title="Logout" onPress={handleLogout} color="red" />
//             </View>
//           </>
//         ) : (
//           <Text>Loading user data...</Text>
//         )}
//       </ScrollView>
//       <Footer />
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   wrapper: {
//     flex: 1,
//   },
//   container: {
//     padding: 20,
//     flexGrow: 1,
//     justifyContent: 'space-between',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: '600',
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     marginBottom: 15,
//     paddingHorizontal: 10,
//   },
//   input: {
//     flex: 1,
//     paddingVertical: 12,
//   },
//   eyeIcon: {
//     padding: 8,
//   },
//   logoutButton: {
//     marginTop: 20,
//   },
// });

// export default UserProfileScreen;
import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from './Footer';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { fetchUser, updatePassword } from '../service/film_api';
import { User } from '../service/film_api';
import { AuthContext } from '../Components/AuthContext';

const UserProfileScreen = () => {
  const [user, setUser] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigation = useNavigation();
  const { isAuthenticated, logout } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' as never }],
      });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUser()
        .then(setUser)
        .catch((error) => Alert.alert('Error', error.message));
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    Alert.alert('Confirm Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: async () => {
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('user');
          await logout();
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' as never }],
          });
        },
      },
    ]);
  };

  const handleChangePassword = () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in both password fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

   // Confirm alert dialog
    Alert.alert('Confirm', 'Are you sure you want to change your password?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Yes',
        onPress: () => {
          updatePassword(newPassword)
            .then(() => {
              Alert.alert('Success', 'Password updated successfully.');
              setNewPassword('');
              setConfirmPassword('');
            })
            .catch((error) => Alert.alert('Error', error.message));
        },
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>User Profile</Text>

        {user ? (
          <View style={styles.card}>
            <Text style={styles.label}>First Name: {user.firstname}</Text>
            <Text style={styles.label}>Last Name: {user.lastname}</Text>

            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNewPassword}
                style={styles.input}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowNewPassword(!showNewPassword)}
              >
                <Icon name={showNewPassword ? 'eye-off' : 'eye'} size={24} />
              </TouchableOpacity>
            </View>

            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                style={styles.input}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Icon name={showConfirmPassword ? 'eye-off' : 'eye'} size={24} />
              </TouchableOpacity>
            </View>

            <View style={styles.button}>
              <Button title="Change Password" onPress={handleChangePassword} />
            </View>
            <View style={styles.button}>
              <Button title="Logout" onPress={handleLogout} color="red" />
            </View>
          </View>
        ) : (
          <Text style={styles.label}>Loading user data...</Text>
        )}
      </ScrollView>
      <Footer />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  container: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    padding: 8,
  },
  button: {
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default UserProfileScreen;