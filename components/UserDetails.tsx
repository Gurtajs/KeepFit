import { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Footer } from "./Footer";
import type { RootStackParamList } from "../app/index";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  patchUser,
  // patchUserLastName,
  // patchUserAge,
  // patchUserHeight,
  // patchUserWeight,
} from "../apiRequests";

type Props = NativeStackScreenProps<RootStackParamList, "UserDetails">;

export default function UserDetails({ navigation }: Props) {
  const { userDetails, setUserDetails } = useContext(UserContext);

  const [firstName, setFirstName] = useState((userDetails as any).firstName);
  const [lastName, setLastName] = useState((userDetails as any).lastName);
  const [age, setAge] = useState((userDetails as any).age);
  const [height, setHeight] = useState((userDetails as any).height);
  const [weight, setWeight] = useState((userDetails as any).weight);

  const editUserFirstName = () => {
    return patchUser((userDetails as any).userId, 'firstName', firstName);
  };

  const editUserLastName = () => {
    return patchUser((userDetails as any).userId, 'lastName', lastName)
  };

  const editUserAge = () => {
    return patchUser((userDetails as any).userId, 'age', age);
  };

  const editUserHeight = () => {
    return patchUser((userDetails as any).userId, 'height', height);
  };

  const editUserWeight = () => {
    return patchUser((userDetails as any).userId, 'weight', weight);
  };

  return (
    <>
      <View style={{ flex: 1 }}>

        <Text style={{ fontSize: 18 }}> First name: </Text>
        <TextInput
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
        />
        <TouchableOpacity onPress={editUserFirstName}>
          <Text>Edit</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 18 }}>Last name: </Text>
        <TextInput
          onChangeText={(text) => setLastName(text)}
          value={lastName}
        />
        <TouchableOpacity onPress={editUserLastName}>
          <Text>Edit</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 18 }}>Age: </Text>
        <TextInput onChangeText={(text) => setAge(text)} value={age.toString()} />
        <TouchableOpacity onPress={editUserAge}>
          <Text>Edit</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 18 }}>Height: </Text>
        <TextInput onChangeText={(text) => setHeight(text)} value={height.toString()} />
        <TouchableOpacity onPress={editUserHeight}>
          <Text>Edit</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 18 }}>Weight: </Text>
        <TextInput onChangeText={(text) => setWeight(text)} value={weight.toString()} />
        <TouchableOpacity onPress={editUserWeight}>
          <Text>Edit</Text>
        </TouchableOpacity>

      </View>
      <Footer navigation={navigation} />
    </>
  );
}
