import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Navigator imports for this Tab
import GamesStackNavigator from "./GamesStackNavigator";
import PlatformsStackNavigator from "./PlatformsStackNavigator";
import GenresStackNavigator from "./GenresStackNavigator";
import StoresStackNavigator from "./StoresStackNavigator";

const Stack = createNativeStackNavigator();

const HomeTabNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="GamesStackNavigator" component={GamesStackNavigator} />
    <Stack.Screen
      name="PlatformsStackNavigator"
      component={PlatformsStackNavigator}
    />
    <Stack.Screen
      name="GenresStackNavigator"
      component={GenresStackNavigator}
    />
    <Stack.Screen
      name="StoresStackNavigator"
      component={StoresStackNavigator}
    />
  </Stack.Navigator>
);

export default HomeTabNavigator;
