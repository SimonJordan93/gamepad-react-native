import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";

import GenresScreen from "../containers/GenresContainers/GenresScreen";
import FilteredGenresGamesScreen from "../containers/GenresContainers/FilteredGenresGamesScreen";
import GenresGameScreen from "../containers/GenresContainers/GenresGameScreen";

const GenresStack = createNativeStackNavigator();

const headerStyle = {
  backgroundColor: "black",
  height: 10,
};

const headerTitleStyle = {
  color: "white",
  fontSize: 12,
};

const GenresStackNavigator = () => (
  <GenresStack.Navigator
    screenOptions={{
      headerShown: Platform.OS === "ios" ? true : false,
      headerStyle,
      headerTitleStyle,
    }}
  >
    <GenresStack.Screen name="Genres" component={GenresScreen} />
    <GenresStack.Screen
      name="FilteredGenresGamesScreen"
      component={FilteredGenresGamesScreen}
      options={{ title: "" }}
    />
    <GenresStack.Screen
      name="GenresGame"
      options={{ title: "" }}
      component={GenresGameScreen}
    />
  </GenresStack.Navigator>
);

export default GenresStackNavigator;
