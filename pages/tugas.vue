<template>
  <div>
    <h2>Daftar Serah Tugas :{{ selected.name }}</h2>
    <p>{{ selected.desc }}</p>
    <p>{{ selected.dateline }}</p>
    <Tables :format="format" :datas="datas" />
  </div>
</template>
<script lang="ts">
import Tables from "@/components/Global/Tables.vue";
import Vue, { defineComponent } from "vue";
import { Format } from "~~/model/format";
import Action from "~~/model/action";
export default defineComponent({
  mixins: [],
  components: { Tables },
  props: {},
  methods: {
    async action(val: Action) {
      if (this.is_admin && val.action == "change_status") {
      }
    },
    async getTugas() {
      try {
        this.loading.set();
        //check url is admin with query id and status
      } catch (e) {
      } finally {
        this.loading.unset();
      }
    },
    async checkTugas() {
      try {
        this.loading.set();
      } catch (e) {
      } finally {
        this.loading.unset();
      }
    },
  },
  data() {
    return {
      is_admin: false,
      selected: {
        name: "",
        desc: "",
        dateline: "",
      },
      datas: [],
      format: {
        header: ["Nama Mahasiswa", "Status"],
        body: ["name"],
        btn2: [
          {
            model: "status",
            false: "false",
            title: "Enable",
            icon: "fas fa-check text-white",
            class: "rounded-sm text-white p-2 shadow-md bg-green-500",
            action: "change_status",
            titlefalse: "",
            iconfalse: "fas fa-close text-white",
            classfalse: "rounded-sm text-white p-2 shadow-md bg-red-500",
            actionfalse: "change_status",
            key: "id",
            key2: "id",
          },
        ],
      } as Format,
    };
  },
  mounted() {},
  async created() {},
  computed: {},
  watch: {},
});
</script>
