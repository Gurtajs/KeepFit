import { Children, createContext, useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Button,
  Image,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app";
import * as ImagePicker from "expo-image-picker";
import ImageViewer from "./ImageViewer";
import { postUser } from "../apiRequests";
import { ImageContext } from "./ImageContext";

type Props = NativeStackScreenProps<RootStackParamList, "Registration">;

function Registration({ navigation }: Props) {
  const { email, setEmail, password, setPassword, auth } =
    useContext(AuthContext);
  
  const [isRegistered, setIsRegistered] = useState(false);
  const [checkPassword, setCheckPassword] = useState("");
  const {selectedImage, setSelectedImage} = useContext(ImageContext)
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("");
  const [weightUnit, setWeightUnit] = useState("");
  const [isPressedCm, setIsPressedCm] = useState(false);
  const [isPressedFt, setIsPressedFt] = useState(false);
  const [isPressedKg, setIsPressedKg] = useState(false);
  const [isPressedLbs, setIsPressedLbs] = useState(false);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const handleCreateAccount = () => {
    if (!firstName) {
      setFirstNameError("Exercise name cannot be blank");
    }
    if (!lastName) {
      setLastNameError(true);
    }
    if (!age) {
      setAgeError(true);
    }

    if (
      password === checkPassword &&
      password.match(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}\[\]:;<>,.?/~_+\-=|\\]).{8,32}$/
      ) &&
      firstName &&
      lastName &&
      age
    ) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          console.log("account created");
          const user = userCredential.user;
          setIsRegistered(true);
          console.log(selectedImage)
          postUser(
            email,
            firstName,
            lastName,
            age,
            selectedImage,
            height,
            heightUnit,
            weight,
            weightUnit
          );
          setSelectedImage('')
        })
        .catch((error) => {
          Alert.alert(error.message);
        });
    }
  };

  const takePicture = async () => {
    let camera = await ImagePicker.launchCameraAsync({
      quality: 0.5, })
    if (!camera.canceled) {
      console.log(camera.assets[0].uri)
      setSelectedImage(camera.assets[0].uri);
     }
  };

  const pickImageAsync = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };
  
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#121212" }}>
      <View
        style={{
          paddingLeft: 10,
          paddingTop: 10,
          height: "100%",
          backgroundColor: "#121212",
          flex: 1,
        }}
      >
        <Text style={{ fontSize: 20, paddingBottom: 10, color: "#FAF9F6" }}>
          Register here
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 18, color: "#FAF9F6" }}>
          First Name<Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          style={{
            borderRadius: 3,
            borderColor: "darkgrey",
            padding: 2,
            borderStyle: "solid",
            borderWidth: 2,
            width: "60%",
            color: "#FAF9F6",
          }}
          placeholder="Enter your first name"
          placeholderTextColor={"#FAF9F6"}
          onChangeText={(text) => {
            setFirstName(text);
          }}
          value={firstName}
        />
        {firstNameError ? (
          <Text style={{ color: "red" }}>First name cannot be blank</Text>
        ) : null}
        <Text style={{ fontWeight: "bold", fontSize: 18, color: "#FAF9F6" }}>
          Last Name<Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          style={{
            borderRadius: 3,
            borderColor: "darkgrey",
            padding: 2,
            borderStyle: "solid",
            borderWidth: 2,
            width: "60%",
            color: "#FAF9F6",
          }}
          placeholder="Enter your last name"
          placeholderTextColor={"#FAF9F6"}
          onChangeText={(text) => {
            setLastName(text);
          }}
          value={lastName}
        />
        {lastNameError ? (
          <Text style={{ color: "red" }}>Last name cannot be blank</Text>
        ) : null}
        <Text style={{ fontWeight: "bold", fontSize: 18, color: "#FAF9F6" }}>
          Age<Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          style={{
            borderRadius: 3,
            borderColor: "darkgrey",
            padding: 2,
            borderStyle: "solid",
            borderWidth: 2,
            width: "60%",
            color: "#FAF9F6",
          }}
          placeholder="Enter your age"
          placeholderTextColor={"#FAF9F6"}
          onChangeText={(text) => {
            setAge(text);
          }}
          value={age}
        />
        {ageError ? (
          <Text style={{ color: "red" }}>Age cannot be blank</Text>
        ) : null}
        <Text style={{ fontWeight: "bold", fontSize: 18, color: "#FAF9F6" }}>
          Height
        </Text>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <TextInput
            style={{
              borderRadius: 3,
              borderColor: "darkgrey",
              padding: 2,
              borderStyle: "solid",
              borderWidth: 2,
              width: "60%",
              color: "#FAF9F6",
            }}
            placeholder="Enter your height (e.g. 5'11&quot;)"
            placeholderTextColor={"#FAF9F6"}
            onChangeText={(text) => {
              setHeight(text);
            }}
            value={height}
          />
          <TouchableOpacity
            style={
              isPressedCm
                ? {
                    borderRadius: 3,
                    borderColor: "#80bfff",
                    backgroundColor: "lightgrey",
                    padding: 2,
                    borderStyle: "solid",
                    borderWidth: 5,
                    width: "14%",
                  }
                : {
                    borderRadius: 3,
                    borderColor: "black",
                    backgroundColor: "lightgrey",
                    padding: 2,
                    borderStyle: "solid",
                    borderWidth: 2,
                    width: "14%",
                  }
            }
            onPress={() => {
              setIsPressedFt(false);
              setIsPressedCm((pressed) => !pressed);
              setHeightUnit("cm");
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 16 }}>cm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              isPressedFt
                ? {
                    borderRadius: 3,
                    borderColor: "#80bfff",
                    backgroundColor: "lightgrey",
                    padding: 2,
                    borderStyle: "solid",
                    borderWidth: 5,
                    width: "14%",
                  }
                : {
                    borderRadius: 3,
                    borderColor: "black",
                    backgroundColor: "lightgrey",
                    padding: 2,
                    borderStyle: "solid",
                    borderWidth: 2,
                    width: "14%",
                  }
            }
            onPress={() => {
              setIsPressedCm(false);
              setIsPressedFt((pressed) => !pressed);
              setHeightUnit("ft");
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 16 }}>ft</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ fontWeight: "bold", fontSize: 18, color: "#FAF9F6" }}>
          Weight
        </Text>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <TextInput
            style={{
              borderRadius: 3,
              borderColor: "darkgrey",
              padding: 2,
              borderStyle: "solid",
              borderWidth: 2,
              width: "60%",
              color: "#FAF9F6",
            }}
            placeholder="Enter your weight"
            placeholderTextColor={"#FAF9F6"}
            onChangeText={(text) => {
              setWeight(text);
            }}
            value={weight}
          />
          <TouchableOpacity
            style={
              isPressedKg
                ? {
                    borderRadius: 3,
                    borderColor: "#80bfff",
                    backgroundColor: "lightgrey",
                    padding: 2,
                    borderStyle: "solid",
                    borderWidth: 5,
                    width: "14%",
                  }
                : {
                    borderRadius: 3,
                    borderColor: "black",
                    backgroundColor: "lightgrey",
                    padding: 2,
                    borderStyle: "solid",
                    borderWidth: 2,
                    width: "14%",
                  }
            }
            onPress={() => {
              setIsPressedLbs(false);
              setIsPressedKg((pressed) => !pressed);
              setWeightUnit("kg");
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 16 }}>kg</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              isPressedLbs
                ? {
                    borderRadius: 3,
                    borderColor: "#80bfff",
                    backgroundColor: "lightgrey",
                    padding: 2,
                    borderStyle: "solid",
                    borderWidth: 5,
                    width: "14%",
                  }
                : {
                    borderRadius: 3,
                    borderColor: "black",
                    backgroundColor: "lightgrey",
                    padding: 2,
                    borderStyle: "solid",
                    borderWidth: 2,
                    width: "14%",
                  }
            }
            onPress={() => {
              setIsPressedKg(false);
              setIsPressedLbs((pressed) => !pressed);
              setWeightUnit("lbs");
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 16 }}>lbs</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
            marginTop: 5,
            color: "#FAF9F6",
          }}
        >
          Upload a profile picture
        </Text>
        <TouchableOpacity
          style={{
            borderRadius: 3,
            borderColor: "black",
            backgroundColor: "lightgrey",
            padding: 2,
            borderStyle: "solid",
            borderWidth: 2,
            width: 150,
            marginBottom: 10,
          }}
          onPress={takePicture}
        >
          <Text style={{ fontSize: 18, textAlign: "center" }}>Take photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            borderRadius: 3,
            borderColor: "black",
            backgroundColor: "lightgrey",
            padding: 2,
            borderStyle: "solid",
            borderWidth: 2,
            width: 150,
          }}
          onPress={pickImageAsync}
        >
          <Text style={{ fontSize: 18, textAlign: "center" }}>
            Select image from Gallery
          </Text>
        </TouchableOpacity>

        <Text style={{ fontWeight: "bold", fontSize: 18, color: "#FAF9F6" }}>
          Email<Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          style={{
            borderRadius: 3,
            borderColor: "darkgrey",
            padding: 2,
            borderStyle: "solid",
            borderWidth: 2,
            width: "60%",
            color: "#FAF9F6",
          }}
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
          placeholder="Enter your email"
          placeholderTextColor={"#FAF9F6"}
        />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
            marginTop: 5,
            color: "#FAF9F6",
          }}
        >
          Password<Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          style={{
            borderRadius: 3,
            borderColor: "darkgrey",
            padding: 2,
            borderStyle: "solid",
            borderWidth: 2,
            width: "60%",
            color: "#FAF9F6",
          }}
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
          value={password}
          placeholder="Enter your password"
          placeholderTextColor={"#FAF9F6"}
        />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
            marginTop: 5,
            color: "#FAF9F6",
          }}
        >
          Enter your password again<Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          secureTextEntry={true}
          style={{
            borderRadius: 3,
            borderColor: "darkgrey",
            padding: 2,
            borderStyle: "solid",
            borderWidth: 2,
            width: "60%",
            color: "#FAF9F6",
          }}
          onChangeText={(text) => {
            setCheckPassword(text);
          }}
          value={checkPassword}
          placeholder="Enter your password again"
          placeholderTextColor={"#FAF9F6"}
        />
        {password &&
        !password.match(
          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}\[\]:;<>,.?/~_+\-=|\\]).{8,32}$/
        ) ? (
          <View>
            <Text style={{ color: "red" }}>Password must be:</Text>
            <Text style={{ color: "red" }}>
              at least 8 characters in length and no more than 32
            </Text>
            <Text style={{ color: "red" }}>
              at least one upper case and lower case letter
            </Text>
            <Text style={{ color: "red" }}>
              at least one special character
            </Text>
          </View>
        ) : null}
        {password !== checkPassword &&
        password.length &&
        checkPassword.length ? (
          <Text style={{ color: "red" }}>Passwords don't match</Text>
        ) : null}
        <TouchableOpacity
          style={{ marginTop: 10, width: "20%" }}
          onPress={handleCreateAccount}
        >
          <Text
            style={{
              fontSize: 18,
              borderRadius: 3,
              borderColor: "black",
              backgroundColor: "#80bfff",
              padding: 2,
              borderStyle: "solid",
              borderWidth: 2,
              textAlign: "center",
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
        {isRegistered ? (
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "#FAF9F6" }}>
              You have successfully registered! Go back to the{" "}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
                setEmail("");
                setPassword("");
              }}
            >
              <Text style={{ fontWeight: "bold", color: "#FAF9F6" }}>
                login {""}
              </Text>
            </TouchableOpacity>
            <Text style={{ color: "#FAF9F6" }}>page</Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

export { Registration };
