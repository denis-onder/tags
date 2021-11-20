<template>
  <v-card>
    <v-card-title>{{ link.url }}</v-card-title>
    <v-card-subtitle>
      <v-text-field placeholder="Add new tag"></v-text-field>
      <v-btn color="primary">ADD</v-btn>
    </v-card-subtitle>
    <v-card-text v-if="tags">
      <v-chip v-for="(tag, index) in tags" :key="index">{{ tag.value }}</v-chip>
    </v-card-text>
    <v-card-actions>
      <v-btn color="error">DELETE</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { getTags } from "../api/tags";

export default Vue.extend({
  props: {
    link: Object,
    tags: Array,
  },
  created: function () {
    this.getTags();
  },
  methods: {
    getTags: function () {
      getTags(this.link._id).then((tags: Array<any>) => {
        console.log(tags);
      });
    },
  },
});
</script>