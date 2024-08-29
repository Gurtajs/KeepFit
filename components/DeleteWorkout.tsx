import { deleteWorkoutByWorkoutId } from "../apiRequests";
import { TouchableOpacity, View, Text, Modal } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";

interface deleteProps {
  userDetails: object;
  workouts: Array<any>;
  workout: object;
  setWorkouts: React.Dispatch<React.SetStateAction<Array<string>>>;
}

export default function DeleteWorkout({
  userDetails,
  setWorkouts,
  workouts,
  workout,
}: deleteProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const openPopUp = () => {
    setModalVisible(true);
  };
  const deleteWorkout = () => {
    deleteWorkoutByWorkoutId(
      (userDetails as any).userId,
      (workout as any).workoutId
    );
    const updatedWorkouts = workouts.filter(
      (singleWorkout) => singleWorkout.workoutId !== (workout as any).workoutId
    );
    setWorkouts(updatedWorkouts);
  };

  return (
    <View style={{ position: "absolute", bottom: 0, right: 0 }}>
      <TouchableOpacity onPress={openPopUp}>
        <MaterialIcons name="delete" size={22} color="black" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#383838",
              borderRadius: 20,
              padding: 25,
              alignItems: "center",
              shadowRadius: 4,
              elevation: 5,
              width: "60%",
              marginTop: 60,
            }}
          >
            <Text style={{ color: "#FAF9F6" }}>
              Are you sure you want to delete this workout?
            </Text>
            <View style={{ flexDirection: "row", alignContent: "center", gap:60, marginTop:10 }}>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{borderRadius: 3,
                        borderColor: "black",
                        backgroundColor: "#686868",
                        padding:5,
                        borderStyle: "solid"}}>
                <Text style={{ color: "#FAF9F6" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={deleteWorkout} style={{
                        borderRadius: 3,
                        borderColor: "black",
                        backgroundColor: "#FF3333",
                        padding:5,
                        borderStyle: "solid"   
                      }}>
                <Text
                  style={{
                    color: "#FAF9F6",
                    
                  }}
                >
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
