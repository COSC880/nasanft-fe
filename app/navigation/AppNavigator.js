import HelpScreen from "../screens/HelpScreen";
import HomeScreen from "../screens/HomeScreen";
import QuizScreen from "../screens/QuizScreen";
import React from "react";
import UserDetailScreen from "../screens/UserDetailScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      options={{ headerShown: false }}
      name="HomeScreen"
      component={HomeScreen}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="HelpScreen"
      component={HelpScreen}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="QuizScreen"
      component={QuizScreen}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="UserDetailsScreen"
      component={UserDetailScreen}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="WelcomeScreen"
      component={WelcomeScreen}
    />
  </Stack.Navigator>
);

export default AppNavigator;
