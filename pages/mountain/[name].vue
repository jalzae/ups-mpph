<template>
  <div>
    <p>{{ $route.params.name }}</p>
  </div>
</template>
<script lang="ts">
import Vue, { defineComponent } from "vue";
export default defineComponent({
  name: "",
  mixins: [],
  components: {},
  props: {},
  methods: {},
  data() {
    return {
      product: null,
    };
  },
  mounted() {},
  computed: {},
  watch: {},
  created() {
   
  },
});
</script>
