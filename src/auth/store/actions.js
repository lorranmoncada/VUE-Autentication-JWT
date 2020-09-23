import axios from "axios";
import router from "../../router";

export default {
  async LOGIN({ commit }, user) {
    try {
      await axios.post("v1/account/login", user).then((response) => {
        if (response.data.value) {
          commit("SET_LOGIN", response.data.value.usuario);
          commit("SET_TOKEN", response.data.value.token);
          axios.defaults.headers.common = {
            Authorization: `Bearer ${response.data.value.token}`,
          };
          router.push("/home");
        } else {
          commit(
            "SET_ALERT",
            {
              open: true,
              timeout: "3000",
              description: "usuário ou senha incorreto",
              status: "info",
            },
            { root: true }
          );
        }
      });
    } catch (error) {
      commit(
        "SET_ALERT",
        {
          open: true,
          timeout: "3000",
          description: "erro ao tentar realizar login",
          status: "error",
        },
        { root: true }
      );
    }
  },

  async CADASTRAR({ commit }, user) {
    try {
      await axios.post("v1/account/cadastro", user).then((data) => {
        if (data) {
          commit(
            "SET_ALERT",
            {
              open: true,
              timeout: "3000",
              description: "cadastrado com sucesso",
              status: "success",
            },
            { root: true }
          );
        }
      });
    } catch (error) {
      commit(
        "SET_ALERT",
        {
          open: true,
          timeout: "2000",
          description: "Erro ao tentar cadastrar usuário",
          status: "error",
        },
        { root: true }
      );
    }
  },
};
