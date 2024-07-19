import { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Button} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app";
import * as ImagePicker from 'expo-image-picker';
import ImageViewer from "./ImageViewer";
import {postUser} from "../apiRequests"

type Props = NativeStackScreenProps<RootStackParamList, "Registration">;

function Registration({ navigation }: Props) {
  const { email, setEmail, password, setPassword, auth } =
    useContext(AuthContext);

  const [isRegistered, setIsRegistered] = useState(false);
  const [checkPassword, setCheckPassword] = useState('')
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [profilePicture, setProfilePicture] = useState(null)
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')

  

    const handleCreateAccount = () => {
      if (password===checkPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          console.log("account created");
          const user = userCredential.user;
          setIsRegistered(true);
          postUser(firstName, lastName, age, profilePicture, height, weight)
        }
      )
        .catch((error) => {
          Alert.alert(error.message);
        });}
    };

    const takePicture = async () => {
      let camera = await ImagePicker.launchCameraAsync({})
      if (!camera.canceled) {
        console.log(camera.assets[0].uri);
      }
    }

    const pickImageAsync = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      } else {
        alert('You did not select any image.');
      }
    };
  

  return (
    <ScrollView>
    <View style={{ paddingLeft: 10, paddingTop: 10 }}>
      <Text style={{ fontSize: 20, paddingBottom: 10 }}>Register here</Text>
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>First Name</Text>
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
          setFirstName(text);
        }
      }
      value={firstName}
      />
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>Last Name</Text>
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
          setLastName(text);
        }
      }
      value={lastName}
      />
       <Text style={{ fontWeight: "bold", fontSize: 18 }}>Age</Text>
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
          setAge(text);
        }
      }
      value={age}
      />
       <Text style={{ fontWeight: "bold", fontSize: 18 }}>Height</Text>
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
          setHeight(text);
        }
      }
      value={height}
      />
       <Text style={{ fontWeight: "bold", fontSize: 18 }}>Weight</Text>
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
          setWeight(text);
        }
      }
      value={weight}
      />
      <Text style={{ fontWeight: "bold", fontSize: 18, marginTop: 5 }}>Upload a profile picture</Text>
      <TouchableOpacity style={{
            borderRadius: 3,
            borderColor: "black",
            backgroundColor: "lightgrey",
            padding: 2,
            borderStyle: "solid",
            borderWidth: 2,
            width:150,
            marginBottom:10
            }} onPress={takePicture}>
        <Text style={{fontSize: 18, textAlign:'center'}} >Take photo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{
            borderRadius: 3,
            borderColor: "black",
            backgroundColor: "lightgrey",
            padding: 2,
            borderStyle: "solid",
            borderWidth: 2,
            width:150
            }} onPress={pickImageAsync}>
        <Text style={{fontSize: 18, textAlign:'center'}} >Select image from Gallery</Text>
      <ImageViewer
          selectedImage={selectedImage}
        />
      </TouchableOpacity>

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
      <Text style={{ fontWeight: "bold", fontSize: 18, marginTop: 5 }}>
        Enter your password again
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
          setCheckPassword(text)
        }}
        value={checkPassword}
        placeholder="Enter your password again"
      />
       {password!==checkPassword && password.length && checkPassword.length ? <Text style={{color:"red"}}>Passwords don't match</Text> : null}
      <TouchableOpacity style={{ marginTop: 10, width: "20%"}} onPress={handleCreateAccount}>
        <Text
          style={{
            fontSize: 18,
            borderRadius: 3,
            borderColor: "black",
            backgroundColor: "lightblue",
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
        <Text>
          You have successfully registered! Go back to{" "}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
              setEmail('') 
              setPassword('')
            }}
          >
            <Text>Login</Text>
          </TouchableOpacity>
        </Text>
      ) : null}
    </View>
    </ScrollView>
  );
}

export default Registration;
