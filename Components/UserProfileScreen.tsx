import React, { useEffect, useState, useContext } from "react";
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
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "./Footer";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

import { fetchUser, updatePassword } from "../service/film_api";
import { User } from "../service/film_api";
import { AuthContext } from "../Components/AuthContext";

const UserProfileScreen = () => {
  const [user, setUser] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigation = useNavigation();
  const { isAuthenticated, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchAndStoreUser = async () => {
      if (isAuthenticated) {
        try {
          const fetchedUser = await fetchUser();
          console.log("Fetched User Data:", fetchedUser);
          setUser(fetchedUser);

          // ✅ Save user to AsyncStorage
          await AsyncStorage.setItem("user", JSON.stringify(fetchedUser));
          console.log("✅ User data saved to AsyncStorage");
        } catch (error) {
          Alert.alert("Error", error.message);
        }
      }
    };

    fetchAndStoreUser();
  }, [isAuthenticated]);


  const handleLogout = async () => {
    Alert.alert("Confirm Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: async () => {
          try {
            await logout(); // Ensure this function handles token removal
            await AsyncStorage.removeItem("user"); // Remove user data
            await AsyncStorage.removeItem("token"); // Also remove token if not handled in logout
            navigation.reset({
              index: 0,
              routes: [{ name: "HomeScreen" }],
            });
          } catch (error) {
            Alert.alert("Error", "Failed to logout");
          }
        },
      },
    ]);
  };

  const handleChangePassword = () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill in both password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    Alert.alert("Confirm", "Are you sure you want to change your password?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: async () => {
          try {
            await updatePassword(newPassword);
            Alert.alert("Success", "Password updated successfully.", [
              {
                text: "OK",
                onPress: () => {
                  setNewPassword("");
                  setConfirmPassword("");
                  navigation.navigate("HomeScreen" as never);
                },
              },
            ]);
          } catch (error: any) {
            Alert.alert("Error", error.message);
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {user ? (
            <View style={styles.card}>
              <Text style={styles.label}>User Name: {user.username}</Text>
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
                  <Icon name={showNewPassword ? "eye-off" : "eye"} size={24} />
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
                  <Icon
                    name={showConfirmPassword ? "eye-off" : "eye"}
                    size={24}
                  />
                </TouchableOpacity>
              </View>

              {/* <View style={styles.button}>
                <Button
                  title="Change Password"
                  onPress={handleChangePassword}
                />
              </View>
              <View style={styles.button}>
                <Button title="Logout" onPress={handleLogout} color="red" />
              </View> */}
<TouchableOpacity style={styles.changePasswordButton} onPress={handleChangePassword}>
  <Text style={styles.changePasswordText}>Change Password</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
  <Text style={styles.logoutText}>Logout</Text>
</TouchableOpacity>


            </View>
          ) : (
            <Text style={styles.label}>Loading user data...</Text>
          )}
        </ScrollView>
        <Footer />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#F2F2F7",
//   },
//   wrapper: {
//     flex: 1,
//   },
//   container: {
//     padding: 20,
//     flexGrow: 1,
//     justifyContent: "flex-start",
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 20,
//     color: "#3A3A3C",
//   },
//   card: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 16,
//     padding: 24,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 5,
//     marginBottom: 20,
//   },
//   passwordContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#D1D1D6",
//     borderRadius: 12,
//     marginBottom: 16,
//     paddingHorizontal: 12,
//     backgroundColor: "#FAFAFA",
//   },
//   input: {
//     flex: 1,
//     paddingVertical: 14,
//     fontSize: 16,
//     color: "#1C1C1E",
//   },
//   eyeIcon: {
//     padding: 8,
//   },
//   button: {
//     marginVertical: 10,
//     borderRadius: 12,
//     overflow: "hidden",
//   },
// });



const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  wrapper: {
    flex: 1,
  },
  container: {
    padding: 20,
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#3A3A3C",
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  userInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  userInfoLabel: {
    fontSize: 16,
    color: "#3A3A3C",
    fontWeight: "500",
  },
  userInfoValue: {
    fontSize: 16,
    color: "#1C1C1E",
    fontWeight: "400",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D1D6",
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: "#FAFAFA",
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: "#1C1C1E",
  },
  eyeIcon: {
    padding: 8,
  },
  changePasswordButton: {
    backgroundColor: "#007AFF", // iOS green accent
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 10,
  },
  changePasswordText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    backgroundColor: "#FF3B30", // iOS destructive red
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 10,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});



export default UserProfileScreen;
