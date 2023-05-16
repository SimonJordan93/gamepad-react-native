import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignInScreen from "../containers/UserContainers/SignInScreen";
import SignUpScreen from "../containers/UserContainers/SignUpScreen";

const UserStack = createNativeStackNavigator();

const UserStackNavigator = () => (
  <UserStack.Navigator screenOptions={{ headerShown: false }}>
    <UserStack.Screen
      name="SignIn"
      options={{ title: "Sign in" }}
      component={SignInScreen}
    />

    <UserStack.Screen
      name="SignUp"
      options={{ title: "Sign up" }}
      component={SignUpScreen}
    />
  </UserStack.Navigator>
);

export default UserStackNavigator;
