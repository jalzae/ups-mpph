<template>
  <div>
    <div class="flex items-center space-x-4">
      <button
        :class="{ hiden: page == 1 }"
        class="px-2 py-1 bg-gray-700 text-white rounded"
        @click="prev"
      >
        &lt; Prev
      </button>
      <span
        class="font-semibold"
        :class="{ hiden: total_page == 1 || total_page == 0 }"
      >
        Page: {{ page ?? 1 }} of {{ total_page ?? 1 }}
      </span>
      <button
        :class="{ hiden: page == total_page }"
        class="px-2 py-1 bg-gray-700 text-white rounded"
        @click="next"
      >
        Next &gt;
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue, { defineComponent } from "vue";
export default defineComponent({
  setup() {},
  mixins: [],
  components: {},
  props: {
    page: {
      type: Number,
    },
    total_page: {
      type: Number,
    },
  },
  methods: {
    prev() {
      this.$emit("prev");
    },
    next() {
      this.$emit("next");
    },
  },
  data() {
    return {};
  },
  mounted() {},
  computed: {},
  watch: {},
  created() {},
});
</script>

<style>
.hiden {
  display: none !important;
}
</style>
