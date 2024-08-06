import { UserContext } from "./UserContext";
import { useContext, useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Footer } from "./Footer";
import type { RootStackParamList } from "../app/index";
import { AuthContext } from "./AuthContext";
import { getUserDetails, getWorkouts } from "../apiRequests";
// import { RegistrationContext } from "./Registration";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function Home({ navigation }: Props) {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const { email, setEmail } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState({});
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [exerciseName, setExerciseName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [workoutDate, setWorkoutDate] = useState("")

  useFocusEffect(
    React.useCallback(() => {
      getUserDetails(email).then((response) => {
        setUserDetails(response);
      });
    }, [])
  );

  useEffect(() => {
    getWorkouts().then((response) => {
      setWorkouts(response);
      setLoading(true);
      console.log(response);
    });
  }, []);

  const showWorkoutForm= () => {
    setShowForm((showForm) => !showForm);
  };

  const addWorkout = () => {

  }

  return (
    <>
      <Text style={{ fontSize: 18, marginLeft: 10, paddingBottom: 10 }}>
        Welcome back {(userDetails as any).firstName}
      </Text>

      <TouchableOpacity onPress={showWorkoutForm}>
        <Text
          style={{
            marginLeft: 10,
            borderWidth: 2,
            borderColor: "darkgrey",
            borderStyle: "solid",
            borderRadius: 5,
            width: 100,
            fontSize: 16,
            padding: 2,
            textAlign: "center",
          }}
        >
          Add workout
        </Text>
      </TouchableOpacity>
      {showForm ? (
        <>
          <TextInput
            onChangeText={(text) => {
              setExerciseName(text);
            }}
            value={exerciseName}
            placeholder="Enter exercise name"
          />
          <TextInput
            onChangeText={(text) => {
              setExerciseName(text);
            }}
            value={weight}
            placeholder="Enter weight lifted"
          />
          <TextInput
            onChangeText={(text) => {
              setExerciseName(text);
            }}
            value={sets}
            placeholder="Enter number of sets"
          />
          <TextInput
            onChangeText={(text) => {
              setExerciseName(text);
            }}
            value={reps}
            placeholder="Enter number of reps"
          />
           <TextInput
            onChangeText={(text) => {
              setWorkoutDate(text);
            }}
            value={workoutDate}
            placeholder="Enter workout date"
          />
          <TouchableOpacity onPress={addWorkout}>
            <Text style={{
            marginLeft: 10,
            borderWidth: 2,
            borderColor: "darkgrey",
            borderStyle: "solid",
            borderRadius: 5,
            width: 60,
            fontSize: 12,
            padding: 2,
            textAlign: "center",
          }}>
              Add
            </Text>
          </TouchableOpacity>
        </>
      ) : null}
      <Text style={{ fontSize: 16, marginTop: 10, marginLeft: 10 }}>
        Recent Workouts
      </Text>
      {loading ? (
        <View style={{ marginLeft: 10 }}>
          <Text>{(workouts as any)[0].exerciseName} </Text>
          <Text>Weight: {(workouts as any)[0].weight}kg</Text>
          <Text>Sets: {(workouts as any)[0].sets}</Text>
          <Text>Reps: {(workouts as any)[0].reps}</Text>
          <Text>Workout date: {(workouts as any)[0].workoutDate}</Text>
        </View>
      ) : null}
      <Footer navigation={navigation} />
    </>
  );
}
