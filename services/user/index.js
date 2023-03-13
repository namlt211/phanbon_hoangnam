import axios from "axios";
import Cookies from "js-cookie";
import { LOGIN_URL } from "../../config";

export const loginApi = async (username, password) => {
  let user;
  const params = {
    user_name: username,
    password: password,
  };
  await axios
    .post(LOGIN_URL, params)
    .then((response) => {
      user = response.data;
    })
    .catch((err) => {
      return (user = err.message);
    });
  return user;
};

export const registerApi = (user) => {};
