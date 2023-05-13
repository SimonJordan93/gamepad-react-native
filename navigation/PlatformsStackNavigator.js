import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";

import PlatformsScreen from "../containers/PlatformsContainers/PlatformsScreen";
import FilteredPlatformsGamesScreen from "../containers/PlatformsContainers/FilteredPlatformsGamesScreen";
import PlatformsGameScreen from "../containers/PlatformsContainers/PlatformsGameScreen";

const PlatformsStack = createNativeStackNavigator();

const headerStyle = {
  backgroundColor: "black",
  height: 10,
};

const headerTitleStyle = {
  color: "white",
  fontSize: 12,
};

const PlatformsStackNavigator = () => (
  <PlatformsStack.Navigator
    screenOptions={{
      headerShown: Platform.OS === "ios" ? true : false,
      headerStyle,
      headerTitleStyle,
    }}
  >
    <PlatformsStack.Screen name="Platforms" component={PlatformsScreen} />
    <PlatformsStack.Screen
      name="FilteredPlatformsGamesScreen"
      component={FilteredPlatformsGamesScreen}
      options={{ title: "" }}
    />
    <PlatformsStack.Screen
      name="PlatformsGame"
      options={{ title: "" }}
      component={PlatformsGameScreen}
    />
  </PlatformsStack.Navigator>
);

export default PlatformsStackNavigator;
