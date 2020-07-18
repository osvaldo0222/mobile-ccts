import createDataContext from "./createDataContext";
import cctsApi from "../api/ccts";

const visitReducer = (state, action) => {
  switch (action.type) {
    case "fetch_visits":
      return {
        ...state,
        visits: state.visits.length
          ? [...state.visits, ...action.payload]
          : action.payload,
      };
    case "clear_context":
      return {
        visits: [],
      };
    default:
      return state;
  }
};

const fetchVisits = (dispatch) => async (page = 0, search = "") => {
  try {
    const response = await cctsApi.get(
      `/api/user/getVisits?page=${page}&search=${search}`,
      null
    );

    if (page === 0) {
      dispatch({ type: "clear_context" });
    }

    let visitsOriginal = response.data.result;

    for (let i = 0; i < visitsOriginal.length; i++) {
      let timeArrived = new Date(visitsOriginal[i].timeArrived);
      let timeLeft = new Date(visitsOriginal[i].timeLeft);
      visitsOriginal[i].timeArrived = dateAndTimeFormatter(timeArrived);
      visitsOriginal[i].timeLeft = dateAndTimeFormatter(timeLeft);
    }

    dispatch({ type: "fetch_visits", payload: visitsOriginal });
  } catch (error) {
    //ERROR REQUEST
  }
};

const dateAndTimeFormatter = (time) => {
  return `${time.getDate()}/${time.getMonth()}/${time.getFullYear()} ${
    time.getHours() < 10 ? `0${time.getHours()}` : time.getHours()
  }:${time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()}`;
};

const clearVisitContext = (dispatch) => () => {
  dispatch({ type: "clear_context" });
};

export const { Provider, Context } = createDataContext(
  visitReducer,
  { fetchVisits, clearVisitContext },
  { visits: [] }
);
