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




export default {
  postUser,
  getUserDetails,
  patchUser,
  
};
