import createDataContext from "./createDataContext";

const bleReducer = (state, action) => {
  switch (action.type) {
    case "set_broadcast_state":
      return { ...state, broadcastState: action.payload };
    case "set_started":
      return { ...state, started: action.payload };
    case "clear":
      return { broadcastState: false, started: false };
    default:
      return state;
  }
};

const setBroadcastState = (dispatch) => ({ broadcastState }) => {
  dispatch({ type: "set_broadcast_state", payload: broadcastState });
};

const setStarted = (dispatch) => ({ started }) => {
  dispatch({ type: "set_started", payload: started });
};

const clearContext = (dispatch) => () => {
  dispatch({ type: "clear" });
};

export const { Provider, Context } = createDataContext(
  bleReducer,
  { setBroadcastState, setStarted, clearContext },
  { broadcastState: false, started: false }
);
