import { deleteWorkoutByWorkoutId } from "../apiRequests"
import { TouchableOpacity, View, Text } from "react-native"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface deleteProps {
  userDetails: object,
  workouts: Array<any>,
  workout: object,
  setWorkouts: React.Dispatch<React.SetStateAction<Array<string>>>
}

export default function DeleteWorkout({userDetails, setWorkouts, workouts, workout}: deleteProps) {
  
  
  const deleteWorkout = () => {
    deleteWorkoutByWorkoutId((userDetails as any).userId, (workout as any).workoutId)
    const updatedWorkouts = workouts.filter((singleWorkout) => 
    singleWorkout.workoutId!==(workout as any).workoutId
    )
    setWorkouts(updatedWorkouts)
  }


  return (
    <View style={{position:"absolute", bottom:0, right:0}}>
      <TouchableOpacity onPress={deleteWorkout}><MaterialIcons name="delete" size={24} color="black" />
      </TouchableOpacity>
    </View>
  )

}
