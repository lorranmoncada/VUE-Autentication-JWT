export default {
  SET_LOGIN(state, user) {
    state.user = user;
  },
  SET_TOKEN(state, token) {
    state.token = token;
    localStorage.setItem("token", token);
  },
  DESLOGAR(state) {
    state.user = {};
    state.token = "";
  },
};
