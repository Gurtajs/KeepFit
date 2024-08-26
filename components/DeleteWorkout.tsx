import { deleteWorkoutByWorkoutId } from "../apiRequests"
import { TouchableOpacity, View, Text } from "react-native"

interface deleteProps {
  userDetails: object,
  workouts: Array<any>,
  workout: object,
  setWorkouts: React.Dispatch<React.SetStateAction<Array<string>>>
}

export default function DeleteWorkout({userDetails, setWorkouts, workouts, workout}: deleteProps) {
  const deleteWorkout = () => {
    deleteWorkoutByWorkoutId((userDetails as any).userId, (workouts as any).workoutId)
    setWorkouts(workouts.filter((workoutToDelete) => {workoutToDelete.workoutId!=(workout as any).workoutId}))
  }


  return (
    <View>
      <TouchableOpacity onPress={deleteWorkout}><Text>Delete Workout</Text></TouchableOpacity>
    </View>
  )

}
