<template>
  <div class="my-2">
    <v-row>
      <v-col cols="9"
        ><v-file-input
          v-model="file"
          placeholder="Upload your documents"
          label="File input"
          multiple
          prepend-icon="mdi-paperclip"
        >
          <template v-slot:selection="{ text }">
            <v-chip small label color="primary">
              {{ text }}
            </v-chip>
          </template>
        </v-file-input></v-col
      >

      <v-col cols="3" class="mt-5"
        ><div>
          <v-btn small color="primary" @click="uploadDoc(file)">Upload</v-btn>
        </div></v-col
      >
    </v-row>

    <ul v-for="(doc, i) in listDocs" :key="i">
      <li style="padding-bottom:5px;">
        {{ doc }}
        <!--   <v-btn small color="primary" @click="baixar(doc)">Baixar</v-btn> -->

        <a
          color="primary"
          href="`https://localhost:44393/api/paciente/donwload/${doc}`"
          >baixar</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    file: null,
  }),
  computed: {
    ...mapState({
      listDocs: ({ paciente }) => paciente.list,
    }),
  },
  methods: {
    ...mapActions({
      uploadDoc: "paciente/SET_DOCUMENTO",
      getListDocs: "paciente/LIST_DOCS",
      baixar: "paciente/BAIXAR_DOC",
    }),
  },

  mounted() {
    this.getListDocs();
  },
};
</script>
