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

const ProfileTabNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: Platform.OS === "ios" ? true : false,
      headerStyle,
      headerTitleStyle,
    }}
  >
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    <Stack.Screen name="UpdateEmailScreen" component={UpdateEmailScreen} />
    <Stack.Screen
      name="UpdateUsernameScreen"
      component={UpdateUsernameScreen}
    />
    <Stack.Screen
      name="UpdatePasswordScreen"
      component={UpdatePasswordScreen}
    />
  </Stack.Navigator>
);

export default ProfileTabNavigator;
