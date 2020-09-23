<template>
  <div>
    <div class="alinhamento-button">
      <v-btn small color="primary" @click="openModal()">Cadastrar</v-btn>
    </div>

    <!-- <v-card v-if="listMedico.length > 0" class="mt-10">
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
        :items="listMedico"
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
          <v-icon small class="mr-2" @click="editItem(item, true)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card> -->

    <MedicoList
      :medicoLista="listMedico"
      @edit="editItem"
      @delete="deleteItem"
    ></MedicoList>

    <!-- modal -->

    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Cadastro Médico</span>
          </v-card-title>
          <v-form enctype="multipart/form-data" ref="form">
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="medico.nome"
                    :rules="nameRules"
                    label="Nome completo"
                    hint="escreva seu nome completo"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6" sm="6" md="6">
                  <v-text-field
                    v-model="medico.email"
                    :rules="emailRules"
                    label="Email*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6" sm="6" md="6">
                  <v-menu
                    ref="menu1"
                    v-model="menu1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="dateFormatted"
                        label="Date"
                        readonly
                        persistent-hint
                        prepend-icon="mdi-calendar"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="medico.dataNascimento"
                      no-title
                      @input="menu1 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6" sm="6" md="6">
                  <v-text-field
                    type="text"
                    :disabled="disable"
                    :rules="crmRules"
                    v-mask="'######/AA'"
                    v-model="medico.crm"
                    label="CRM"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6" sm="6" md="6">
                  <v-autocomplete
                    v-model="medico.idEspecialidade"
                    :items="especialidades"
                    label="Especialidade"
                    item-text="tpEspecialidade"
                    item-value="idEspecialidade"
                  ></v-autocomplete>
                </v-col>
              </v-row>
              <v-row>
                <!--  <v-file-input
                  v-model="medico.file"
                  placeholder="Upload your documents"
                  label="File input"
                  multiple
                  prepend-icon="mdi-paperclip"
                >
                
                </v-file-input> -->
              </v-row>
            </v-card-text>
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close()">Close</v-btn>
            <v-btn color="blue darken-1" text @click="cadastrar()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import MedicoList from "./component/medicoList";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data: (vm) => ({
    isEdit: false,
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
    /*  date: new Date().toISOString().substr(0, 10), */
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    menu2: false,
    medico: {
      nome: "",
      email: "",
      crm: "",
      idEspecialidade: null,
      dataNascimento: new Date().toISOString().substr(0, 10),
      url_documento: "",
      file: null,
    },

    dialog: false,
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    nameRules: [
      (v) => !!v || "Nome obrigatório",
      /* (v) => v.length >= 4 || "nome maior do que 4 letras", */
    ],
    crmRules: [
      (v) => !!v || "Crm obrigatório",
      /* (v) => v.length >= 4 || "nome maior do que 4 letras", */
    ],
  }),
  components: {
    MedicoList,
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    "medico.dataNascimento"(val) {
      this.medico.dataNascimento = val;
      this.dateFormatted = this.formatDate(val);
    },
    "medico.nome"(nome) {
      this.medico.nome = this.medico.nome ? nome.toUpperCase() : null;
    },
  },
  computed: {
    listMedico: {
      get() {
        return this.ORDERNAR_MEDICOS;
      },
    },
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    ...mapGetters("medico", ["ORDERNAR_MEDICOS"]),
    ...mapGetters({
      nameFromStore: "name",
    }),
    ...mapState({
      especialidades: ({ medico }) => medico.listaEspecialidade,
    }),
  },
  methods: {
    ...mapActions({
      setEspecialidade: "medico/SET_ESPECIALIDADES",
      cadMedico: "medico/CADASTRAR_MEDICO",
      getListMedicos: "medico/LIST_MEDICO",
      updateMedico: "medico/UPDATE_MEDICO",
      deleteMedico: "medico/DELETE_MEDICO",
    }),

    openModal() {
      this.dialog = true;
      this.$refs.form ? this.$refs.form.reset() : null
      this.dateFormatted = null;
    },
    validaForm() {
      if (
        this.medico == "" ||
        this.medico.idEspecialidade == "" ||
        this.medico.idEspecialidade == null ||
        this.medico.crm == "" ||
        this.medico.email == "" ||
        this.medico.dataNascimento == "" ||
        this.medico.dataNascimento == null
      ) {
        this.$store.commit(
          "SET_ALERT",
          {
            open: true,
            timeout: "3000",
            description: "preencha todos os campos",
            status: "error",
          },
          { root: true }
        );

        return false;
      } else {
        return true;
      }
    },
    async cadastrar() {
      if (this.validaForm()) {
        /*         debugger;
        this.medico.file = this.medico.file[0]; */
        console.log(this.medico);
        if (!this.isEdit) {
          await this.cadMedico(this.medico);
          this.dialog = false;
        } else {
          await this.updateMedico(this.medico);
          this.dialog = false;
        }
      }

      (this.medico = {
        nome: "",
        email: "",
        crm: "",
        idEspecialidade: null,
        dataNascimento: new Date().toISOString().substr(0, 10),
      }),
        (this.isEdit = false);
    },
    resetForm() {
      this.$refs.form.reset();
    },
    close() {
      this.disable = false;
      this.dialog = false;
      this.medico = {};
      this.resetForm();
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    editItem(medico, edit) {
      this.isEdit = edit;
      this.medico = Object.assign({}, medico);
      this.medico.dataNascimento = medico.dataNascimento.replace(
        "T00:00:00",
        ""
      );
      this.dialog = true;
      this.disable = edit;
    },
    deleteItem(medico) {
      this.deleteMedico(medico);
    },
  },

  async mounted() {
    this.setEspecialidade();
    await this.getListMedicos();
  },
};
</script>

<style>
.alinhamento-button {
  display: flex;
  justify-content: flex-end;
}
.teste {
  max-width: 1604px;
}
.container {
  max-width: 1310px;
}
</style>
