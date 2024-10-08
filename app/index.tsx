import React from "react";
import Login from "../components/Login";
import {Registration} from "../components/Registration";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "@/components/AuthContext";
import Home from "../components/Home";
import { UserProvider } from "../components/UserContext";
import UserDetails from "@/components/UserDetails";
import Workouts from "../components/Workouts"
import { WorkoutProvider } from "@/components/WorkoutContext";
import { ImageProvider } from "@/components/ImageContext";
import Meals from "@/components/Meals";
import MealForm from "@/components/MealForm";

export type RootStackParamList = {
  Login: undefined;
  Registration: undefined;
  Home: undefined;
  Workouts: undefined;
  Meals: undefined;
  UserDetails: undefined;
  Footer: undefined;
  MealForm: {mealType: string, date:Date}
};

export default function Index() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <ImageProvider>
    <UserProvider>
    <AuthProvider>
    <WorkoutProvider>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Workouts" component={Workouts} />
        <Stack.Screen name="Meals" component={Meals} />
        <Stack.Screen name="UserDetails" component={UserDetails} />
        <Stack.Screen name="MealForm" component={MealForm} />
      </Stack.Navigator>
    </WorkoutProvider>
    </AuthProvider>
    </UserProvider>
    </ImageProvider>
  );
}
