export default {
  GET_LISTA_TODO({ commit }, todoObj) {
    try {
     /*  commit("SET_LOADIG", true); */
      return new Promise((resolve) => {
        setTimeout(() => {
          commit("SET_LISTA_TODO", todoObj);
          resolve(todoObj);
        }, 100);
      });
    } catch (error) {
      console.log(error);
    } finally {
     /*  setTimeout(() => { */
       /*  commit("SET_LOADIG", false); */
     /*  }, 2000); */
    }
  },
  CHANGE_TODO({ commit }, todoObj) {
    return new Promise((resolve) => {
      setTimeout(() => {
        commit("CHANGE_TODO", todoObj);
        resolve(todoObj);
      }, 200);
    });
  },
  SET_ALL_FALSE({ commit }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        commit("SET_ALL_FALSE");
        resolve();
      }, 200);
    });
  },
  SET_ALL_TRUE({ commit }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        commit("SET_ALL_TRUE");
        resolve();
      }, 200);
    });
  },
};
