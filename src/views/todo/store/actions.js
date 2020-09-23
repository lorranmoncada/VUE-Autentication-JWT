export default {
  GET_LISTA_TODO({ commit }, todoObj) {
    return new Promise(resolve => {
      setTimeout(() => {
        commit("SET_LISTA_TODO", todoObj);
        resolve(todoObj);
      }, 200);
    });
  }
};
