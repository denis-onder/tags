<template>
  <v-container fluid>
    <v-text-field v-model="email" placeholder="Email Address:"></v-text-field>
    <v-text-field
      v-model="password"
      placeholder="Password:"
      type="password"
    ></v-text-field>
    <v-btn color="primary" @click="onSubmit">Submit</v-btn>
    <v-container background="error" v-if="error">
      {{ error }}
    </v-container>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { logIn } from "../api/auth";

export default Vue.extend({
  data: () => ({
    email: "",
    password: "",
    error: "",
  }),
  methods: {
    onSubmit(): void {
      this.error = "";

      logIn(this.email, this.password)
        .then((result) => {
          if (result) {
            this.$router.push({ name: "dashboard" });
          }
        })
        .catch((err) => (this.error = err));
    },
  },
});
</script>
