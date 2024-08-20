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

  return loading ? (
    <View style={{ paddingBottom: 30, flex: 1, paddingLeft: 5 }}>
      <View style={{ paddingBottom: 10 }}>
        <ScrollView>
          <Text
            style={{
              fontSize: 18,
              marginLeft: 10,
              paddingBottom: 10,
              paddingTop: 5,
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
            }}
          >
            Your recent workouts:
          </Text>
          {Object.keys(groupBy)
            .slice(0, 3)
            .map((dates: string) => (
              <View key={dates}>
                <Text
                  style={{ fontWeight: "bold", marginLeft: 6, fontSize: 16 }}
                >
                  {" " +
                    (dates[8] +
                      dates[9] +
                      "-" +
                      dates[5] +
                      dates[6] +
                      "-" +
                      dates[0] +
                      dates[1] +
                      dates[2] +
                      dates[3])}
                </Text>
                {Object.keys(groupBy[dates]).map((muscleGroup: any) => (
                  <View key={`${dates}-${muscleGroup}`}>
                    <Text style={{ marginLeft: 10, fontSize: 16 }}>
                      {muscleGroup}
                    </Text>
                    <View style={{ marginBottom: 10, marginLeft: 10 }}>
                      {groupBy[dates][muscleGroup].map((workout: any) => (
                        <View
                          style={{
                            borderRadius: 3,
                            borderColor: "black",
                            padding: 2,
                            borderStyle: "solid",
                            borderWidth: 2,
                            width: "70%",
                            backgroundColor:
                              muscleGroup === "Abdominals"
                                ? "pink"
                                : "white" && muscleGroup === "Back"
                                ? "lavender"
                                : "white" && muscleGroup === "Biceps"
                                ? "lightcoral"
                                : "white" && muscleGroup === "Chest"
                                ? "plum"
                                : "white" && muscleGroup === "Legs"
                                ? "lightgreen"
                                : "white" && muscleGroup === "Shoulders"
                                ? "lightyellow"
                                : "white" && muscleGroup === "Triceps"
                                ? "mediumturquoise"
                                : "white",
                          }}
                          key={workout.workoutId}
                        >
                          <Text style={{ marginTop: 2 }}>
                            {workout.exerciseName}
                          </Text>
                          <Text>Weight: {workout.weight}kg</Text>
                          <Text>Sets: {workout.sets}</Text>
                          <Text>Reps: {workout.reps}</Text>
                          <Text style={{ marginBottom: 10 }}>
                            Workout date:{" "}
                            {" " +
                              (workout.workoutDate[8] +
                                workout.workoutDate[9] +
                                "-" +
                                workout.workoutDate[5] +
                                workout.workoutDate[6] +
                                "-" +
                                workout.workoutDate[0] +
                                workout.workoutDate[1] +
                                workout.workoutDate[2] +
                                workout.workoutDate[3])}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            ))}
        </ScrollView>
      </View>
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
  ) : (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Fetching your data</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}
