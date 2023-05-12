<template>
  <v-app-bar color="primary">
    <v-app-bar-title>
      VERIGEN
      <v-icon icon="mdi-signal" />
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn text to="/">Home</v-btn>
    <v-btn text to="/samples">Samples</v-btn>
    <v-btn text to="/input-conditions">Input Conditions</v-btn>
    <v-btn text to="/test-point-collections">Test Point Collections</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "my-component",
  data() {
    return {};
  },
  computed: {},
};
</script>
