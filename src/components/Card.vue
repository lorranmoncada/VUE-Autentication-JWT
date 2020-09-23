<template>
  <div>
    <v-card class="card " max-width="500" max-height="7rem" outlined>
      <template>
        <!--  <v-card> -->
        <v-card-text> <slot /> </v-card-text>
        <!-- </v-card> -->
      </template>
    </v-card>
    <!-- <div class="card">
      <slot />
    </div> -->
  </div>
</template>

<script>
export default {
  name: "Card",
};
</script>

<style scoped>
.card {
  border-radius: 7px;
  margin-bottom: 0.8rem;
  box-shadow: 1px 2px 0 rgb(9, 30, 66, 0.25);
  cursor: pointer;
}
</style>
