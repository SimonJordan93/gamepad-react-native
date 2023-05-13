import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const headerStyle = {
  backgroundColor: "black",
  height: 10,
};

const headerTitleStyle = {
  color: "white",
  fontSize: 12,
};

const FavoritesTabNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: Platform.OS === "ios" ? true : false,
      headerStyle,
      headerTitleStyle,
    }}
  >
    <Stack.Screen
      name="FavoritesGamesScreen"
      component={FavoritesGamesScreen}
    />
    <Stack.Screen name="FavoritesGameScreen" component={FavoritesGameScreen} />
  </Stack.Navigator>
);

export default FavoritesTabNavigator;
