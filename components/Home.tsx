import { UserContext } from "./UserContext";
import { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Footer } from "./Footer";
import type { RootStackParamList } from "../app/index";
import { AuthContext } from "./AuthContext";
import { getUserDetails } from "../apiRequests";
// import { RegistrationContext } from "./Registration";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { RegistrationContext } from "./RegistrationContext";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function Home({ navigation }: Props) {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const { email, setEmail } = useContext(AuthContext);
  
  useFocusEffect(
    React.useCallback(() => {
      getUserDetails(email).then((response) => {
        setUserDetails(response);
      });
  }, [])
)

  return (
    <>
      <Text style={{ fontSize: 18 }}>
        Welcome back {(userDetails as any).firstName}
      </Text>

      <Footer navigation={navigation} />
    </>
  );
}
