<template>
  <div>
    <v-card
      class="mx-auto"
      style="background-color: #eeeeee;padding-left:15px;padding-right:15px;padding-top:15px;"
      max-width="350"
      height="360"
      outlined
    >
      <!--    SCROLL DENTRO DO CARD  -->
      <v-virtual-scroll
        id="teste"
        bench="0"
        :items="listaTodo"
        height="300"
        item-height="64"
      >
        <template v-slot="{ item }">
          <v-card
            style="margin-right: 6px;
    margin-left: 6px;"
          >
            <v-list-item :key="item.id">
              <v-list-item-content>
                <v-list-item-title :class="[item.checado ? 'text' : '']">
                  {{ item.descricao }}
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <input
                  @change="$emit('alterarTodo', item)"
                  type="checkbox"
                  :checked="item.checado"
                />
              </v-list-item-action>
            </v-list-item>
          </v-card>
        </template>
      </v-virtual-scroll>
      <v-row v-if="listaTodo.length > 0">
        <v-col>
          <span
            ><strong>marcar todos</strong>
            <input
              style="margin-top: 4px;position: absolute; margin-left: 11px;"
              type="checkbox"
              @click="$emit('setAll')"/></span
        ></v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "TodoList",
  props: {
    listaTodo: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    console.log(this.listaTodo);
  },
  /*  methods: {
    ...mapActions("home", ["GET_LISTA_TODO"])
  } */
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.checkbox {
  display: flex;
  justify-content: flex-end;
  margin-top: -17px;
}
.text {
  text-decoration: line-through;
}
::-webkit-scrollbar-track {
  margin-right: 10px !important;
  background-color: #f4f4f4;
}
::-webkit-scrollbar {
  width: 6px;
  background: #f4f4f4;
}
::-webkit-scrollbar-thumb {
  background: #dad7d7;
}
::-webkit-scrollbar {
  margin: 10px;
}
</style>
