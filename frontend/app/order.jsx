import { useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import api from "../src/services/api.js";

import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  StatusBar,
} from "react-native";

export default function OrderScreen() {

  const { menuItemId, name, price } = useLocalSearchParams();

  const numericPrice = Number(price);

  const [quantity, setQuantity] = useState(1);

  const mutation = useMutation({
    mutationFn: async () => {

      const response = await api.post("/orders", {
        items: [
          {
            menu_item_id: Number(menuItemId),
            quantity: quantity,
          }
        ]
      });

      return response.data;
    },

    onSuccess: () => {
      Alert.alert("Success", "Order created successfully");
      router.push("./myOrders");
    },

    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  const total = numericPrice * quantity;

  return (
    <View style={styles.container}>

      <StatusBar barStyle="dark-content" />

      <Text style={styles.title}>Confirm Order</Text>

      <View style={styles.card}>

        <Text style={styles.name}>{name}</Text>

        <Text style={styles.price}>{numericPrice} MAD</Text>

        <Text style={styles.label}>Quantity</Text>

        <View style={styles.row}>

          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() =>
              setQuantity(Math.max(1, quantity - 1))
            }
            activeOpacity={0.8}
          >
            <Text style={styles.quantityButtonText}>−</Text>
          </TouchableOpacity>

          <Text style={styles.quantity}>
            {quantity}
          </Text>

          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() =>
              setQuantity(quantity + 1)
            }
            activeOpacity={0.8}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>{total} MAD</Text>
        </View>

        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => mutation.mutate()}
          disabled={mutation.isPending}
          activeOpacity={0.85}
        >
          {mutation.isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.orderText}>
              Confirm Order
            </Text>
          )}
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    justifyContent: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffa600",
    marginBottom: 25,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#eee",
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
  },

  price: {
    fontSize: 17,
    color: "#28a745",
    fontWeight: "bold",
    marginTop: 5,
  },

  label: {
    marginTop: 25,
    fontSize: 15,
    color: "#666",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },

  quantityButton: {
    backgroundColor: "#ffa600",
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  quantityButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  quantity: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 25,
  },

  totalBox: {
    marginTop: 30,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  totalLabel: {
    fontSize: 16,
    color: "#666",
  },

  totalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#28a745",
  },

  orderButton: {
    backgroundColor: "#28a745",
    paddingVertical: 16,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
  },

  orderText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },

});