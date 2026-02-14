import { Button } from "@react-navigation/elements";
import { View, Text } from "react-native";
import { router } from "expo-router";

export default function RestaurantsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Restaurants Screen Loaded</Text>
      <Button title="Go to Menu" onPress={() => router.push("/menu")} />
      <Button title="Go to Orders" onPress={() => router.push("/order")} /> 
    </View>
  );
}
