import { useState, useContext, useRef, useEffect } from "react";
import { UserContext } from "./UserContext";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Animated,
  Dimensions,
  Modal,
  Pressable,
  TurboModuleRegistry,
  Touchable,
} from "react-native";
import { Footer } from "./Footer";
import type { RootStackParamList } from "../app/index";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { patchUser } from "../apiRequests";
import { ImageContext } from "./ImageContext";
import Header from "./Header";
import * as ImagePicker from "expo-image-picker";
type Props = NativeStackScreenProps<RootStackParamList, "UserDetails">;

export default function UserDetails({ navigation }: Props) {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [firstName, setFirstName] = useState((userDetails as any).firstName);
  const [lastName, setLastName] = useState((userDetails as any).lastName);
  const [age, setAge] = useState((userDetails as any).age);
  const [selectedImage, setSelectedImage] = useState(
    (userDetails as any).profilePicture
  );
  const [height, setHeight] = useState((userDetails as any).height);
  const [weight, setWeight] = useState((userDetails as any).weight);
  const [editedFirstName, setEditedFirstName] = useState(false);
  const [editedLastName, setEditedLastName] = useState(false);
  const [editedAge, setEditedAge] = useState(false);
  const [editedHeight, setEditedHeight] = useState(false);
  const [editedWeight, setEditedWeight] = useState(false);

  const editUserFirstName = () => {
    patchUser((userDetails as any).userId, "firstName", firstName);
    setEditedFirstName(true);
    setTimeout(() => {
      setEditedFirstName(false);
    }, 1200);
  };

  const editUserLastName = () => {
    patchUser((userDetails as any).userId, "lastName", lastName);
    setEditedLastName(true);
    setTimeout(() => {
      setEditedLastName(false);
    }, 1200);
  };

  const editUserAge = () => {
    patchUser((userDetails as any).userId, "age", age);
    setEditedAge(true);
    setTimeout(() => {
      setEditedAge(false);
    }, 1200);
  };

  const editUserHeight = () => {
    patchUser((userDetails as any).userId, "height", height);
    setEditedHeight(true);
    setTimeout(() => {
      setEditedHeight(false);
    }, 1200);
  };

  const editUserWeight = () => {
    patchUser((userDetails as any).userId, "weight", weight);
    setEditedWeight(true);
    setTimeout(() => {
      setEditedWeight(false);
    }, 1200);
  };

  useEffect(() => {
    if (selectedImage) {
      patchUser(
        (userDetails as any).userId,
        "profilePicture",
        selectedImage
      ).then(() => {
        setUserDetails({ ...userDetails, profilePicture: selectedImage });
      });
    }
  }, [selectedImage]);

  const [modalVisible, setModalVisible] = useState(false);

  const openPopUp = () => {
    setModalVisible(true);
  };

  const takePicture = async () => {
    let camera = await ImagePicker.launchCameraAsync({
      quality: 0.5,
    });
    if (!camera.canceled) {
      setSelectedImage(camera.assets[0].uri);
      setModalVisible(false);
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
      setModalVisible(false);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#222222" }}>
      <ScrollView>
        <Header />
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, marginTop: 20, alignSelf: "center" }}>
            <View
              style={{
                marginBottom: 20,
                alignSelf: "center",
              }}
            >
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#383838",
                      borderRadius: 20,
                      padding: 25,
                      alignItems: "center",
                      shadowRadius: 4,
                      elevation: 5,
                      width: "50%",
                      marginTop: 60,
                    }}
                  >
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
                      <Text style={{ fontSize: 18, textAlign: "center" }}>
                        Take photo
                      </Text>
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
                    <TouchableOpacity
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={{ color: "#FAF9F6", marginTop: 10 }}>
                        Close
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>

              <TouchableOpacity onPress={openPopUp}>
                <Image
                  source={{ uri: (userDetails as any).profilePicture }}
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 100,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 40 }}>
              <View
                style={{
                  borderWidth: 2,
                  borderColor: "darkgrey",
                  borderStyle: "solid",
                  borderRadius: 5,
                  width: 300,
                }}
              >
                <Text style={{ fontSize: 16, color: "#FAF9F6" }}>
                  {" "}
                  First name{" "}
                </Text>
                <TextInput
                  style={{ paddingLeft: 4, color: "#FAF9F6" }}
                  onChangeText={(text) => setFirstName(text)}
                  value={firstName}
                />
              </View>
              <View style={{ flexDirection: "row", gap: 25 }}>
                <TouchableOpacity onPress={editUserFirstName}>
                  <Text style={{ marginBottom: 15, color: "#FAF9F6" }}>
                    Edit
                  </Text>
                </TouchableOpacity>
                {editedFirstName ? (
                  <Text style={{ color: "#FAF9F6" }}>First name updated!</Text>
                ) : null}
              </View>
              <View
                style={{
                  borderWidth: 2,
                  borderColor: "darkgrey",
                  borderStyle: "solid",
                  borderRadius: 5,
                  width: 300,
                }}
              >
                <Text style={{ fontSize: 16, color: "#FAF9F6" }}>
                  {" "}
                  Last name{" "}
                </Text>
                <TextInput
                  style={{ paddingLeft: 4, color: "#FAF9F6" }}
                  onChangeText={(text) => setLastName(text)}
                  value={lastName}
                />
              </View>
              <View style={{ flexDirection: "row", gap: 25 }}>
                <TouchableOpacity onPress={editUserLastName}>
                  <Text style={{ marginBottom: 15, color: "#FAF9F6" }}>
                    Edit
                  </Text>
                </TouchableOpacity>
                {editedLastName ? (
                  <Text style={{ color: "#FAF9F6" }}>Last name updated!</Text>
                ) : null}
              </View>

              <View
                style={{
                  borderWidth: 2,
                  borderColor: "darkgrey",
                  borderStyle: "solid",
                  borderRadius: 5,
                  width: 300,
                }}
              >
                <Text style={{ fontSize: 16, color: "#FAF9F6" }}> Age </Text>
                <TextInput
                  style={{ paddingLeft: 4, color: "#FAF9F6" }}
                  onChangeText={(text) => setAge(text)}
                  value={age.toString()}
                />
              </View>
              <View style={{ flexDirection: "row", gap: 25 }}>
                <TouchableOpacity onPress={editUserAge}>
                  <Text style={{ marginBottom: 15, color: "#FAF9F6" }}>
                    Edit
                  </Text>
                </TouchableOpacity>
                {editedAge ? (
                  <Text style={{ color: "#FAF9F6" }}>Age updated!</Text>
                ) : null}
              </View>
              <View
                style={{
                  borderWidth: 2,
                  borderColor: "darkgrey",
                  borderStyle: "solid",
                  borderRadius: 5,
                  width: 300,
                }}
              >
                <Text style={{ fontSize: 16, color: "#FAF9F6" }}> Height </Text>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                >
                  <TextInput
                    style={{ paddingLeft: 4, color: "#FAF9F6" }}
                    onChangeText={(text) => setHeight(text)}
                    value={height}
                  />
                  {(userDetails as any).heightUnit === "cm" ? (
                    <Text style={{ color: "#FAF9F6" }}>
                      (userDetails as any).heightUnit{" "}
                    </Text>
                  ) : null}
                </View>
              </View>
              <View style={{ flexDirection: "row", gap: 25 }}>
                <TouchableOpacity onPress={editUserHeight}>
                  <Text style={{ marginBottom: 15, color: "#FAF9F6" }}>
                    Edit
                  </Text>
                </TouchableOpacity>
                {editedHeight ? (
                  <Text style={{ color: "#FAF9F6" }}>Height updated!</Text>
                ) : null}
              </View>

              <View
                style={{
                  borderWidth: 2,
                  borderColor: "darkgrey",
                  borderStyle: "solid",
                  borderRadius: 5,
                  width: 300,
                }}
              >
                <Text style={{ fontSize: 16, color: "#FAF9F6" }}> Weight </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TextInput
                    style={{ paddingLeft: 4, color: "#FAF9F6" }}
                    onChangeText={(text) => setWeight(text)}
                    value={weight.toString()}
                  />
                  <Text style={{ marginLeft: 2, color: "#FAF9F6" }}>
                    {(userDetails as any).weightUnit}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", gap: 25 }}>
                <TouchableOpacity onPress={editUserWeight}>
                  <Text style={{ marginBottom: 15, color: "#FAF9F6" }}>
                    Edit
                  </Text>
                </TouchableOpacity>
                {editedWeight ? (
                  <Text style={{ color: "#FAF9F6" }}>Weight updated!</Text>
                ) : null}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          flex: 1,
          position: "absolute",
          bottom: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          backgroundColor: "lightblue",
          left: 0,
          right: 0,
        }}
      >
        <Footer navigation={navigation} />
      </View>
    </View>
  );
}
