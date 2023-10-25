<template>
  <button
    @click="$emit(action, value)"
    class="rounded-sm text-white p-2 shadow-md"
    :class="background"
  >
    {{ title }}
  </button>
</template>
<script lang="ts">
import Vue, { defineComponent } from "vue";
export default defineComponent({
  name: "",
  mixins: [],
  components: {},
  props: {
    title: String,
    background: String,
    action: String,
    value: String,
  },
  methods: {},
  data() {
    return {};
  },
  mounted() {},
  computed: {},
  watch: {},
  created() {},
});
</script>
