<template>
  <div class="p-8">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
    <h2>
      Daftar Serah Tugas :<strong>{{ selected.name }}</strong>
    </h2>
    <h2>
      <p>
        DateLine :<strong> {{ selected.dateline }} </strong>
      </p>
    </h2>
    <div class="card my-8">
      <p>{{ selected.desc }}</p>
    </div>

    <Tables :format="format" :datas="datas" @action="action" />
    <Loading />
  </div>
</template>
<script lang="ts">
import Tables from "@/components/Global/Tables.vue";
import Loading from "@/components/Global/Loading.vue";
import Vue, { defineComponent } from "vue";
import { Format } from "~~/model/format";
import Action from "~~/model/action";
import api from "@/api/index";
import home from "@/api/home";
//store
import * as store from "@/store/";
export default defineComponent({
  setup() {
    const loading = store.useLoading();
    return {
      loading,
    };
  },
  mixins: [api],
  components: { Tables, Loading },
  props: {},
  methods: {
    async action(val: Action) {
      if (this.is_admin && val.action == "change_status") {
        this.checkTugas(val.val1);
      }
    },
    async getTugas() {
      try {
        this.loading.set();
        //check url is admin with query id and status
        const route = useRoute();
        const { id, access } = route.query;

        if (!id) throw "not have id";

        const res = await this.sendRequest(home.homereadonetugas(id));
        if (!res.status) {
          throw res.message;
        }

        this.selected = res.data.tugas;
        this.datas = res.data.mahasiswa;
        for (let i of this.datas) {
          if (i.MahasiswaTugas.length != 0) {
            i.status = "true";
          } else {
            i.status = "false";
          }
        }
        if (access == "4226") {
          this.is_admin = true;
        }
      } catch (e) {
        alert(e);
        window.location.href = "/";
      } finally {
        this.loading.unset();
      }
    },
    async checkTugas(id_mhs: string) {
      try {
        this.loading.set();

        const route = useRoute();
        const { id } = route.query;

        if (this.is_admin) {
          await this.sendRequest(
            home.homechecktugas({
              id_tugas: id,
              id_mahasiswa: id_mhs,
            })
          );
          await this.getTugas();
        } else {
          throw "You dont have access, dont cheating!";
        }
      } catch (e) {
        alert(e);
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
        action: [],
      } as Format,
    };
  },
  mounted() {},
  async created() {
    await this.getTugas();
  },
  computed: {},
  watch: {},
});
</script>

<style>
.card {
  padding: 8px;
  border: 1px solid black;
}
</style>
