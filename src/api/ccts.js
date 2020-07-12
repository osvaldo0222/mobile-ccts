import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

const instance = axios.create({
  baseURL: "http://192.168.0.12:8080",
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
        error.statusText = "Usuario o contraseña son incorrectos.";
        break;
      case 403:
        error.statusText =
          "No posee los permisos necesarios para acceder a este recurso";
        break;
      case 600:
        error.statusText =
          "Su cédula parece no estar disponible. ¿Ya tiene una cuenta?";
        break;
      case 601:
        error.statusText =
          "Este correo parece ya estar registrado, intente con otro.";
        break;
      case 602:
        error.statusText =
          "Este nombre de usuario no esta disponible, intente con otro.";
        break;
      default:
        error.statusText = "Algo ha salido mal. Intente mas tarde.";
        break;
    }
    return Promise.reject(error);
  }
);

export default instance;
