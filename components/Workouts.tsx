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
import {
  deleteWorkoutByWorkoutId,
  getWorkoutsByUserDate,
  postWorkout,
} from "../apiRequests";
import DropDownPicker from "react-native-dropdown-picker";
import { WorkoutContext } from "./WorkoutContext";
import { Calendar, LocaleConfig } from "react-native-calendars";
import Header from "./Header";
type Props = NativeStackScreenProps<RootStackParamList, "Workouts">;
import DeleteWorkout from "./DeleteWorkout";
import AllWorkouts from "./AllWorkouts";

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
  const [value, setValue] = useState("");
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [showWorkouts, setShowWorkouts] = useState(true);
  const [workoutsByDate, setWorkoutsByDate] = useState<any[]>([]);
  const [exerciseNameError, setExerciseNameError] = useState(false);
  const [repsError, setRepsError] = useState(false);
  const [setsError, setSetsError] = useState(false);
  const [workoutDateError, setWorkoutDateError] = useState(false);
  const [workoutDateIncorrect, setWorkoutDateIncorrect] = useState(false);
  const [repsIncorrect, setRepsIncorrect] = useState(false);
  const [setsIncorrect, setSetsIncorrect] = useState(false);
  const [weightIncorrect, setWeightIncorrect] = useState(false);
  const [items, setItems] = useState([
    {
      label: "Abdominals",
      value: "Abdominals",
      labelStyle: {},
      containerStyle: {
        backgroundColor: "pink",
        height: 40,
      },
    },
    {
      label: "Back",
      value: "Back",
      labelStyle: {},
      containerStyle: {
        backgroundColor: "#d4d4f7",
        height: 40,
      },
    },
    {
      label: "Biceps",
      value: "Biceps",
      labelStyle: {},
      containerStyle: {
        backgroundColor: "#ff8f66",
        height: 40,
      },
    },
    {
      label: "Chest",
      value: "Chest",
      labelStyle: {},
      containerStyle: {
        backgroundColor: "plum",
        height: 40,
      },
    },
    {
      label: "Legs",
      value: "Legs",
      labelStyle: {},
      containerStyle: {
        backgroundColor: "lightgreen",
        height: 40,
      },
    },
    {
      label: "Shoulders",
      value: "Shoulders",
      labelStyle: {},
      containerStyle: {
        backgroundColor: "#ffffcc",
        height: 40,
      },
    },
    {
      label: "Triceps",
      value: "Triceps",
      labelStyle: {},
      containerStyle: {
        backgroundColor: "mediumturquoise",
        height: 40,
      },
    },
  ]);

  const showWorkoutForm = () => {
    setShowForm((showForm) => !showForm);
  };

  const addWorkout = () => {
    if (!exerciseName) {
      setExerciseNameError(true);
    } else {
      setExerciseNameError(false);
    }

    if (!/^\d+$/.test(weight)) {
      setWeightIncorrect(true);
    } else {
      setWeightIncorrect(false);
    }

    if (!sets) {
      setSetsError(true);
    } else {
      setSetsError(false);
    }

    if (sets.length > 0 && !/^\d+$/.test(sets)) {
      setSetsIncorrect(true);
    } else {
      setSetsIncorrect(false);
    }

    if (!reps) {
      setRepsError(true);
    } else {
      setRepsError(false);
    }
    if (reps.length > 0 && !/^\d+$/.test(reps)) {
      setRepsIncorrect(true);
    } else {
      setRepsIncorrect(false);
    }

    if (!workoutDate) {
      setWorkoutDateError(true);
    } else {
      setWorkoutDateError(false);
    }
    if (!/^\d{2}[-/]\d{2}[-/]\d{4}$/.test(workoutDate)) {
      setWorkoutDateIncorrect(true);
    } else {
      setWorkoutDateIncorrect(false);
    }

    if (
      exerciseName &&
      reps &&
      sets &&
      /^\d{2}[-/]\d{2}[-/]\d{4}$/.test(workoutDate)
    ) {
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
      setValue("");
      setExerciseName("");
      setWeight("");
      setSets("");
      setReps("");
      setWorkoutDate("");
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
        setWorkoutsByDate(response);
      });
    }
  }, [selected]);

  const showAllWorkouts = () => {
    setShowWorkouts(true);
  };

  const allDates: any[] = [];
  {
    Object.keys(groupBy).map((dates: string) =>
      allDates.push(dates.substring(0, 10))
    );
  }
  let dates: { [key: string]: any } = {};
  allDates.forEach((date: any) => {
    dates[date] = { marked: true };
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#222222" }}>
      <Header />
      <View style={{ paddingBottom: 30, flex: 1, paddingLeft: 5 }}>
        <View style={{ paddingBottom: 10 }}>
          <ScrollView>
            <Text
              style={{
                fontSize: 18,
                marginLeft: 10,
                marginTop: 5,
                marginBottom: 10,
                color: "#FAF9F6",
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
                  color: "#FAF9F6",
                }}
              >
                Add workout
              </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", paddingTop: 5, gap: 15 }}>
              <TouchableOpacity onPress={openCalendar}>
                <Text
                  style={{ marginLeft: 10, fontSize: 16, color: "#FAF9F6" }}
                >
                  Show workouts by date
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={showAllWorkouts}>
                <Text
                  style={{ fontSize: 16, marginLeft: 10, color: "#FAF9F6" }}
                >
                  Show all workouts
                </Text>
              </TouchableOpacity>
            </View>
            {showCalendar ? (
              <Calendar
                onDayPress={(day: any) => {
                  setSelected(day.dateString);
                  setShowWorkouts(false);
                  setShowCalendar(false);
                }}
                markedDates={dates}
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
                  containerStyle={{ width: 250, marginLeft: 8 }}
                  style={{
                    width: 200,
                    marginTop: 20,
                    backgroundColor:
                      value === "Abdominals"
                        ? "pink"
                        : "white" && value === "Back"
                        ? "#d4d4f7"
                        : "white" && value === "Biceps"
                        ? "#ff8f66"
                        : "white" && value === "Chest"
                        ? "plum"
                        : "white" && value === "Legs"
                        ? "lightgreen"
                        : "white" && value === "Shoulders"
                        ? "#ffffcc"
                        : "white" && value === "Triceps"
                        ? "mediumturquoise"
                        : "white",
                  }}
                  listMode="SCROLLVIEW"
                />

                <View style={{ marginLeft: 10, width: "60%" }}>
                  <TextInput
                    onChangeText={(text) => {
                      setExerciseName(text);
                    }}
                    value={exerciseName}
                    placeholder="Enter exercise name"
                    placeholderTextColor={"#FAF9F6"}
                    style={{color:'#FAF9F6'}}
                  />
                  {exerciseNameError ? (
                    <Text style={{ color: "red" }}>
                      Exercise name cannot be blank
                    </Text>
                  ) : null}
                  <TextInput
                    onChangeText={(text) => {
                      setWeight(text);
                    }}
                    value={weight}
                    placeholder="Enter weight lifted"
                    placeholderTextColor={"#FAF9F6"}
                    style={{color:'#FAF9F6'}}
                  />
                  {weight && weightIncorrect ? (
                    <Text style={{ color: "red" }}>
                      Number must be inserted
                    </Text>
                  ) : null}
                  <TextInput
                    onChangeText={(text) => {
                      setSets(text);
                    }}
                    value={sets}
                    placeholder="Enter number of sets"
                    placeholderTextColor={"#FAF9F6"}
                    style={{color:'#FAF9F6'}}
                  />
                  {setsError ? (
                    <Text style={{ color: "red" }}>
                      Number of sets cannot be blank
                    </Text>
                  ) : null}
                  {setsIncorrect ? (
                    <Text style={{ color: "red" }}>
                      Number must be inserted
                    </Text>
                  ) : null}
                  <TextInput
                    onChangeText={(text) => {
                      setReps(text);
                    }}
                    value={reps}
                    placeholder="Enter number of reps"
                    placeholderTextColor={"#FAF9F6"}
                    style={{color:'#FAF9F6'}}
                  />
                  {repsError ? (
                    <Text style={{ color: "red" }}>
                      Number of reps cannot be blank
                    </Text>
                  ) : null}
                  {repsIncorrect ? (
                    <Text style={{ color: "red" }}>
                      Number must be inserted
                    </Text>
                  ) : null}
                  <TextInput
                    onChangeText={(text) => {
                      setWorkoutDate(text);
                    }}
                    value={workoutDate}
                    placeholder="Enter workout date DD-MM-YYYY"
                    placeholderTextColor={"#FAF9F6"}
                    style={{color:'#FAF9F6'}}
                  />
                  {workoutDateError ? (
                    <Text style={{ color: "red" }}>
                      Workout date cannot be blank
                    </Text>
                  ) : null}
                  {workoutDateIncorrect ? (
                    <Text style={{ color: "red" }}>
                      Workout date needs to be in this format DD-MM-YYYY
                    </Text>
                  ) : null}
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
                      color: "#FAF9F6",
                    }}
                  >
                    Add
                  </Text>
                </TouchableOpacity>
              </>
            ) : null}
            {showWorkouts ? (
              <AllWorkouts workoutsByDate={workoutsByDate} groupBy={groupBy}/>
            ) : workoutsByDate.length > 0 ? (
              <AllWorkouts workoutsByDate={workoutsByDate} groupBy={groupByDate}/>
            ) : (
              <View>
                <Text
                  style={{
                    flex: 1,
                    textAlign: "center",
                    marginTop: "50%",
                    color: "#FAF9F6",
                  }}
                >
                  No workouts to display
                </Text>
              </View>
            )}
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
    </View>
  );
}
