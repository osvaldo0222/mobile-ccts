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

      let month = date.getUTCMonth() + 1;
      let day = date.getUTCDate();
      let year = date.getUTCFullYear();
      let hours = date.getUTCHours();
      let minutes = date.getUTCMinutes();

      let key = `${year}-${month < 10 ? `0${month}` : month}-${
        day < 10 ? `0${day}` : day
      }`;

      let time = `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
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
