import { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app";

type Props = NativeStackScreenProps<RootStackParamList, "Registration">;

function Registration({ navigation }: Props) {
  const { email, setEmail, password, setPassword, auth } =
    useContext(AuthContext);

  const [isRegistered, setIsRegistered] = useState(false);

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        console.log("account created");
        const user = userCredential.user;
        setIsRegistered(true);
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  return (
    <View style={{ paddingLeft: 10, paddingTop: 10 }}>
      <Text style={{ fontSize: 20, paddingBottom: 10 }}>Register here</Text>
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
      <TouchableOpacity style={{ marginTop: 10 }} onPress={handleCreateAccount}>
        <Text
          style={{
            fontSize: 18,
            borderRadius: 3,
            borderColor: "black",
            backgroundColor: "lightblue",
            padding: 2,
            borderStyle: "solid",
            borderWidth: 2,
            width: "20%",
            textAlign: "center",
          }}
        >
          Register
        </Text>
      </TouchableOpacity>
      {isRegistered ? (
        <Text>
          You have successfully registered! Go back to{" "}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text>Login</Text>
          </TouchableOpacity>
        </Text>
      ) : null}
    </View>
  );
}

export default Registration;
