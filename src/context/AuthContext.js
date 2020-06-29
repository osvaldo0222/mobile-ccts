import createDataContext from "./createDataContext";
import cctsApi from "../api/ccts";
import { navigate } from "../navigationRef";
import AsyncStorage from "@react-native-community/async-storage";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload, isLoading: false };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "", isLoading: false };
    case "loaded":
      return { ...state, isLoading: false };
    default:
      return state;
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

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const signup = (dispatch) => async ({ email, password }) => {
  try {
    const response = await cctsApi.post("/signup", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signin", payload: response.data.token });
    navigate("TrackList");
  } catch (error) {
    dispatch({
      type: "add_error",
      payload: error.statusText,
    });
  }
};
const signin = (dispatch) => async ({ username, password }) => {
  try {
    const response = await cctsApi.post("/login", { username, password });
    const token = response.data.result.replace("Bearer ", "");
    await AsyncStorage.setItem("token", token);
    dispatch({ type: "signin", payload: token });
  } catch (error) {
    dispatch({
      type: "add_error",
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
  { signup, signin, signout, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: "", isLoading: true }
);
