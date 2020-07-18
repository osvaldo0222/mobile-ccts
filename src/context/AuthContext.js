import createDataContext from "./createDataContext";
import cctsApi from "../api/ccts";
import { navigate } from "../navigationRef";
import AsyncStorage from "@react-native-community/async-storage";

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
    case "add_notification_token":
      return {
        ...state,
        notificationToken: action.payload,
      };
    case "signin":
      return {
        ...state,
        errorMessages: {
          username: "",
          email: "",
          id: "",
          login: "",
        },
        token: action.payload.token,
        uuid: action.payload.uuid,
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
        ...state,
        token: null,
        uuid: null,
        notificationToken: null,
        errorMessages: {
          username: "",
          email: "",
          id: "",
          login: "",
        },
      };
    case "loaded":
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

const confirmId = (dispatch) => async ({ id }) => {
  id = id.replace("-", "").replace("-", "");

  try {
    if (id.match(/^[0-9]+$/) && id.length == 11) {
      await cctsApi.post(`/api/public/checkPersonalIdentifier/${id}`);
      dispatch({ type: "confirm_id" });
    } else {
      dispatch({
        type: "add_id_error",
        payload: "Su cédula debe ser valida.",
      });
    }
  } catch (error) {
    dispatch({
      type: "add_id_error",
      payload: error.statusText,
    });
  }
};

const confirmUsername = (dispatch) => async ({ username }) => {
  try {
    if (username.match(/^[a-zA-Z0-9]*$/) && username.length > 0) {
      await cctsApi.post(`/api/public/checkUsername/${username}`);
      dispatch({ type: "confirm_username" });
    } else {
      dispatch({
        type: "add_username_error",
        payload: "Nombre de usuario invalido",
      });
    }
  } catch (error) {
    dispatch({
      type: "add_username_error",
      payload: error.statusText,
    });
  }
};

/** TODO: search for a email validation API */
const confirmEmail = (dispatch) => async ({ email }) => {
  try {
    if (email.length > 0) {
      await cctsApi.post(`/api/public/checkEmail/${email}`);
      dispatch({ type: "confirm_email" });
    } else {
      dispatch({
        type: "add_email_error",
        payload: "Correo invalido",
      });
    }
  } catch (error) {
    dispatch({
      type: "add_email_error",
      payload: error.statusText,
    });
  }
};

const clearErrorMessages = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const setNotificationToken = (dispatch) => ({ notificationToken }) => {
  dispatch({ type: "add_notification_token", payload: notificationToken });
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  const uuid = await AsyncStorage.getItem("uuid");
  dispatch({ type: "loaded" });
  if (token && uuid) {
    dispatch({ type: "signin", payload: { token, uuid } });
  } else {
    navigate("LoginFlow");
  }
};

const login = async ({ username, password, notificationToken }) => {
  try {
    const response = await cctsApi.post(
      "/login",
      { username, password },
      {
        headers: {
          NotificationToken: notificationToken ? notificationToken : "",
        },
      }
    );
    const token = response.data.result.replace("Bearer ", "");
    const uuid = response.headers.uuid;
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("uuid", uuid);
    return { token, uuid };
  } catch (error) {
    return Promise.reject(error);
  }
};

const signup = (dispatch) => async ({
  id,
  email,
  username,
  password,
  notificationToken,
}) => {
  id = id.replace("-", "").replace("-", "");

  try {
    await cctsApi.post("/api/public/signup", {
      personalIdentifier: id,
      email,
      username,
      password,
    });
    const { token, uuid } = await login({
      username,
      password,
      notificationToken,
    });
    dispatch({ type: "signin", payload: { token, uuid } });
  } catch (error) {
    dispatch({
      type: "add_login_error",
      payload: error.statusText,
    });
  }
};

const signin = (dispatch) => async ({
  username,
  password,
  notificationToken,
}) => {
  try {
    const { token, uuid } = await login({
      username,
      password,
      notificationToken,
    });
    dispatch({ type: "signin", payload: { token, uuid } });
  } catch (error) {
    dispatch({
      type: "add_login_error",
      payload: error.statusText,
    });
  }
};

const signout = (dispatch) => async ({ notificationToken }) => {
  try {
    if (notificationToken) {
      await cctsApi.put("/api/user/signout", null, {
        headers: {
          NotificationToken: notificationToken,
        },
      });
    }
  } catch (error) {
    console.log("Notification can't detached!");
  } finally {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("uuid");
    dispatch({ type: "signout" });
  }
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
    setNotificationToken,
  },
  {
    token: null,
    uuid: null,
    notificationToken: null,
    isLoading: true,
    errorMessages: {
      username: "",
      email: "",
      id: "",
      login: "",
    },
  }
);
