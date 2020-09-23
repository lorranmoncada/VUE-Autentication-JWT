export default {
  SET_LISTA_TODO(state, todoObj) {
    let index = state.todoList.indexOf(todoObj);
    if (index != -1) {
      state.todoList[index] = todoObj;
    } else {
      state.todoList.push(todoObj);
    }
  },
  CHANGE_TODO(state, todoObj) {
    let index = state.todoList.indexOf(todoObj);
    state.todoList.splice(index, 1);
    console.log(state.todoList);
  },
  SET_ALL_TRUE(state) {
    state.todoList.map((x) => {
      x.checado = true;
    });
    let teste = state.todoList;
    return teste;
  },
  SET_ALL_FALSE(state) {
    state.todoList.map((x) => {
      x.checado = false;
    });
    let teste = state.todoList;
    return teste;
  },
};
