<template>
  <div>
    Welcome {{ name }}
    <div v-if="links.length > 0">
      <card
        class="margins"
        v-for="(link, index) in links"
        :key="index"
        :link="link"
      />
    </div>
    <div v-else>No data found. Why don't you create some?</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Card from "../components/Card.vue";
import { getLinks } from "../api/links";
import { getMe } from "../api/auth";

export default Vue.extend({
  components: {
    Card,
  },
  data: () => ({
    links: [],
    user: null,
  }),
  computed: {
    name: function () {
      if (this.user) {
        return this.user.displayName;
      } else {
        return "";
      }
    },
  },
  methods: {
    getMe: function () {
      getMe().then((user) => {
        this.user = user;
      });
    },
    getLinks: function () {
      getLinks().then((links) => {
        this.links = links;
      });
    },
  },
  created: async function () {
    await getMe();
    this.getLinks();
  },
});
</script>

<style lang="scss" scoped>
.margins {
  margin: 16px;
}
</style>