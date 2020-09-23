export default {
  GET_TODO_LIST_FALSE(state) {
    let listaTodo = state.todoList.filter(x => x.checado == false);
    return listaTodo;
  },
  GET_TODO_LIST_TRUE(state) {
    let listaTodo = state.todoList.filter(x => x.checado == true);
    return listaTodo;
  },
};
