<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="user.login"
                    label="Login"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    v-model="user.senha"
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :loading="loadLogin" color="primary" @click="logar(user)"
                  >Login</v-btn
                >
              </v-card-actions>
              <v-row justify="center">
                <p style="cursor:pointer;" @click="cadastrar = true">
                  cadastrar
                </p></v-row
              >
            </v-card>
          </v-col>
        </v-row>
        <!--  modal cadastro -->
        <v-dialog v-model="cadastrar" max-width="500px">
          <v-card>
            <v-toolbar color="primary" dark>
              <v-card-title>
                Dialog 2
              </v-card-title>
            </v-toolbar>
            <v-card-text class="mt-5">
              <v-text-field
                v-model="user.login"
                label="Login"
                name="login"
                prepend-icon="mdi-account"
                type="text"
              ></v-text-field>
              <v-text-field
                v-model="user.senha"
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                @keyup.enter="addUser(user)"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" text @click="closeModalCadastro()">
                Fechar
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn :loading="load" color="primary" @click="addUser(user)"
                >Cadastrar</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    user: { login: "", senha: "" },
    cadastrar: false,
    load: false,
    loadLogin: false,
  }),
  methods: {
    ...mapActions({
      login: "auth/LOGIN",
      cadastro: "auth/CADASTRAR",
    }),
    async logar(user) {
      this.loadLogin = true;
      await this.login(user);
      this.loadLogin = false;
    },
    async addUser(user) {
      // eslint-disable-next-line no-unused-vars
      let teste = null;
      this.load = true;
      await this.cadastro(user);
      this.user = {};
      this.load = false;
      this.cadastrar = false;

      //this.cadastrar = false;
    },
    closeModalCadastro() {
      this.cadastrar = false;
      this.user = {};
    },
  },
};
</script>
