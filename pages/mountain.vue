<template>
  <div v-if="!$route.params.name">
    <ul>
      <li @click="goto(item)" v-for="item in datas" :key="item">
        <p>{{ item }}</p>
      </li>
    </ul>
  </div>
  <div v-else>
    <Details />
  </div>
</template>
<script lang="ts">
import Details from "./mountain/[name].vue";
import Vue, { defineComponent } from "vue";
export default defineComponent({
  name: "",
  mixins: [],
  components: { Details },
  props: {},
  methods: {
    goto(data: string) {
      return this.$router.push({
        path: `/mountain/${data}`,
        replace: false,
      });
    },
  },
  data() {
    return {
      datas: ["php", "phyton", "js", "typescript", "Go"],
    };
  },
  mounted() {},
  computed: {},
  watch: {},
  created() {
    const route = useRoute();
    console.log(route.params);
  },
});
</script>
