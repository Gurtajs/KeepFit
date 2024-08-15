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
    <View style={{ paddingBottom: 30, flex:1 }}>
      <ScrollView>
        <Text style={{ fontSize: 18, marginLeft: 10, paddingBottom: 10 }}>
          Welcome back {(userDetails as any).firstName}
        </Text>

        <Text style={{ fontSize: 16, marginTop: 10, marginLeft: 10 }}>
          Your recent workouts:
        </Text>
        {Object.keys(groupBy)
          .slice(0, 3)
          .map((dates: string) => (
            <>
              <Text style={{ fontWeight: "bold", marginLeft: 6, fontSize: 18 }}>
                {" " +
                  (dates[5] +
                    dates[6] +
                    "-" +
                    dates[8] +
                    dates[9] +
                    "-" +
                    dates[0] +
                    dates[1] +
                    dates[2] +
                    dates[3])}
              </Text>
              {Object.keys(groupBy[dates]).map((workouts: any) => (
                <>
                  <Text style={{ marginLeft: 10, fontSize: 18 }}>
                    {workouts}
                  </Text>
                  <View style={{ marginBottom: 10, marginLeft: 10 }}>
                    {groupBy[dates][workouts].map((workout: any) => (
                      <>
                        <Text style={{ marginTop: 2 }} key={workout.workoutId}>
                          {workout.exerciseName}
                        </Text>
                        <Text>Weight: {workout.weight}kg</Text>
                        <Text>Sets: {workout.sets}</Text>
                        <Text>Reps: {workout.reps}</Text>
                        <Text style={{ marginBottom: 10 }}>
                          Workout date:{" "}
                          {" " +
                            (workout.workoutDate[5] +
                              workout.workoutDate[6] +
                              "-" +
                              workout.workoutDate[8] +
                              workout.workoutDate[9] +
                              "-" +
                              workout.workoutDate[0] +
                              workout.workoutDate[1] +
                              workout.workoutDate[2] +
                              workout.workoutDate[3])}
                        </Text>
                      </>
                    ))}
                  </View>
                </>
              ))}
            </>
          ))}
      </ScrollView>
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
