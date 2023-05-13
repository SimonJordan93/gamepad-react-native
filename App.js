import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import UserStackNavigator from "./navigation/UserStackNavigator";
import HomeTabNavigator from "./navigation/HomeTabNavigator";
import FavoritesTabNavigator from "./navigation/FavoritesTabNavigator";
import ProfileTabNavigator from "./navigation/ProfileTabNavigator";

import Header from "./components/Header";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Options for the main navigator
const mainNavOptions = {
  headerShown: false,
};

// Options for the tab navigator
const tabNavOptions = {
  tabBarActiveTintColor: "white",
  tabBarInactiveTintColor: "#444",
  tabBarActiveBackgroundColor: "#111",
  tabBarInactiveBackgroundColor: "#111",
};

export default function App() {
  const homeTabOptions = {
    header: () => <Header />,
  };

  return (
    <NavigationContainer style={{ backgroundColor: "black" }}>
      {/* Main navigator */}
      <Stack.Navigator screenOptions={mainNavOptions}>
        <Stack.Screen name="Main">
          {/* Tab navigator */}
          {() => (
            <Tab.Navigator screenOptions={tabNavOptions}>
              {/* Home tab */}
              <Tab.Screen
                name="Home"
                component={HomeTabNavigator}
                options={homeTabOptions}
              />
              {/* Favorites tab */}
              <Tab.Screen name="Favorites" component={FavoritesTabNavigator} />
              {/* Profile tab */}
              <Tab.Screen name="Profil" component={ProfileTabNavigator} />
            </Tab.Navigator>
          )}
        </Stack.Screen>
        <Stack.Screen
          name="UserStackNavigator"
          component={UserStackNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
