import { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Footer } from "./Footer";
import type { RootStackParamList } from "../app/index";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  patchUser
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
    patchUser((userDetails as any).userId, 'firstName', firstName);
  };

  const editUserLastName = () => {
    patchUser((userDetails as any).userId, 'lastName', lastName)
  };

  const editUserAge = () => {
    patchUser((userDetails as any).userId, 'age', age);
  };

  const editUserHeight = () => {
    patchUser((userDetails as any).userId, 'height', height);
  };

  const editUserWeight = () => {
    patchUser((userDetails as any).userId, 'weight', weight);
  };

  return (
    <>
      <View style={{ flex: 1, marginLeft:10, marginTop:15}}>
       <View style={{borderWidth: 2, borderColor: "darkgrey", borderStyle: "solid", borderRadius:5, width: "60%"}}>
        <Text style={{ fontSize: 16 }}> First name </Text>
        <TextInput
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
        />
        </View>
        <TouchableOpacity onPress={editUserFirstName}>
          <Text style={{marginBottom:15}}>Edit</Text>
        </TouchableOpacity>

        <View style={{borderWidth: 2, borderColor: "darkgrey", borderStyle: "solid", borderRadius:5, width: "60%"}}>
        <Text style={{ fontSize: 16 }}>Last name </Text>
        <TextInput
          onChangeText={(text) => setLastName(text)}
          value={lastName}
        />
         </View>
        <TouchableOpacity onPress={editUserLastName}>
          <Text style={{marginBottom:15}}>Edit</Text>
        </TouchableOpacity>

        <View style={{borderWidth: 2, borderColor: "darkgrey", borderStyle: "solid", borderRadius:5, width: "60%"}}>
        <Text style={{ fontSize: 16 }}>Age </Text>
        <TextInput onChangeText={(text) => setAge(text)} value={age.toString()} />
        </View>
        <TouchableOpacity onPress={editUserAge}>
          <Text style={{marginBottom:15}}>Edit</Text>
        </TouchableOpacity>

        <View style={{borderWidth: 2, borderColor: "darkgrey", borderStyle: "solid", borderRadius:5, width: "60%"}}>
        <Text style={{ fontSize: 16 }}>Height </Text>
        <TextInput onChangeText={(text) => setHeight(text)} value={height.toString()} />
        </View>
        <TouchableOpacity onPress={editUserHeight}>
          <Text style={{marginBottom:15}}>Edit</Text>
        </TouchableOpacity>

        <View style={{borderWidth: 2, borderColor: "darkgrey", borderStyle: "solid", borderRadius:5, width: "60%"}}>
        <Text style={{ fontSize: 16 }}>Weight </Text>
        <TextInput onChangeText={(text) => setWeight(text)} value={weight.toString()} />
        </View>
        <TouchableOpacity onPress={editUserWeight}>
          <Text style={{marginBottom:15}}>Edit</Text>
        </TouchableOpacity>

      </View>
      <Footer navigation={navigation} />
    </>
  );
}
