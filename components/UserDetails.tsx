import { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Footer } from "./Footer";
import type { RootStackParamList } from "../app/index";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { patchUser } from "../apiRequests";

type Props = NativeStackScreenProps<RootStackParamList, "UserDetails">;

export default function UserDetails({ navigation }: Props) {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [firstName, setFirstName] = useState((userDetails as any).firstName);
  const [lastName, setLastName] = useState((userDetails as any).lastName);
  const [age, setAge] = useState((userDetails as any).age);
  const [height, setHeight] = useState((userDetails as any).height);
  const [weight, setWeight] = useState((userDetails as any).weight);
  const [editedFirstName, setEditedFirstName] = useState(false);
  const [editedLastName, setEditedLastName] = useState(false);
  const [editedAge, setEditedAge] = useState(false);
  const [editedHeight, setEditedHeight] = useState(false);
  const [editedWeight, setEditedWeight] = useState(false);

  const editUserFirstName = () => {
    patchUser((userDetails as any).userId, "firstName", firstName);
    setEditedFirstName(true)
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

  return (
    <>
      <View style={{ flex: 1, marginLeft: 10, marginTop: 15 }}>
        <View
          style={{
            borderWidth: 2,
            borderColor: "darkgrey",
            borderStyle: "solid",
            borderRadius: 5,
            width: "60%",
          }}
        >
          <Text style={{ fontSize: 16 }}> First name </Text>
          <TextInput
            style={{ paddingLeft: 4 }}
            onChangeText={(text) => setFirstName(text)}
            value={firstName}
          />
        </View>
        <View style={{ flexDirection: "row", gap: 25 }}>
          <TouchableOpacity onPress={editUserFirstName}>
            <Text style={{ marginBottom: 15 }}>Edit</Text>
          </TouchableOpacity>
          {editedFirstName ? <Text>First name updated!</Text> : null}
        </View>

        <View
          style={{
            borderWidth: 2,
            borderColor: "darkgrey",
            borderStyle: "solid",
            borderRadius: 5,
            width: "60%",
          }}
        >
          <Text style={{ fontSize: 16 }}> Last name </Text>
          <TextInput
            style={{ paddingLeft: 4 }}
            onChangeText={(text) => setLastName(text)}
            value={lastName}
          />
        </View>
        <View style={{ flexDirection: "row", gap: 25 }}>
          <TouchableOpacity onPress={editUserLastName}>
            <Text style={{ marginBottom: 15 }}>Edit</Text>
          </TouchableOpacity>
          {editedLastName ? <Text>Last name updated!</Text> : null}
        </View>

        <View
          style={{
            borderWidth: 2,
            borderColor: "darkgrey",
            borderStyle: "solid",
            borderRadius: 5,
            width: "60%",
          }}
        >
          <Text style={{ fontSize: 16 }}> Age </Text>
          <TextInput
            style={{ paddingLeft: 4 }}
            onChangeText={(text) => setAge(text)}
            value={age.toString()}
          />
        </View>
        <View style={{ flexDirection: "row", gap: 25 }}>
          <TouchableOpacity onPress={editUserAge}>
            <Text style={{ marginBottom: 15 }}>Edit</Text>
          </TouchableOpacity>
          {editedAge ? <Text>Age updated!</Text> : null}
        </View>

        <View
          style={{
            borderWidth: 2,
            borderColor: "darkgrey",
            borderStyle: "solid",
            borderRadius: 5,
            width: "60%",
          }}
        >
          <Text style={{ fontSize: 16 }}> Height </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
            <TextInput
              style={{ paddingLeft: 4 }}
              onChangeText={(text) => setHeight(text)}
              value={height}
            />
            <Text>{(userDetails as any).heightUnit}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: 25 }}>
          <TouchableOpacity onPress={editUserHeight}>
            <Text style={{ marginBottom: 15 }}>Edit</Text>
          </TouchableOpacity>
          {editedHeight ? <Text>Height updated!</Text> : null}
        </View>

        <View
          style={{
            borderWidth: 2,
            borderColor: "darkgrey",
            borderStyle: "solid",
            borderRadius: 5,
            width: "60%",
          }}
        >
          <Text style={{ fontSize: 16 }}> Weight </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              style={{ paddingLeft: 4 }}
              onChangeText={(text) => setWeight(text)}
              value={weight.toString()}
            />
            <Text style={{ marginLeft: 2 }}>
              {(userDetails as any).weightUnit}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: 25 }}>
          <TouchableOpacity onPress={editUserWeight}>
            <Text style={{ marginBottom: 15 }}>Edit</Text>
          </TouchableOpacity>
          {editedWeight ? <Text>Weight updated!</Text> : null}
        </View>
      </View>
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
    </>
  );
}
