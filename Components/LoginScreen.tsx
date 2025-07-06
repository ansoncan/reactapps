import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { loginUser } from "../service/film_api";
import Footer from "./Footer";
import Icon from "react-native-vector-icons/Ionicons";
import { AuthContext } from "./AuthContext";

const LoginScreen = () => {
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      // Clear any previous token before attempting login
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");

      const { key } = await loginUser(username, password);
      await login(key);
      setErrorMessage(""); // Clear any previous error message

      navigation.reset({
        index: 0,
        routes: [{ name: "HomeScreen" }],
      });
    } catch (error) {
      console.log("Caught Error:", error); // Log the caught error
      let message;

      if (error instanceof Error) {
        switch (error.message) {
          case "Authentication failed":
            message = "Username or password is incorrect.";
            break;
          default:
            message = error.message || "Login failed";
        }
      } else {
        message = "Login failed";
      }

      setErrorMessage(message); // Set the error message
      console.log("Error Message Set:", message); // Log the error message
      Alert.alert("Authentication Error", message, [{ text: "OK" }]);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.content}>
          <Image
            source={require("../assets/fs_logo.png")}
            style={styles.logo}
          />
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
              <Icon
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#888"
              />
            </TouchableOpacity>
          </View>

          {/* Remove the error message section */}

          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          {/* Add back the "Back to Home" link with margin-top as before */}
          <TouchableOpacity
            onPress={() => navigation.navigate("HomeScreen")}
            style={{ marginTop: 30 }}
          >
            <Text style={{ color: "#4DA8DA" }}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* ✅ Footer placed outside to avoid layout conflicts */}
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, paddingHorizontal: 30, justifyContent: "center" },
  content: { alignItems: "center" },
  logo: { width: 240, height: 240, marginBottom: 10, resizeMode: "contain" },
  title: { fontSize: 24, fontWeight: "600", marginBottom: 30, color: "#333" },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#f9f9f9",
    marginBottom: 15,
    width: "100%",
  },
  passwordInput: { flex: 1, paddingVertical: 12 },
  button: {
    width: "100%",
    backgroundColor: "#4DA8DA",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

export default LoginScreen;
