import axios from "axios";
import { UserRequest } from "./types/user";

export const login = (info: UserRequest) => {
  console.log(info);
  return axios.post('/api/login', info)
  .then(response => response.data);
}

export const register = (info: UserRequest) => {
  return axios.post('/api/register', info)
  .then(response => response.data);
}