<template>
  <div class="m-4">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
    <Tables :format="format" :datas="datas" @action="action" />
  </div>
</template>
<script lang="ts">
import Vue, { defineComponent } from "vue";
import Tables from "@/components/Global/Tables.vue";
import { Format } from "~~/model/format";
//store
import * as store from "@/store/";
//api
import api from "@/api/index";
import home from "@/api/home";
import Action from "~~/model/action";
export default defineComponent({
  name: "",
  setup() {
    const loading = store.useLoading();
    return {
      loading,
    };
  },
  mixins: [api],
  components: { Tables },
  props: {},
  methods: {
    action(val: Action) {
      if (val.action == "view") {
        window.location.href = "/tugas?id=" + val.val1;
      }
    },
    async fetch() {
      try {
        this.loading.set();
        const res = await this.sendRequest(home.homereadalltugas());

        for (let x of res.data.data) {
          x["status_name"] = x["status"] ? "Tertutup" : "Terbuka";
        }
        this.datas = res.data.data;
        console.log(res.data.data);
      } catch (e) {
      } finally {
        this.loading.unset();
      }
    },
  },
  data() {
    return {
      datas: [],
      format: {
        header: ["Nama Tugas", "Status", "Action"],
        body: ["name", "status_name"],
        action: [
          {
            action: "view",
            class: "",
            model: "id",
            title: "",
            icon: "fas fa-sign-in",
          },
        ],
      } as Format,
    };
  },
  mounted() {},
  computed: {},
  watch: {},
  async created() {
    await this.fetch();
  },
});
</script>
