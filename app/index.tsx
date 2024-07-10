import React from "react";
import Login from "../components/Login";
import Registration from "../components/Registration";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "@/components/AuthContext";
import Home from "../components/Home";

export type RootStackParamList = {
  Login: undefined;
  Registration: undefined;
  Home: undefined;
};

export default function Index() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <AuthProvider>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </AuthProvider>
  );
}
