import axios from 'axios'

export function postUser(firstName: string, lastName: string, age: string, profilePicture: any, height: string, weight: string) {
  return axios.post(`https://keepfitsite-a7fyg4fmc9dracam.ukwest-01.azurewebsites.net/api/users`, {firstName, lastName, age, profilePicture, height, weight})
  .then((response) => {
    console.log(response.data)
    return response.data
  })
}

export function getUserDetails(email:any) {
  return axios.post(`https://keepfitsite-a7fyg4fmc9dracam.ukwest-01.azurewebsites.net/api/users/details`, {
    email
  })
  .then((response) => {
    return response.data
  })
}

export default {postUser, getUserDetails}