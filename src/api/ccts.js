import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

const instance = axios.create({
  baseURL: "http://9e331e781548.ngrok.io",
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    switch (error.response.data.status) {
      case 401:
        error.statusText = "Usuario o contraseña incorrecto";
        break;
      case 403:
        error.statusText = "No posee los permisos necesarios";
        break;
      default:
        error.statusText = "Algo ha salido mal. Intente mas tarde.";
        break;
    }

    return Promise.reject(error);
  }
);

export default instance;
