import { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { Text, View } from "react-native";
import { Footer } from "./Footer";
import type { RootStackParamList } from "../app/index";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "UserDetails">;

export default function UserDetails({ navigation }: Props) {

  const { userDetails, setUserDetails } = useContext(UserContext);
  return (
    <>
    <View style={{ flex: 1}}>
      <Text style={{fontSize: 18}}>First name: {(userDetails as any).firstName}</Text>
      <Text style={{fontSize: 18}}>Last name: {(userDetails as any).lastName}</Text>
      <Text style={{fontSize: 18}}>Age: {(userDetails as any).age}</Text>
      <Text style={{fontSize: 18}}>Height: {(userDetails as any).height}</Text>
      <Text style={{fontSize: 18}}>Weight: {(userDetails as any).weight}</Text>
    </View>
    <Footer navigation={navigation}/>
    </>
  );
}
