import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import { router } from "expo-router";

export default function Home() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Text style={styles.title}>CasaLivraison</Text>

      <Text style={styles.subtitle}>
        Fast delivery from your favorite restaurants
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        Delivering happiness to your doorstep.
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffa600",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 40,
    textAlign: "center",
  },

  button: {
    backgroundColor: "#28a745",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    elevation: 3,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  footer: {
    position: "absolute",
    bottom: 30,
    fontSize: 12,
    color: "#aaa",
  },
});