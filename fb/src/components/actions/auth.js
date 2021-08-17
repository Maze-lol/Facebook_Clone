import * as api from "../api/index.js";
import { AUTH, ERROR } from "../../constant/actionTypes";
import axios from "axios";

export const signup = (formData, navigation) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    navigation.navigate("navigation");
  } catch (error) {
    console.log(error);
  }
};

export const login = (formData, navigation) => async (dispatch) => {
  axios
    .post("http://192.168.100.76:5000/api/auth/login/", formData)
    .then((res) => {
      dispatch({
        type: AUTH,
        payload: res.data,
      });
      navigation.navigate("navigation");
    })
    .catch((error) => {
      const errors = {
        msg: error.response.data,
        status: error.response.status,
      };
      dispatch({
        type: ERROR,
        payload: errors,
      });
    });
};
