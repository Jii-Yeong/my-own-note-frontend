import axios from "axios";
import { LoginInfo } from "./types/user";

export const login = (info: LoginInfo) => {
  console.log(info);
  return axios.post('/api/login', info)
  .then(response => response.data);
}