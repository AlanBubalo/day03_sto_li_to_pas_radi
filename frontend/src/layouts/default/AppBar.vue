<template>
  <v-app-bar color="primary">
    <v-app-bar-title>
      VERIGEN
      <v-icon icon="mdi-signal" />
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn v-model="activeBtn" text to="/">Home</v-btn>
    <v-btn v-model="activeBtn" text to="/samples">Samples</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "my-component",
  data() {
    return {
      active_btn: "home",
    };
  },
  computed: {
    activeBtn() {
      switch (this.$route.name) {
        case "Home":
          return "/";
        case "Samples":
          return "/samples";
        default:
          return null;
      }
    },
  },
};
</script>
