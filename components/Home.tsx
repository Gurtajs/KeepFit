import { UserContext } from "./UserContext";
import { useContext, useState } from "react";
import {Text} from "react-native"


export default function Home() {
  const { userDetails, setUserDetails } =
  useContext(UserContext);

  return (
    <Text>Welcome back {(userDetails as any).firstName}</Text>
  )
}
