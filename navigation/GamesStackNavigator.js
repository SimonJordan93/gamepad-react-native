import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";

import GamesScreen from "../containers/GamesContainers/GamesScreen";
import GameScreen from "../containers/GamesContainers/GameScreen";

const GamesStack = createNativeStackNavigator();

const headerStyle = {
  backgroundColor: "black",
  height: 10,
};

const headerTitleStyle = {
  color: "white",
  fontSize: 12,
};

const GamesStackNavigator = () => (
  <GamesStack.Navigator
    screenOptions={{
      headerShown: Platform.OS === "ios" ? true : false,
      headerStyle,
      headerTitleStyle,
    }}
  >
    <GamesStack.Screen
      name="Games"
      component={GamesScreen}
      options={{ title: "Games" }}
    />
    <GamesStack.Screen
      name="Game"
      options={{ title: "" }}
      component={GameScreen}
    />
  </GamesStack.Navigator>
);

export default GamesStackNavigator;
