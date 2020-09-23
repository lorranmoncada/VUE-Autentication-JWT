<template>
  <v-card v-if="medicoLista.length > 0" class="mt-10">
    <v-card-title>
      Medicos
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Pesquisar"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="medicoLista"
      :search="search"
      :itemsPerPage="pag"
      :footer-props="{
        showFirstLastPage: true,
        itemsPerPageText: 'Médicos por página',
        itemsPerPageAllText: 'Todos',
        pageText: '',
      }"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="$emit('edit', item, true)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="$emit('delete', item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: {
    medicoLista: null,
  },
  data: () => ({
    search: "",
    disable: false,
    pag: 5,
    headers: [
      {
        text: "Nome",
        align: "start",
        sortable: false,
        value: "nome",
      },
      { text: "Crm", value: "crm" },
      { text: "E-mail", value: "email" },
      { text: "Data Nascimento", value: "data" },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),
};
</script>
