<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list v-for="(menu, index) in listMenu" :key="index" dense>
        <router-link style="text-decoration:none;color:black;" :to="menu.path"
          ><v-list-item link>
            <v-list-item-action>
              <v-icon>{{ menu.meta.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ menu.meta.title }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="grey" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Revisando </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-icon @click="changetheme" dark v-bind="attrs" v-on="on">
            mdi-eye
          </v-icon>
        </template>
        <span style="cursor:pointer;">Mudar Tema</span>
      </v-tooltip>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <v-footer color="grey" app>
      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    listMenu: [],
  }),
  methods: {
    changetheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
  mounted() {
    this.listMenu = this.$router.options.routes[1].children;
    this.listMenu = this.listMenu.filter((x) => x.meta.isMenu);
    console.log(this.listMenu);
  },
};
</script>
