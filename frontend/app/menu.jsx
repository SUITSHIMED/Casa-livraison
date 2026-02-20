import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, router } from "expo-router";
import api from "../src/services/api.js";

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

export default function MenuScreen() {

  const { restaurantId } = useLocalSearchParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["menu", restaurantId],
    queryFn: async () => {
      const response = await api.get(`/menuItem/restaurant/${restaurantId}`);
      return response.data;
    },
    enabled: !!restaurantId,
  });

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#ffa600" />
        <Text style={styles.loadingText}>Loading menu...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error loading menu</Text>
        <Text>{error.message}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() =>
          router.push({
            pathname: "/order",
            params: {
              menuItemId: item.id,
              name: item.name,
              price: item.price,
            },
          })
        }
      >
        {item.image_url && (
          <Image
            source={{ uri: item.image_url }}
            style={styles.image}
          />
        )}

        <View style={styles.content}>
          
          <View style={styles.row}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price} MAD</Text>
          </View>

          {item.ingredients && (
            <Text style={styles.ingredients} numberOfLines={2}>
              {item.ingredients}
            </Text>
          )}

        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>

      <StatusBar barStyle="dark-content" />

      <Text style={styles.title}>Menu</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
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

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffa600",
    marginBottom: 15,
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

  content: {
    padding: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
    flex: 1,
    marginRight: 10,
  },

  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#28a745",
  },

  ingredients: {
    fontSize: 14,
    color: "#777",
    marginTop: 6,
  },

});