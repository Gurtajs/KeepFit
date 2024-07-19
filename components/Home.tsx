import { UserContext } from "./UserContext";
import { useContext, useState } from "react";
import { Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Footer } from "./Footer";
import type { RootStackParamList } from "../app/index";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function Home({ navigation }: Props) {
  const { userDetails, setUserDetails } = useContext(UserContext);

  return (
    <>
      <Text style={{ fontSize: 18 }}>
        Welcome back {(userDetails as any).firstName}
      </Text>

      <Footer navigation={navigation} />
    </>
  );
}
