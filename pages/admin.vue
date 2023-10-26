<template>
  <div class="m-4">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
      crossorigin="anonymous" referrerpolicy="no-referrer" />
    <Tables :format="format" :datas="datas" />
  </div>
</template>
<script lang="ts">
import Vue, { defineComponent } from "vue";
import Tables from '@/components/Global/Tables.vue'
import { Format } from "~~/model/format";
export default defineComponent({
  name: "",
  setup() {

  },
  mixins: [],
  components: { Tables },
  props: {},
  methods: {},
  data() {
    return {
      datas: [],
      format: {
        header: ['Nama Tugas', 'Action'],
        body: ['nama'],
        action: [
          {
            action: 'view',
            class: '',
            model: 'id',
            title: '',
            icon: 'fas fa-sign-in',
          }
        ]
      } as Format
    };
  },
  mounted() { },
  computed: {},
  watch: {},
  created() { },
});
</script>
