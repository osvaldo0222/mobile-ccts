import createDataContext from "./createDataContext";
import cctsApi from "../api/ccts";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "fetch_notification":
      return {
        ...state,
        notifications: state.notifications.length
          ? [...state.notifications, ...action.payload]
          : action.payload,
      };
    case "set_count_notification":
      return {
        ...state,
        notificationsLength: state.notificationsLength + action.payload,
      };
    case "clear_context":
      return { notifications: [], notificationsLength: 0 };
    default:
      return state;
  }
};

const fetchNotifications = (dispatch) => async (page = 0) => {
  try {
    const response = await cctsApi.get(
      `/api/user/getNotifications?page=${page}`,
      null
    );
    const notifications = response.data.result;
    const sectionNotification = {};
    for (let i = 0; i < notifications.length; i++) {
      let date = new Date(notifications[i].sendDate);
      let key = `${date.getFullYear()}-${
        date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()
      }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
      let time = `${
        date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
      }:${
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
      }`;
      notifications[i].sendDate = time;
      if (sectionNotification[key]) {
        sectionNotification[key] = {
          title: key,
          data: [...sectionNotification[key].data, notifications[i]],
        };
      } else {
        sectionNotification[key] = {
          title: key,
          data: [notifications[i]],
        };
      }
    }

    const result = [];
    for (const [key, value] of Object.entries(sectionNotification)) {
      result.push(value);
    }

    if (page === 0) {
      dispatch({
        type: "clear_context",
      });
    }

    dispatch({ type: "set_count_notification", payload: notifications.length });

    dispatch({
      type: "fetch_notification",
      payload: result,
    });
  } catch (error) {
    //ERROR
  }
};

const clearNotificationContext = (dispatch) => () => {
  dispatch({ type: "clear_context" });
};

export const { Provider, Context } = createDataContext(
  notificationReducer,
  { fetchNotifications, clearNotificationContext },
  { notifications: [], notificationsLength: 0 }
);
