import { useState, useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../app/index";
import { Footer } from "./Footer";
import { getWorkoutsByUserDate, postWorkout } from "../apiRequests";
import DropDownPicker from "react-native-dropdown-picker";
import { WorkoutContext } from "./WorkoutContext";
import { Calendar, LocaleConfig } from "react-native-calendars";

type Props = NativeStackScreenProps<RootStackParamList, "Workouts">;

export default function Workouts({ navigation }: Props) {
  const { workouts, setWorkouts } = useContext(WorkoutContext);

  const [exerciseName, setExerciseName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [workoutDate, setWorkoutDate] = useState("");
  const [muscleGroups, setMuscleGroups] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [showWorkouts, setShowWorkouts] = useState(true)
  const [workoutsByDate, setWorkoutsByDate] = useState<any[]>([])

  const [items, setItems] = useState([
    { label: "Abdominals", value: "Abdominals" },
    { label: "Back", value: "Back" },
    { label: "Biceps", value: "Biceps" },
    { label: "Chest", value: "Chest" },
    { label: "Legs", value: "Legs" },
    { label: "Shoulders", value: "Shoulders" },
    { label: "Triceps", value: "Triceps" },
  ]);

  const showWorkoutForm = () => {
    setShowForm((showForm) => !showForm);
  };

  const addWorkout = () => {
    if (value) {
      postWorkout(
        value,
        exerciseName,
        weight,
        sets,
        reps,
        formatDate,
        (userDetails as any).userId
      ).then((response) => {
        setWorkouts([response, ...workouts]);
      });
    }
  };

  const openCalendar = () => {
    setShowCalendar((showCalendar) => !showCalendar);
  };

  const formatDate =
    workoutDate[3] +
    workoutDate[4] +
    "-" +
    workoutDate[0] +
    workoutDate[1] +
    "-" +
    workoutDate[6] +
    workoutDate[7] +
    workoutDate[8] +
    workoutDate[9];

  const groupBy = workouts.reduce((acc, obj) => {
    if (!acc[obj.workoutDate]) acc[obj.workoutDate] = {};
    if (!acc[obj.workoutDate][obj.muscleGroup])
      acc[obj.workoutDate][obj.muscleGroup] = [];
    acc[obj.workoutDate][obj.muscleGroup].push(obj);
    return acc;
  }, {});

  const groupByDate = workoutsByDate.reduce((acc, obj) => {
    if (!acc[obj.workoutDate]) acc[obj.workoutDate] = {};
    if (!acc[obj.workoutDate][obj.muscleGroup])
      acc[obj.workoutDate][obj.muscleGroup] = [];
    acc[obj.workoutDate][obj.muscleGroup].push(obj);
    return acc;
  }, {});

  useEffect(() => {
    if (selected) {
      getWorkoutsByUserDate(
        (userDetails as any).userId,
        `${selected}T00:00:00`
      ).then((response: any) => {
        setWorkoutsByDate(response)
      });
    }
  }, [selected]);

  const showAllWorkouts = () => {
    setShowWorkouts(true)
  }

  return (
    <View style={{ paddingBottom: 30, flex: 1, paddingLeft: 5 }}>
      <View style={{ paddingBottom: 10 }}>
        <ScrollView>
          <Text
            style={{
              fontSize: 18,
              marginLeft: 10,
              marginTop: 5,
              marginBottom: 10,
            }}
          >
            Workouts
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
          <View style={{flexDirection:"row", paddingTop: 5, gap:15}}>
          <TouchableOpacity onPress={openCalendar}>
            <Text style={{ marginLeft: 10, fontSize: 16}}>
              Show workout by date
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={showAllWorkouts}><Text style={{fontSize:16, marginLeft:10}}>Show all workouts</Text></TouchableOpacity>
          </View>
          {showCalendar ? (
            <Calendar
              onDayPress={(day: any) => {
                setSelected(day.dateString);
                setShowWorkouts(false)
                setShowCalendar(false)
              }}
              markedDates={{
                [selected]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedDotColor: "orange",
                },
              }}
            />
          ) : null}
          {showForm ? (
            <>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="Select a muscle group"
                containerStyle={{ width: 300, marginLeft: 8 }}
                style={{
                  width: 200,
                  marginTop: 20,
                  backgroundColor: "lightgray",
                }}
                listMode="SCROLLVIEW"
              />

              <View style={{ marginLeft: 10, width: "50%" }}>
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
              </View>
              <TouchableOpacity onPress={addWorkout}>
                <Text
                  style={{
                    marginLeft: 10,
                    borderWidth: 2,
                    borderColor: "darkgrey",
                    borderStyle: "solid",
                    borderRadius: 5,
                    width: 60,
                    fontSize: 12,
                    padding: 2,
                    textAlign: "center",
                  }}
                >
                  Add
                </Text>
              </TouchableOpacity>
            </>
          ) : null}
          {showWorkouts ? 
          Object.keys(groupBy).map((dates: string) => (
            <View key={dates}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  marginLeft: 10,
                  marginTop: 10,
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
                        <Text style={{ marginTop: 2 }} key={workout.workoutId}>
                          {workout.exerciseName}
                        </Text>
                        <Text>Weight: {workout.weight}kg</Text>
                        <Text>Sets: {workout.sets}</Text>
                        <Text>Reps: {workout.reps}</Text>
                        <Text style={{ marginBottom: 10 }}>
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
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          ))
          : workoutsByDate.length>0 ? Object.keys(groupByDate).map((dates: string) => (
            <View key={dates}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  marginLeft: 10,
                  marginTop: 10,
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
              {Object.keys(groupByDate[dates]).map((muscleGroup: any) => (
                <View key={`${dates}-${muscleGroup}`}>
                  <Text style={{ marginLeft: 10, fontSize: 16 }}>
                    {muscleGroup}
                  </Text>
                  <View style={{ marginBottom: 10, marginLeft: 10 }}>
                    {groupByDate[dates][muscleGroup].map((workout: any) => (
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
                        <Text style={{ marginTop: 2 }} key={workout.workoutId}>
                          {workout.exerciseName}
                        </Text>
                        <Text>Weight: {workout.weight}kg</Text>
                        <Text>Sets: {workout.sets}</Text>
                        <Text>Reps: {workout.reps}</Text>
                        <Text style={{ marginBottom: 10 }}>
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
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )) : null}
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
  );
}
