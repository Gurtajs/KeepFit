import { UserContext } from "./UserContext";
import { useContext, useEffect, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Footer } from "./Footer";
import type { RootStackParamList } from "../app/index";
import { AuthContext } from "./AuthContext";
import { getUserDetails, getWorkouts, getWorkoutsByUser, postWorkout } from "../apiRequests";
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
      })
    }, [])
  );


  useEffect(() => {
    if ((userDetails as any).userId) {getWorkoutsByUser((userDetails as any).userId).then((response) => {
      setWorkouts(response);
      setLoading(true);
    })}
  }, [userDetails, workouts]);

 
  const showWorkoutForm= () => {
    setShowForm((showForm) => !showForm);
  };

  const addWorkout = () => {
    postWorkout(exerciseName, weight, sets, reps, workoutDate, (userDetails as any).userId).then((response) => {
      setWorkouts([response, workouts])
    })
  }

  return (
    <>
    <ScrollView>
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
              setWeight(text);
            }}
            value={weight}
            placeholder="Enter weight lifted"
          />
          <TextInput
            onChangeText={(text) => {
              setSets(text);
            }}
            value={sets}
            placeholder="Enter number of sets"
          />
          <TextInput
            onChangeText={(text) => {
              setReps(text);
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
          (workouts as any).map((workout:any) => (
              <View style={{ marginLeft: 10 }}>
              <Text>{workout.exerciseName} </Text>
              <Text>Weight: {workout.weight}kg</Text>
              <Text>Sets: {workout.sets}</Text>
              <Text>Reps: {workout.reps}</Text>
              <Text>Workout date: {workout.workoutDate}</Text>
            </View>
          )
          )) : null}

      <Footer navigation={navigation} />
      </ScrollView>
    </>
  );
}
