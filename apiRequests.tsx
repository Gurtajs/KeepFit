import axios from "axios";

export function postUser(
  email: string,
  firstName: string,
  lastName: string,
  age: string,
  profilePicture: any,
  height: string,
  heightUnit: string,
  weight: string,
  weightUnit: string
) {

  return axios
    .post(
      `https://18c1-77-102-154-75.ngrok-free.app/api/users`,
      { email, firstName, lastName, age, profilePicture, height, heightUnit, weight, weightUnit }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) =>{
      console.log(error)
    })
}

export function getUserDetails(email: string) {
  return axios
    .post(
      `https://18c1-77-102-154-75.ngrok-free.app/api/users/details`, 
      {
        email,
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error)
    })
}

export function patchUser(id: number, path: string, value: any) {
  return axios
    .patch(
      `https://18c1-77-102-154-75.ngrok-free.app/api/users/${id}`,
      [
        {
          "operationType": 0,
          "path": `/${path}`,
          "op": "replace",
          "value": value
        }
      ],
      {
        headers: {
          "Content-Type": "application/json-patch+json",
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getWorkouts() {
  return axios.get(
    `https://18c1-77-102-154-75.ngrok-free.app/api/workouts`
  ).then((response) => {
    return response.data
  }).catch((error) => {
    console.log(error)
  })
}

export function getWorkoutsByUser(id: number) {
  return axios.get(
    `https://18c1-77-102-154-75.ngrok-free.app/api/users/${id}/workouts`
  ).then((response) => {
    return response.data
  }).catch((error) => {
    console.log(error)
  })
}

export function postWorkout(muscleGroup: string, exerciseName: string, weight: string, sets: string, reps: string, workoutDate: string, rating: number, userId: number) {
  return axios.post(
    `https://18c1-77-102-154-75.ngrok-free.app/api/workouts`, {
      muscleGroup, exerciseName, weight, sets, reps, workoutDate, rating, userId
    }
  ).then((response) => {
    return response.data
  })
  .catch((error) =>{
    console.log(error)
  })
}

export function getMuscleGroups() {
  return axios.get('https://18c1-77-102-154-75.ngrok-free.app/api/musclegroups').then((response) => {
    return response.data
  }).catch((error) => {
    console.log(error)
  })
}

export function getUserWorkoutByMuscleGroup(userId: number, muscleGroup: string) {
  return axios.get(`https://18c1-77-102-154-75.ngrok-free.app/api/users/${userId}/workouts/${muscleGroup}`).then((response) => {
    return response.data
  }).catch((error) => {
    console.log(error)
  })
}

export function getWorkoutsByUserDate(id: number, date:string) {
  return axios.get(
    `https://18c1-77-102-154-75.ngrok-free.app/api/users/${id}/workouts/${date}`
  ).then((response) => {
    return response.data
  }).catch((error) => {
    console.log(error)
  })
}

export function deleteWorkoutByWorkoutId(userId: number, workoutId: number) {
  return axios.delete(
    `https://18c1-77-102-154-75.ngrok-free.app/api/users/${userId}/workouts/${workoutId}`
  ).then((response) =>{
    console.log("deleted")
  }).catch((error) => {
    console.log(error)
  })
}

export default {
  postUser,
  getUserDetails,
  patchUser,
  getWorkouts,
  getWorkoutsByUser, 
  postWorkout,
  getMuscleGroups,
  getUserWorkoutByMuscleGroup,
  getWorkoutsByUserDate,
  deleteWorkoutByWorkoutId
};
