import { useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthContext } from "./AuthContext";

import type { RootStackParamList } from "../app/index";
import { getUserDetails } from "@/apiRequests";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

function Login({ navigation }: Props) {
  const { email, setEmail, password, setPassword, auth } =
    useContext(AuthContext);
 
  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log("logged in");
        const user = userCredential.user;
        navigation.navigate("Home");
        getUserDetails(email)
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  const handleRegistration = () => {
    navigation.navigate("Registration") 
    setEmail('') 
    setPassword('')
  }

  return (
    <View style={{ paddingLeft: 10, paddingTop: 10 }}>
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>Email</Text>
      <TextInput
        style={{
          borderRadius: 3,
          borderColor: "darkgrey",
          padding: 2,
          borderStyle: "solid",
          borderWidth: 2,
          width: "60%",
        }}
        onChangeText={(text) => {
          setEmail(text);
        }}
        value={email}
        placeholder="Enter your email"
      />
      <Text style={{ fontWeight: "bold", fontSize: 18, marginTop: 5 }}>
        Password
      </Text>
      <TextInput
        style={{
          borderRadius: 3,
          borderColor: "darkgrey",
          padding: 2,
          borderStyle: "solid",
          borderWidth: 2,
          width: "60%",
        }}
        onChangeText={(text) => {
          setPassword(text);
        }}
        value={password}
        placeholder="Enter your password"
      />
      <TouchableOpacity style={{ paddingTop: 10 }} onPress={handleSignIn}>
        <Text
          style={{
            fontSize: 18,
            borderRadius: 3,
            borderColor: "black",
            backgroundColor: "lightblue",
            padding: 2,
            borderStyle: "solid",
            borderWidth: 2,
            width: "14%",
            textAlign: "center",
          }}
        >
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegistration}>
        <Text style={{ fontSize: 14 }}>Not a user? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;
