import React from "react";
import { UserContext } from "./UserContext";
import { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Footer } from "./Footer";
import type { RootStackParamList } from "../app/index";
import { AuthContext } from "./AuthContext";
import {
  getUserDetails,
  getWorkouts,
  getWorkoutsByUser,
  getMuscleGroups,
  getUserWorkoutByMuscleGroup,
} from "../apiRequests";
import { useFocusEffect } from "@react-navigation/native";
import { WorkoutContext } from "./WorkoutContext";
import Header from "./Header";
import DeleteWorkout from "./DeleteWorkout";
type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function Home({ navigation }: Props) {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const { email, setEmail } = useContext(AuthContext);
  const { workouts, setWorkouts } = useContext(WorkoutContext);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getUserDetails(email).then((response) => {
        setUserDetails(response);
        setLoading(true);
      });
    }, [])
  );

  useEffect(() => {
    if ((userDetails as any).userId) {
      getWorkoutsByUser((userDetails as any).userId).then((response) => {
        setWorkouts(response);
        setLoading(true);
      });
    }
  }, [userDetails]);

const groupBy = workouts.reduce((acc, obj) => {
    if (!acc[obj.workoutDate]) acc[obj.workoutDate] = {};
    if (!acc[obj.workoutDate][obj.muscleGroup])
      acc[obj.workoutDate][obj.muscleGroup] = [];
    acc[obj.workoutDate][obj.muscleGroup].push(obj);
    return acc;
  }, {});

  return (
    <View style={{flex:1, backgroundColor:'#222222'}}>
    <Header/>
    <View style={{ paddingBottom: 30, flex: 1, paddingLeft: 5 }}>
  {loading ? (
    <View style={{flex: 1}}>
      <View style={{ paddingBottom: 10 }}>
        <ScrollView>
          <Text
            style={{
              fontSize: 18,
              marginLeft: 10,
              paddingBottom: 10,
              paddingTop: 5,
              color:'#FAF9F6'
            }}
          >
            Welcome back {(userDetails as any).firstName}
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginTop: 10,
              marginLeft: 10,
              marginBottom: 5,
              color:'#FAF9F6'
            }}
          >
            Your recent workouts:
          </Text>
          {Object.keys(groupBy)
            .slice(0, 3)
            .map((dates: any) => (
              <View key={dates}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 16,
                    marginLeft: 10,
                    marginTop: 10,
                    color: "#FAF9F6",
                  }}
                >
                  {dates[8] +
                    dates[9] +
                    "-" +
                    dates[5] +
                    dates[6] +
                    "-" +
                    dates[0] +
                    dates[1] +
                    dates[2] +
                    dates[3]}
                </Text>
                {Object.keys(groupBy[dates]).map((muscleGroup: string) => (
                  <View key={`${dates}-${muscleGroup}`}>
                    <Text
                      style={{
                        marginLeft: 10,
                        fontSize: 16,
                        color: "#FAF9F6",
                      }}
                    >
                      {muscleGroup ? muscleGroup : <Text>Other exercises</Text>}
                    </Text>
                    <View style={{ marginBottom: 10, marginLeft: 10 }}>
                      {groupBy[dates][muscleGroup].map((workout: any) => (
                        <View style={{ flex: 1, marginBottom:20 }} key={workout.workoutId}>
                          <View
                            style={{
                              borderColor: "black",
                              borderStyle: "solid",
                              borderWidth: 2,
                              borderRadius: 8,
                              width: "70%",
                              marginBottom: 10,
                              paddingTop: 25,
                              paddingLeft: 5,
                              padding: 2,
                              backgroundColor:
                                muscleGroup === "Abdominals"
                                  ? "pink"
                                  : "white" && muscleGroup === "Back"
                                  ? "#d4d4f7"
                                  : "white" && muscleGroup === "Biceps"
                                  ? "#ff8f66"
                                  : "white" && muscleGroup === "Chest"
                                  ? "plum"
                                  : "white" && muscleGroup === "Legs"
                                  ? "lightgreen"
                                  : "white" && muscleGroup === "Shoulders"
                                  ? "#ffffcc"
                                  : "white" && muscleGroup === "Triceps"
                                  ? "mediumturquoise"
                                  : "white",
                            }}
                            key={workout.workoutId}
                          >
                            <View
                              style={{
                                backgroundColor:
                                  muscleGroup === "Abdominals"
                                    ? "#ffb3bf"
                                    : "white" && muscleGroup === "Back"
                                    ? "#bfbff2"
                                    : "white" && muscleGroup === "Biceps"
                                    ? "#ff7f50"
                                    : "white" && muscleGroup === "Chest"
                                    ? "#d68fd6"
                                    : "white" && muscleGroup === "Legs"
                                    ? "#64e764"
                                    : "white" && muscleGroup === "Shoulders"
                                    ? "#ffff99"
                                    : "white" && muscleGroup === "Triceps"
                                    ? "#2eb8b3"
                                    : "white",
                                position: "absolute",
                                paddingBottom: 2,
                                top: 0,
                                right: 0,
                                left: 0,
                                margin: 0,
                                padding: 0,
                                paddingLeft: 5,
                                borderStyle: "solid",
                                borderTopLeftRadius: 4,
                                borderTopRightRadius: 4,
                              }}
                            >
                              <Text
                                style={{ marginTop: 2, fontWeight: "bold" }}
                                key={workout.workoutId}
                              >
                                {workout.exerciseName}
                              </Text>
                            </View>
                            <Text style={{}}>Weight: {workout.weight}kg</Text>
          
                            <Text style={{}}>Sets: {workout.sets}</Text>
                            <Text style={{}}>Reps: {workout.reps}</Text>
                            <Text style={{ marginBottom: 2 }}>
                              Workout date:{" "}
                              {workout.workoutDate[8] +
                                workout.workoutDate[9] +
                                "-" +
                                workout.workoutDate[5] +
                                workout.workoutDate[6] +
                                "-" +
                                workout.workoutDate[0] +
                                workout.workoutDate[1] +
                                workout.workoutDate[2] +
                                workout.workoutDate[3]}
                            </Text>
                            <DeleteWorkout
                            workouts={workouts}
                            setWorkouts={setWorkouts}
                            workout={workout}
                            userDetails={userDetails}
                          />
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            ))}
        </ScrollView>
      </View>
      
    </View>
  ) : (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{color:'#FAF9F6'}}>Fetching your data</Text>
      <ActivityIndicator size="large" />
    </View>
  )}
  <View
        style={{
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
  </View>
)
}

