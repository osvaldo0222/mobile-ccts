import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-community/async-storage";
import cctsApi from "../api/ccts";

const expositionReducer = (state, action) => {
  switch (action.type) {
    case "fetch_exposition":
      return {
        ...state,
        exposition: state.exposition.length
          ? [...state.exposition, ...action.payload]
          : action.payload,
      };
    case "fetch_status":
      return {
        ...state,
        status: action.payload,
      };
    case "clear_context":
      return {
        exposition: [],
        status: {
          percentage: 0,
          comment: "",
        },
      };
    case "clear_exposition":
      return {
        ...state,
        exposition: [],
      };
    default:
      return state;
  }
};

const fetchExposition = (dispatch) => async (page = 0) => {
  try {
    const response = await cctsApi.get(
      `/api/user/getExposition?page=${page}`,
      null
    );

    if (page === 0) {
      dispatch({ type: "clear_exposition" });
    }

    let expositionOriginal = response.data.result;

    for (let i = 0; i < expositionOriginal.length; i++) {
      let timeArrived = new Date(expositionOriginal[i].visit.timeArrived);
      let timeLeft = new Date(expositionOriginal[i].visit.timeLeft);
      let timeExposition = new Date(expositionOriginal[i].date);
      expositionOriginal[i].visit.timeArrived = dateAndTimeFormatter(
        timeArrived
      );
      expositionOriginal[i].visit.timeLeft = dateAndTimeFormatter(timeLeft);
      expositionOriginal[i].date = dateAndTimeFormatter(timeExposition);
    }

    dispatch({
      type: "fetch_exposition",
      payload: expositionOriginal,
    });
  } catch (error) {
    //ERROR REQUEST
  }
};

const fetchStatus = (dispatch) => async () => {
  try {
    const response = await cctsApi.get(`/api/user/getStatus`, null);
    await AsyncStorage.setItem("status", JSON.stringify(response.data.result));
    dispatch({
      type: "fetch_status",
      payload: response.data.result,
    });
  } catch (error) {
    const tempStatus = await AsyncStorage.getItem("status");
    dispatch({
      type: "fetch_status",
      payload: JSON.parse(tempStatus),
    });
  }
};

const dateAndTimeFormatter = (time) => {
  return `${time.getUTCDate()}/${
    time.getUTCMonth() + 1
  }/${time.getUTCFullYear()} ${
    time.getUTCHours() < 10 ? `0${time.getUTCHours()}` : time.getUTCHours()
  }:${
    time.getUTCMinutes() < 10
      ? `0${time.getUTCMinutes()}`
      : time.getUTCMinutes()
  }`;
};

const clearExpositionContext = (dispatch) => async () => {
  await AsyncStorage.removeItem("status");
  dispatch({ type: "clear_context" });
};

export const { Provider, Context } = createDataContext(
  expositionReducer,
  { fetchExposition, fetchStatus, clearExpositionContext },
  {
    exposition: [],
    status: {
      percentage: 0,
      comment: "bajo",
    },
  }
);
