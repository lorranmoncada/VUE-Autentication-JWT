import axios from "axios";
export default {
  SET_ESPECIALIDADES({ commit }) {
    try {
      axios.get("api/especialidade/", {}).then((payload) => {
        if (payload) {
          commit("SET_LIST_ESPECIALIDADE", payload.data);
        }
      });
    } catch (error) {
      commit(
        "SET_ALERT",
        {
          open: true,
          timeout: "3000",
          description: "erro ao carregar especialidades!",
          status: "error",
        },
        { root: true }
      );
    }
  },

  async LIST_MEDICO({ commit }) {
    commit("SET_LOADIG", true, { root: true });
    try {
      await axios.get("api/medicos/", {}).then((payload) => {
        if (payload.data) {
          commit("SET_LOADIG", false, { root: true });
          commit("SET_LIST_MEDICO", payload.data);
        }
      });
    } catch (error) {
      commit("SET_LOADIG", false, { root: true });
      commit(
        "SET_ALERT",
        {
          open: true,
          timeout: "3000",
          description: "erro ao carregar medicos!",
          status: "error",
        },
        { root: true }
      );
    }
  },

  async CADASTRAR_MEDICO({ commit, dispatch }, medico) {
    try {
      commit("SET_LOADIG", true, { root: true });
      await axios.post("api/cadastro/medico", medico).then((payload) => {
        if (payload.status == 200) {
          dispatch("LIST_MEDICO");
          commit(
            "SET_ALERT",
            {
              open: true,
              timeout: "3000",
              description: "Médico cadastrado com sucesso!",
              status: "success",
            },
            { root: true }
          );
        } else {
          commit("SET_LOADIG", false, { root: true });
          commit(
            "SET_ALERT",
            {
              open: true,
              timeout: "3000",
              description: "Não foi possível cadastrar médico!",
              status: "info",
            },
            { root: true }
          );
        }
      });
    } catch (error) {
      commit("SET_LOADIG", false, { root: true });
      commit(
        "SET_ALERT",
        {
          open: true,
          timeout: "3000",
          description: "Erro ao cadastrar médico!",
          status: "error",
        },
        { root: true }
      );
    }
  },

  async UPDATE_MEDICO({ commit, dispatch }, medico) {
    try {
      commit("SET_LOADIG", true, { root: true });
      await axios.post("api/update/medico", medico).then((payload) => {
        if (payload.status == 200) {
          /*  commit("SET_LOADIG", false, { root: true }); */
          dispatch("LIST_MEDICO");
          commit(
            "SET_ALERT",
            {
              open: true,
              timeout: "3000",
              description: "Médico atualizado com sucesso!",
              status: "success",
            },
            { root: true }
          );
        } else {
          commit("SET_LOADIG", false, { root: true });
          commit(
            "SET_ALERT",
            {
              open: true,
              timeout: "3000",
              description: "Não foi possível atualizar médico!",
              status: "info",
            },
            { root: true }
          );
        }
      });
    } catch (error) {
      commit("SET_LOADIG", false, { root: true });
      commit(
        "SET_ALERT",
        {
          open: true,
          timeout: "3000",
          description: "Erro ao atualizar médico!",
          status: "error",
        },
        { root: true }
      );
    }
  },
  
  async DELETE_MEDICO({ commit, dispatch }, medico) {
    try {
      commit("SET_LOADIG", true, { root: true });
      await axios.post("api/delete/medico", medico).then((payload) => {
        if (payload.status == 200) {
          /*  commit("SET_LOADIG", false, { root: true }); */
          dispatch("LIST_MEDICO");
          commit(
            "SET_ALERT",
            {
              open: true,
              timeout: "3000",
              description: "Médico deletado com sucesso!",
              status: "success",
            },
            { root: true }
          );
        } else {
          commit("SET_LOADIG", false, { root: true });
          commit(
            "SET_ALERT",
            {
              open: true,
              timeout: "3000",
              description: "Não foi possível excluir médico!",
              status: "info",
            },
            { root: true }
          );
        }
      });
    } catch (error) {
      commit("SET_LOADIG", false, { root: true });
      commit(
        "SET_ALERT",
        {
          open: true,
          timeout: "3000",
          description: "Erro ao excluir médico!",
          status: "error",
        },
        { root: true }
      );
    }
  },
};
