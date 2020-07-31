import createDataContext from "./createDataContext";
import cctsApi from "../api/ccts";
import { navigate } from "../navigationRef";

const healthStatusReducer = (state, action) => {
  switch (action.type) {
    case "clear_context":
      return { healthStatus: [], error: null, newData: false };
    case "fetch_health_status":
      return {
        ...state,
        healthStatus: state.healthStatus.length
          ? [...state.healthStatus, ...action.payload]
          : action.payload,
        newData: false,
      };
    case "error":
      return {
        ...state,
        error: action.payload,
      };
    case "clear_error":
      return {
        ...state,
        error: null,
      };
    case "add_new":
      return {
        ...state,
        newData: true,
      };
    default:
      return state;
  }
};

const fetchHealthStatus = (dispatch) => async (page = 0) => {
  try {
    const response = await cctsApi.get(
      `/api/user/getHealthStatus?page=${page}`,
      null
    );
    let data = response.data.result;
    data.forEach((item) => {
      let symptons = 0;
      for (const [key, value] of Object.entries(item)) {
        if (key === "id" || key === "statusDate" || key === "status") {
          continue;
        } else {
          if (value === true) {
            symptons++;
          }
        }
      }
      item["symptons"] = symptons;
      item["statusDate"] = new Date(item["statusDate"])
        .toUTCString()
        .replace("GMT", "");
    });

    if (page === 0) {
      dispatch({
        type: "clear_context",
      });
    }

    dispatch({
      type: "fetch_health_status",
      payload: data,
    });
  } catch (error) {
    //ERROR
  }
};

const submitHealthStatus = (dispatch) => async ({
  fever,
  cough,
  breathDifficulty,
  soreThroat,
  smellLoss,
  tasteLoss,
}) => {
  try {
    await cctsApi.post(`/api/user/addHealthStatus`, {
      fever,
      cough,
      breathDifficulty,
      soreThroat,
      smellLoss,
      tasteLoss,
    });
    dispatch({
      type: "clear_error",
    });
    dispatch({
      type: "add_new",
    });
    navigate("HealthStatus", { screen: "MyReports" });
  } catch (error) {
    dispatch({
      type: "error",
      payload: error.statusText,
    });
  }
};

const clearHealthStatusContext = (dispatch) => () => {
  dispatch({ type: "clear_context" });
};

const clearHealthStatusError = (dispatch) => () => {
  dispatch({ type: "clear_error" });
};

export const { Provider, Context } = createDataContext(
  healthStatusReducer,
  {
    fetchHealthStatus,
    submitHealthStatus,
    clearHealthStatusContext,
    clearHealthStatusError,
  },
  { healthStatus: [], newData: false, error: null }
);
