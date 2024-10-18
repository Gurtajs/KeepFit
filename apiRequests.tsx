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
      `https://54fc-77-102-154-75.ngrok-free.app/api/users`,
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
      `https://54fc-77-102-154-75.ngrok-free.app/api/users/details`, 
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
      `https://54fc-77-102-154-75.ngrok-free.app/api/users/${id}`,
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
    `https://54fc-77-102-154-75.ngrok-free.app/api/workouts`
  ).then((response) => {
    return response.data
  }).catch((error) => {
    console.log(error)
  })
}

export function getWorkoutsByUser(id: number) {
  return axios.get(
    `https://54fc-77-102-154-75.ngrok-free.app/api/users/${id}/workouts`
  ).then((response) => {
    return response.data
  }).catch((error) => {
    console.log(error)
  })
}

export function postWorkout(muscleGroup: string, exerciseName: string, weight: string, sets: string, reps: string, workoutDate: string, rating: number, userId: number) {
  return axios.post(
    `https://54fc-77-102-154-75.ngrok-free.app/api/workouts`, {
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
  return axios.get('https://54fc-77-102-154-75.ngrok-free.app/api/musclegroups').then((response) => {
    return response.data
  }).catch((error) => {
    console.log(error)
  })
}

export function getUserWorkoutByMuscleGroup(userId: number, muscleGroup: string) {
  return axios.get(`https://54fc-77-102-154-75.ngrok-free.app/api/users/${userId}/workouts/${muscleGroup}`).then((response) => {
    return response.data
  }).catch((error) => {
    console.log(error)
  })
}

export function getWorkoutsByUserDate(id: number, date:string) {
  return axios.get(
    `https://54fc-77-102-154-75.ngrok-free.app/api/users/${id}/workouts/${date}`
  ).then((response) => {
    return response.data
  }).catch((error) => {
    console.log(error)
  })
}

export function deleteWorkoutByWorkoutId(userId: number, workoutId: number) {
  return axios.delete(
    `https://54fc-77-102-154-75.ngrok-free.app/api/users/${userId}/workouts/${workoutId}`
  ).then((response) =>{
    console.log("deleted")
  }).catch((error) => {
    console.log(error)
  })
}

export function postNutritionalGoals(calories: string, protein: string, carbs: string, fat: string, newDate:string, userId: number) {
  console.log(newDate)
  return axios.post(
    `https://54fc-77-102-154-75.ngrok-free.app/api/nutrigoals`, {
      calories, protein, carbs, fat, newDate, userId
    }
  ).then((response) =>{
    console.log(response.data)
    return response.data
  }).catch((error) => {
    console.log(error)
  })
}

export function getProductInfo(barcode:number) {
  return axios.get(
    `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
  ).then((response) => {
    console.log(response.data.product)
    return response.data.product
  }).catch((error)=> {
    console.log(error)
  })
}

export function postMeal(mealName: string, mealTime: string, quantity: string, calories: string, carbs: string, fats: string, protein: string, mealDate: Date, userId:number) {
  return axios.post('https://54fc-77-102-154-75.ngrok-free.app/api/meals', {
    mealName, mealTime, quantity, calories, carbs, fats, protein, mealDate, userId
  }).then((response) => {
    console.log(response.data)
    return response.data
  }).catch((error) => {
    console.log(error)
  })
}

export function getMealsByDate(userId: number, mealDate: string) {
  return axios.get(`https://54fc-77-102-154-75.ngrok-free.app/api/users/${userId}/meals/${mealDate}`).then((response) => {
    console.log("this", response.data)
    return response.data
  }).catch((error) => {
    console.log(error)
  })
} 

export function deleteMealByMealId(userId: number, mealId:number) {
  return axios.delete(
    `https://54fc-77-102-154-75.ngrok-free.app/api/users/${userId}/meals/${mealId}`
  ).then((response) =>{
    console.log("deleted")
  }).catch((error) => {
    console.log(error)
  })
}

export function getDailyGoals(userId: number) {
  return axios.get(
    `https://54fc-77-102-154-75.ngrok-free.app/api/nutrigoals/${userId}`
  ).then((response) => {
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
  getUserWorkoutByMuscleGroup,
  getWorkoutsByUserDate,
  deleteWorkoutByWorkoutId,
  getProductInfo,
  deleteMealByMealId
};
