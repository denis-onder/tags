<template>
  <v-container fluid>
    <h1 class="text--h1">Register</h1>
    <v-text-field
      v-model="displayName"
      placeholder="Display Name:"
    ></v-text-field>
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
import { register } from "../api/auth";

export default Vue.extend({
  data: () => ({
    email: "",
    password: "",
    displayName: "",
    error: "",
  }),
  methods: {
    onSubmit(): void {
      this.error = "";

      register(this.displayName, this.email, this.password)
        .then((res) => {
          if (res) {
            this.$router.push({ name: "login" });
          }
        })
        .catch((err) => (this.error = err));
    },
  },
});
</script>
