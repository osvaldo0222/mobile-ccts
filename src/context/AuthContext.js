import createDataContext from "./createDataContext";
import cctsApi from "../api/ccts";
import { navigate } from "../navigationRef";
import AsyncStorage from "@react-native-community/async-storage";
import { Notifications } from "expo";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_login_error":
      return {
        ...state,
        errorMessages: { ...state.errorMessages, login: action.payload },
      };
    case "add_id_error":
      return {
        ...state,
        errorMessages: { ...state.errorMessages, id: action.payload },
      };
    case "confirm_id":
      return {
        ...state,
        errorMessages: { ...state.errorMessages, id: "" },
      };
    case "add_email_error":
      return {
        ...state,
        errorMessages: { ...state.errorMessages, email: action.payload },
      };
    case "confirm_email":
      return {
        ...state,
        errorMessages: { ...state.errorMessages, email: "" },
      };
    case "add_username_error":
      return {
        ...state,
        errorMessages: { ...state.errorMessages, username: action.payload },
      };
    case "confirm_username":
      return {
        ...state,
        errorMessages: { ...state.errorMessages, username: "" },
      };
    case "signin":
      return {
        errorMessages: {
          username: "",
          email: "",
          id: "",
          login: "",
        },
        token: action.payload,
        isLoading: false,
      };
    case "clear_error_message":
      return {
        ...state,
        errorMessages: {
          username: "",
          email: "",
          id: "",
          login: "",
        },
      };
    case "signout":
      return {
        token: null,
        errorMessages: {
          username: "",
          email: "",
          id: "",
          login: "",
        },
        isLoading: false,
      };
    case "loaded":
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

const login = async ({ username, password }) => {
  try {
    let notToken = await Notifications.getExpoPushTokenAsync();
    const response = await cctsApi.post(
      "/login",
      { username, password },
      {
        headers: {
          NotificationToken: notToken,
        },
      }
    );
    const token = response.data.result.replace("Bearer ", "");
    await AsyncStorage.setItem("token", token);
    return token;
  } catch (error) {
    return Promise.reject(error);
  }
};

const confirmId = (dispatch) => async ({ id }) => {
  try {
    await cctsApi.post(
      `/public/checkPersonalIdentifier/${id.replace("-", "").replace("-", "")}`
    );
    dispatch({ type: "confirm_id" });
  } catch (error) {
    dispatch({
      type: "add_id_error",
      payload: error.statusText,
    });
  }
};

const confirmUsername = (dispatch) => async ({ username }) => {
  try {
    await cctsApi.post(`/public/checkUsername/${username}`);
    dispatch({ type: "confirm_username" });
  } catch (error) {
    dispatch({
      type: "add_username_error",
      payload: error.statusText,
    });
  }
};

const confirmEmail = (dispatch) => async ({ email }) => {
  try {
    await cctsApi.post(`/public/checkEmail/${email}`);
    dispatch({ type: "confirm_email" });
  } catch (error) {
    dispatch({
      type: "add_email_error",
      payload: error.statusText,
    });
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  dispatch({ type: "loaded", payload: token });
  if (token) {
    dispatch({ type: "signin", payload: token });
  } else {
    navigate("LoginFlow");
  }
};

const clearErrorMessages = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const signup = (dispatch) => async ({ id, email, username, password }) => {
  try {
    await cctsApi.post("/public/signup", {
      personalIdentifier: id.replace("-", "").replace("-", ""),
      email,
      username,
      password,
    });
    const token = await login({ username, password });
    dispatch({ type: "signin", payload: token });
  } catch (error) {
    dispatch({
      type: "add_login_error",
      payload: error.statusText,
    });
  }
};

const signin = (dispatch) => async ({ username, password }) => {
  try {
    const token = await login({ username, password });
    dispatch({ type: "signin", payload: token });
  } catch (error) {
    dispatch({
      type: "add_login_error",
      payload: error.statusText,
    });
  }
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signup,
    signin,
    signout,
    clearErrorMessages,
    tryLocalSignin,
    confirmEmail,
    confirmId,
    confirmUsername,
  },
  {
    token: null,
    errorMessages: {
      username: "",
      email: "",
      id: "",
      login: "",
    },
    isLoading: true,
  }
);
