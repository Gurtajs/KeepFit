import { useContext, useState } from "react";
import { View, Text } from "react-native";
import DeleteWorkout from "./DeleteWorkout";
import { WorkoutContext } from "./WorkoutContext";
import { UserContext } from "./UserContext";
import Ionicons from "@expo/vector-icons/Ionicons";

interface WorkoutsProps {
  workoutsByDate: Array<any>;
  groupBy: Array<any>;
  starRating: number;
}

interface Workout {
  workoutId: number;
  exerciseName: string;
  height: string;
  weight: number;
  sets: number;
  reps: number;
  workoutDate: string;
}

export default function AllWorkouts({
  workoutsByDate,
  groupBy,
  starRating,
}: WorkoutsProps) {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const { workouts, setWorkouts } = useContext(WorkoutContext);

  return Object.keys(groupBy).map((dates: any, i) => (
    <View
      key={dates}
      style={{
        backgroundColor: i % 2 == 0 ? "#2e2e2e" : "#222222",
        marginTop: 10,
      }}
    >
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
            {muscleGroup}
          </Text>
          <View style={{ marginBottom: 10, marginLeft: 10 }}>
            {groupBy[dates][muscleGroup].map((workout: any) => (
              <View style={{ flex: 1 }} key={workout.workoutId}>
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
                        : "white" && muscleGroup === "Other"
                        ? "#ffd280"
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
                          : "white" && muscleGroup === "Other"
                          ? "#ffc14d"
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
                  {workout.weight > 0 ? (
                    <Text style={{}}>Weight: {workout.weight}kg</Text>
                  ) : (
                    <Text style={{}}>Weight: - kg</Text>
                  )}
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
                  <View style={{flexDirection:"row"}}>
                 {Array.from({length: workout.rating}).map((_, index) => (
                   <Ionicons name={"star"} size={24} color="#ffb300" key={index} />
                 ))}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  ));
}
