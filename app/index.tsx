import React from "react";
import Login from "../components/Login";
import {Registration} from "../components/Registration";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "@/components/AuthContext";
import Home from "../components/Home";
import { UserProvider } from "../components/UserContext";
import UserDetails from "@/components/UserDetails";

export type RootStackParamList = {
  Login: undefined;
  Registration: undefined;
  Home: undefined;
  UserDetails: undefined;
  Footer: undefined;
};

export default function Index() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <UserProvider>
    <AuthProvider>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="UserDetails" component={UserDetails} />
      </Stack.Navigator>
    </AuthProvider>
    </UserProvider>
  );
}
