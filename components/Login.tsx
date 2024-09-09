import { useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthContext } from "./AuthContext";
import { UserContext } from "./UserContext";
import type { RootStackParamList } from "../app/index";
import { getUserDetails } from "../apiRequests";
import StarRating from "./StarRating";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

function Login({ navigation }: Props) {
  const { email, setEmail, password, setPassword, auth } =
    useContext(AuthContext);

  const { userDetails, setUserDetails } = useContext(UserContext);

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate("Home");
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  const handleRegistration = () => {
    navigation.navigate("Registration");
    setEmail("");
    setPassword("");
  };

  return (
    <View
      style={{ paddingTop: "30%", backgroundColor: "#121212", height: "100%" }}
    >
      <Image
        source={require("../assets/images/logo.png")}
        style={{ height: "30%", width: "90%", alignSelf: "center" }}
      />
      <View style={{ alignSelf: "center" }}>
        <View style={{ paddingBottom: 5 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18, color: "#FAF9F6" }}>
            Email
          </Text>
          <TextInput
            style={{
              borderRadius: 3,
              borderColor: "darkgrey",
              padding: 2,
              borderStyle: "solid",
              borderWidth: 2,
              width: 180,
              color: "#FAF9F6",
              paddingLeft: 5,
            }}
            onChangeText={(text) => {
              setEmail(text);
            }}
            value={email}
            placeholder="Enter your email"
            placeholderTextColor={"#FAF9F6"}
          />
        </View>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
            marginTop: 5,
            color: "#FAF9F6",
          }}
        >
          Password
        </Text>
        <TextInput
          secureTextEntry={true}
          style={{
            borderRadius: 3,
            borderColor: "darkgrey",
            padding: 2,
            borderStyle: "solid",
            borderWidth: 2,
            width: 180,
            paddingLeft: 5,
            color: "#FAF9F6",
          }}
          onChangeText={(text) => {
            setPassword(text);
          }}
          value={password}
          placeholder="Enter your password"
          placeholderTextColor={"#FAF9F6"}
        />
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={{ paddingTop: 10 }} onPress={handleSignIn}>
            <Text
              style={{
                fontSize: 18,
                borderRadius: 3,
                borderColor: "black",
                backgroundColor: "#80bfff",
                padding: 2,
                borderStyle: "solid",
                borderWidth: 2,
                width: 160,
                textAlign: "center",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRegistration}>
            <Text style={{ fontSize: 14, color: "#FAF9F6" }}>
              Not a user? Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Login;
