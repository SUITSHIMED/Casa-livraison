import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import api from "../src/services/api.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
  StatusBar,
} from "react-native";

export default function RestaurantsScreen() {

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => {
      try {
        const response = await api.get("/restaurants");
        console.log("Restaurants response:", response.data);
        return response.data;
      } catch (err) {
        console.log("Restaurants fetch error:", err);
        throw err;
      }
    },
  });

  const handleLogout = async () => {
    await AsyncStorage.removeItem("authToken");
    router.replace("/login");
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#ffa600" />
        <Text style={styles.loadingText}>Loading restaurants...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error loading restaurants</Text>
        <Text>{error?.message || "Unknown error"}</Text>
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>No restaurants available</Text>
      </View>
    );
  }

  const renderRestaurant = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() =>
          router.push({
            pathname: "/menu",
            params: { restaurantId: item.id },
          })
        }
      >
        {item.image_url && (
          <Image
            source={{ uri: item.image_url }}
            style={styles.image}
          />
        )}

        <View style={styles.cardContent}>
          <Text style={styles.name}>{item.name}</Text>

          {item.address && (
            <Text style={styles.address}>{item.address}</Text>
          )}
        </View>

      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>

      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Restaurants</Text>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRestaurant}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffa600",
  },

  logoutButton: {
    backgroundColor: "#28a745",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    color: "#666",
  },

  errorText: {
    fontSize: 16,
    color: "red",
    marginBottom: 5,
  },

  emptyText: {
    fontSize: 16,
    color: "#666",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 3,
    borderWidth: 1,
    borderColor: "#eee",
  },

  image: {
    width: "100%",
    height: 160,
  },

  cardContent: {
    padding: 12,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },

  address: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },

});