import createDataContext from "./createDataContext";
import cctsApi from "../api/ccts";

const statisticsReducer = (state, action) => {
  switch (action.type) {
    case "clear_context":
      return {
        infected: { dates: [], labels: [], data: [], total: 0, newCases: 0 },
        recovered: { dates: [], labels: [], data: [], total: 0, newCases: 0 },
        deaths: { dates: [], labels: [], data: [], total: 0, newCases: 0 },
      };
    case "fetch_infected":
      return { ...state, infected: action.payload };
    case "fetch_recovered":
      return { ...state, recovered: action.payload };
    case "fetch_death":
      return { ...state, deaths: action.payload };
    default:
      return state;
  }
};

const subtractStatistics = (result) => {
  let dates = [];
  let labels = [];
  let data = [];
  let total = 0;
  let newCases = 0;
  let count = 0;

  result.reverse().forEach((element) => {
    dates.push(element[0]);
    data.push(element[1]);
    count++;
    if (
      count === 1 ||
      count === 0.5 * result.length ||
      count === result.length
    ) {
      labels.push(count);
    } else {
      labels.push("");
    }
  });

  total = data[data.length - 1];
  newCases = data[data.length - 1] - data[data.length - 2];
  
  return { dates, labels, data, total, newCases };
};

const fetchInfected = (dispatch) => async (days = 10) => {
  try {
    const response = await cctsApi.get(
      `/api/statistics/infected/${days}`,
      null
    );
    dispatch({
      type: "fetch_infected",
      payload: subtractStatistics(response.data.result),
    });
  } catch (error) {
    //ERROR REQUEST
  }
};

const fetchRecovered = (dispatch) => async (days = 10) => {
  try {
    const response = await cctsApi.get(
      `/api/statistics/recovered/${days}`,
      null
    );
    dispatch({
      type: "fetch_recovered",
      payload: subtractStatistics(response.data.result),
    });
  } catch (error) {
    //ERROR REQUEST
  }
};

const fetchDeaths = (dispatch) => async (days = 10) => {
  try {
    const response = await cctsApi.get(`/api/statistics/death/${days}`, null);
    dispatch({
      type: "fetch_death",
      payload: subtractStatistics(response.data.result),
    });
  } catch (error) {
    //ERROR REQUEST
  }
};

const clearStatisticsContext = (dispatch) => () => {
  dispatch({ type: "clear_context" });
};

export const { Provider, Context } = createDataContext(
  statisticsReducer,
  { fetchInfected, fetchRecovered, fetchDeaths, clearStatisticsContext },
  {
    infected: { dates: [], labels: [], data: [], total: 0, newCases: 0 },
    recovered: { dates: [], labels: [], data: [], total: 0, newCases: 0 },
    deaths: { dates: [], labels: [], data: [], total: 0, newCases: 0 },
  }
);
