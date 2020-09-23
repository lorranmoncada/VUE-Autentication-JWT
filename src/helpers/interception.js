import axios from "axios";
import store from "../store";
import router from "../router";

export const interceptor = () => {
  axios.interceptors.request.use(
    function(config) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    function(err) {
      if (err.response.status !== 401) {
        return Promise.reject(err);
      }
    }
  );
};

export const interceptorTest = () => {
  axios.interceptors.response.use(
    (response) => {
      // Return a successful response back to the calling service
      return response;
    },
    (error) => {
      // Return any error which is not due to authentication back to the calling service
      if (error.response.status == 401) {
        store.commit("auth/DESLOGAR");
        localStorage.clear();
        router.push("/");
        store.commit(
          "SET_ALERT",
          {
            open: true,
            timeout: "3000",
            description: "A sessão expirou",
            status: "error",
          },
          { root: true }
        );
      }
    }
  );
};

export const req = () => {
  return ({ status }) => {
    if (status === 401) {
      store.commit("auth/DESLOGAR");
      /* window._Vue.$router.push({ name: "login" }); */
    }
  };
};
