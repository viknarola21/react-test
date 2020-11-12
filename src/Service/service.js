import axios from "axios";
const API_URL = "http://localhost:4000/";

export function alarmData(data) {
  return axios
    .get(API_URL + "data")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

export function alarmOnOff(id, data) {
  return axios
    .patch(API_URL + "data/" + id, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

export function alarmDataByID(id) {
  return axios
    .get(API_URL + "data/" + id)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}
