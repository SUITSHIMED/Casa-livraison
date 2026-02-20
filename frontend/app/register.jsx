import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  StatusBar
} from "react-native";

import { router } from "expo-router";
import api from "../src/services/api";

export default function RegisterScreen() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {

    if (!name || !email || !password) {
      Alert.alert("Error", "Fill all fields");
      return;
    }

    try {

      setLoading(true);

      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      Alert.alert("Success", "Account created");

      router.replace("/login");

    } catch (error) {

      Alert.alert(
        "Error",
        error.response?.data?.message || "Register failed"
      );

    } finally {
      setLoading(false);
    }

  };

  return (

    <View style={styles.container}>

      <StatusBar barStyle="dark-content" />

      <Text style={styles.title}>
        Create Account
      </Text>

      <Text style={styles.subtitle}>
        Join CasaLivraison today
      </Text>

      <TextInput
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholderTextColor="#999"
      />

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
        onPress={handleRegister}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>
          {loading ? "Creating..." : "Register"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/login")}
      >
        <Text style={styles.link}>
          Already have an account? Login
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

  button: {
    backgroundColor: "#28a745",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    elevation: 2,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  link: {
    marginTop: 20,
    textAlign: "center",
    color: "#ffa600",
    fontWeight: "600",
  },

});