import axios from "axios";

export function postUser(
  email: string,
  firstName: string,
  lastName: string,
  age: string,
  profilePicture: any,
  height: string,
  weight: string
) {
  return axios
    .post(
      `https://keepfitsite-a7fyg4fmc9dracam.ukwest-01.azurewebsites.net/api/users`,
      { email, firstName, lastName, age, profilePicture, height, weight }
    )
    .then((response) => {
      return response.data;
    });
}

export function getUserDetails(email: string) {
  return axios
    .post(
      `https://keepfitsite-a7fyg4fmc9dracam.ukwest-01.azurewebsites.net/api/users/details`,
      {
        email,
      }
    )
    .then((response) => {
      return response.data;
    });
}

export function patchUser(id: number, path: string, value: any) {
  return axios
    .patch(
      `https://keepfitsite-a7fyg4fmc9dracam.ukwest-01.azurewebsites.net/api/users/${id}`,
      [
        {
          operationType: 0,
          path: `/${path}`,
          op: "replace",
          value: value,
        },
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
    `https://keepfitsite-a7fyg4fmc9dracam.ukwest-01.azurewebsites.net/api/workouts`
  ).then((response) => {
    return response.data
  }).catch((error) => {
    console.log(error)
  })
}

export function getWorkoutsByUser(id: number) {
  return axios.get(
    `https://keepfitsite-a7fyg4fmc9dracam.ukwest-01.azurewebsites.net/api/users/${id}/workouts`
  ).then((response) => {
    return response.data
  }).catch((error) => {
    console.log(error)
  })
}

export function postWorkout(muscleGroup: string, exerciseName: string, weight: string, sets: string, reps: string, workoutDate: string, userId: number) {
  return axios.post(
    `https://keepfitsite-a7fyg4fmc9dracam.ukwest-01.azurewebsites.net/api/workouts`, {
      muscleGroup, exerciseName, weight, sets, reps, workoutDate, userId
    }
  ).then((response) => {
    return response.data
  })
}

export function getMuscleGroups() {
  return axios.get('https://keepfitsite-a7fyg4fmc9dracam.ukwest-01.azurewebsites.net/api/musclegroups').then((response) => {
    console.log(response.data)
    return response.data
  }).catch((error) => {
    console.log(error)
  })
}

export function getUserWorkoutByMuscleGroup(userId: number, muscleGroup: string) {
  return axios.get(`https://keepfitsite-a7fyg4fmc9dracam.ukwest-01.azurewebsites.net/api/users/${userId}/workouts/${muscleGroup}`).then((response) => {
    return response.data
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
  getUserWorkoutByMuscleGroup
};
