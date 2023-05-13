import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";

import StoresScreen from "../containers/StoresContainers/StoresScreen";
import FilteredStoresGamesScreen from "../containers/StoresContainers/FilteredStoresGamesScreen";
import StoresGameScreen from "../containers/StoresContainers/StoresGameScreen";

const StoresStack = createNativeStackNavigator();

const headerStyle = {
  backgroundColor: "black",
  height: 10,
};

const headerTitleStyle = {
  color: "white",
  fontSize: 12,
};

const StoresStackNavigator = () => (
  <StoresStack.Navigator
    screenOptions={{
      headerShown: Platform.OS === "ios" ? true : false,
      headerStyle,
      headerTitleStyle,
    }}
  >
    <StoresStack.Screen name="Stores" component={StoresScreen} />
    <StoresStack.Screen
      name="FilteredStoresGamesScreen"
      component={FilteredStoresGamesScreen}
      options={{ title: "" }}
    />
    <StoresStack.Screen
      name="StoresGame"
      options={{ title: "" }}
      component={StoresGameScreen}
    />
  </StoresStack.Navigator>
);

export default StoresStackNavigator;
