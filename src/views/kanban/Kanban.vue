<template>
  <div>
    <v-row align="center" justify="center" >
      <div>
        <v-row>
          <v-col cols="8"
            ><v-text-field
              style="width: 260px;"
              ref="todo"
              label="Adicione um a fazer"
              hide-details="auto"
              v-model="todoObj.descricao"
              :rules="rules"
            ></v-text-field
          ></v-col>
          <v-col class="mt-5" cols="4"
            ><v-btn small @click="addListTodo(todoObj)">Adicionar</v-btn></v-col
          >
        </v-row>
      </div>
    </v-row>

    <v-row align="center" justify="center">
      <div align="center" justify="center">
        <v-row>
          <v-col style="width: 550px;" cols="6">
            <h3>A fazer</h3>
            <TodoList
              :listaTodo="todoFalse"
              @alterarTodo="isChecado"
              @setAll="setAllTrue"
            >
            </TodoList>
          </v-col>

          <v-col style="width: 550px;" cols="6">
            <h3>Feito</h3>
            <TodoList
              :listaTodo="todoTrue"
              @alterarTodo="isChecado"
              @setAll="setAllFalse"
            >
            </TodoList>
          </v-col>
        </v-row>
      </div>
    </v-row>
  </div>
</template>

<script>
import TodoList from "../../components/TodoList.vue";
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "Kanban",
  data: () => ({
    todoFalse: [],
    todoTrue: [],
    rules: [
      (value) => !!value || "obrigatório.",
      (value) => (value && value.length >= 3) || "Min 3 characters",
    ],
    todoObj: { id: null, descricao: "", checado: false },
  }),
  components: {
    TodoList,
  },
  computed: {
    ...mapGetters("kanban", ["GET_TODO_LIST_FALSE", "GET_TODO_LIST_TRUE"]),
    ...mapState("kanban", ["todoListChecado", "todoList"])
  },
  methods: {
    ...mapActions("kanban", [
      "GET_LISTA_TODO",
      "CHANGE_TODO",
      "SET_ALL_FALSE",
      "SET_ALL_TRUE",
    ]),

    async addListTodo(obj) {
      obj.id = parseFloat(Math.random().toFixed(2));
      obj.checado = false;
      if (obj.descricao != "" && obj.descricao != undefined) {
        await this.GET_LISTA_TODO(obj);
        this.todoObj = { id: null, descricao: "", checado: false };
        this.$refs.todo.reset();
        this.todoFalse = this.GET_TODO_LIST_FALSE;
      }
    },
    async setAllTrue() {
      await this.SET_ALL_TRUE();
      this.todoFalse = this.GET_TODO_LIST_FALSE;
      this.todoTrue = this.GET_TODO_LIST_TRUE;
    },

    async setAllFalse() {
      await this.SET_ALL_FALSE();
      this.todoFalse = this.GET_TODO_LIST_FALSE;
      this.todoTrue = this.GET_TODO_LIST_TRUE;
    },
    async isChecado(todo) {
      todo.checado = !todo.checado;
      await this.GET_LISTA_TODO(todo);
      this.todoFalse = this.GET_TODO_LIST_FALSE;
      this.todoTrue = this.GET_TODO_LIST_TRUE;
    },
  },
  mounted() {
    this.todoFalse = this.GET_TODO_LIST_FALSE;
    this.todoTrue = this.GET_TODO_LIST_TRUE;
  },
};
</script>

<style scoped>
.custom {
  border-style: none;
}
.custom.v-text-field > .v-input__control > .v-input__slot:after {
  border-style: none;
}
.h3 {
  display: flex;
  justify-content: center;
}
</style>
