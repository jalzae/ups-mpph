<template>
  <div>
    <p @click="store.increment">Counter :{{ store.getCount }}</p>
    <p>its Computed :{{ counterNumber }}</p>
  </div>
</template>
<script lang="ts">
import Vue, { defineComponent } from "vue";
import { useCounterStore } from "@/store/counter";
export default defineComponent({
  name: "",
  setup() {
    const store = useCounterStore();
    const counterNumber = computed(() => store.getCount);
    return { store,counterNumber };
  },
  mixins: [],
  components: {},
  props: {},
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
