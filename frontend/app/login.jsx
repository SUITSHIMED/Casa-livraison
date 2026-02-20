import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { router } from "expo-router";
import api from "../src/services/api.js";

export default function LoginScreen() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    console.log("BASE URL:", api?.defaults?.baseURL);
    console.log("API object exists:", !!api);

    if (!api) {
      Alert.alert("Error", "API client not initialized");
      return;
    }

    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    try {

      setLoading(true);

      console.log("Sending login request to:", api.defaults.baseURL);

      const response = await api.post("/auth/login", {
        email: email,
        password: password,
      });

      console.log("Login success:", response.data);

      if (response.data.token) {
        await AsyncStorage.setItem("authToken", response.data.token);
      }

      Alert.alert("Success", "Login successful");

      router.replace("/restaurants");

    } catch (error) {

      console.log("Login error object:", error);
      console.log("Error response:", error.response?.data);
      console.log("Error message:", error.message);

      Alert.alert(
        "Login failed",
        error.response?.data?.message || error.message || "Error occurred"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <View style={styles.container}>

      <StatusBar barStyle="dark-content" />

      <Text style={styles.title}>
        Welcome Back
      </Text>

      <Text style={styles.subtitle}>
        Login to CasaLivraison
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#999"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={styles.loginButton}
        activeOpacity={0.8}
      >
        <Text style={styles.loginButtonText}>
          {loading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/register")}
        style={styles.registerButton}
        activeOpacity={0.8}
      >
        <Text style={styles.registerButtonText}>
          Dont have an account? Register
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffa600",
    textAlign: "center",
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 15,
    color: "#777",
    textAlign: "center",
    marginBottom: 30,
  },

  input: {
    backgroundColor: "#f9f9f9",
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#eee",
    fontSize: 15,
  },

  loginButton: {
    backgroundColor: "#ffa600",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    elevation: 2,
  },

  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  registerButton: {
    backgroundColor: "#28a745",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
    elevation: 2,
  },

  registerButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },

});