<template>
  <div class="m-4">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
    <div v-if="is_admin">
      <div>
        <h2>Tugas</h2>
        <Forms
          :form="forms"
          :selected="form"
          :action="'addtugas'"
          @addtugas="addtugas"
        />
        <Tables :format="format" :datas="datas" @action="action" />
      </div>
      <div class="mt-8">
        <h2>Mahasiswa</h2>
        <Forms
          :form="forms_mahasiswa"
          :selected="form_mahasiswa"
          :action="'addmahasiswa'"
          @addmahasiswa="addmahasiswa"
        />
        <Tables
          :format="format_mahasiswa"
          :datas="datas_mahasiswa"
          @action="action"
        />
      </div>
    </div>
    <div v-else>
      <Forms
        :form="form_pin"
        :selected="pin"
        :action="'checkpin'"
        @checkpin="checkpin"
      />
    </div>
    <Loading />
  </div>
</template>
<script lang="ts">
import Vue, { defineComponent } from "vue";
import Forms from "@/components/Global/Form.vue";
import Tables from "@/components/Global/Tables.vue";
import Loading from "@/components/Global/Loading.vue";
import { Format } from "~~/model/format";
import Action from "~~/model/action";
//store
import * as store from "@/store/";
//api
import api from "@/api/index";
import mhs from "@/api/mahasiswa";
import tugas from "@/api/tugas";
export default defineComponent({
  name: "",
  setup() {
    const loading = store.useLoading();
    return {
      loading,
    };
  },
  mixins: [api],
  components: { Tables, Forms, Loading },
  props: {},
  methods: {
    action(val: Action) {
      if (val.action == "view") {
        this.goto(val.val1);
      } else if (val.action == "delete") {
        this.delmhs(val.val1);
      } else if (val.action == "close") {
        this.deltugas(val.val1);
      }
    },
    goto(url: string) {
      window.location.href = "/tugas?id=" + url + "&access=4226";
    },
    async addmahasiswa() {
      try {
        this.loading.set();
        await this.sendRequest(mhs.mahasiswacreate(this.form_mahasiswa));
        this.fetchmahasiswa();
      } catch (error) {
        alert(error);
      } finally {
        this.loading.unset();
      }
    },
    async addtugas() {
      try {
        this.loading.set();
        await this.sendRequest(tugas.tugascreate(this.form));
        this.fetchtugas();
      } catch (error) {
        alert(error);
      } finally {
        this.loading.unset();
      }
    },
    async fetchtugas() {
      try {
        this.loading.set();
        const res = await this.sendRequest(tugas.tugasreadall());
        if (!res.status) {
          throw res.message;
        }
        this.datas = res.data.data;
      } catch (error) {
        alert(error);
        this.datas = [];
      } finally {
        this.loading.unset();
      }
    },
    async fetchmahasiswa() {
      try {
        this.loading.set();
        const res = await this.sendRequest(mhs.mahasiswareadall());
        if (!res.status) {
          throw res.message;
        }
        console.log(res.data);
        this.datas_mahasiswa = res.data.data;
      } catch (error) {
        alert(error);
        this.datas_mahasiswa = [];
      } finally {
        this.loading.unset();
      }
    },
    async deltugas(id: string) {
      try {
        this.loading.set();
        await this.sendRequest(tugas.tugasdelete(id));
        this.fetchtugas();
      } catch (error) {
        alert(error);
      } finally {
        this.loading.unset();
      }
    },
    async delmhs(id: string) {
      try {
        this.loading.set();
        await this.sendRequest(mhs.mahasiswadelete(id));
        this.fetchmahasiswa();
      } catch (error) {
        alert(error);
      } finally {
        this.loading.unset();
      }
    },
    async checkpin() {
      if (this.pin.pin == "4226") {
        this.is_admin = true;

        await this.fetchtugas();
        await this.fetchmahasiswa();
      } else {
        alert("Ga usah coba2 masuk ya gembel");
      }
    },
  },
  data() {
    return {
      is_admin: false,
      form: {
        name: "",
        desc: "",
        dateline: "",
      },
      forms: [
        {
          type: "text",
          label: "Name",
          model: "name",
        },
        {
          type: "text",
          label: "Desc",
          model: "desc",
        },
        {
          type: "date",
          label: "Dateline",
          model: "dateline",
        },
      ],
      datas: [
        {
          name: "Contoh",
          desc: "Tugas dikumpulkan terakhir kapan",
          date: "2023-10-01",
        },
      ],
      format: {
        header: ["Nama Tugas", "Dateline", "Action"],
        body: ["name", "dateline"],
        action: [
          {
            action: "view",
            class: "btn-primary",
            model: "id",
            title: "",
            icon: "fas fa-sign-in",
          },
          {
            action: "close",
            class: "btn-danger",
            model: "id",
            title: "",
            icon: "fas fa-trash",
          },
        ],
      } as Format,
      form_mahasiswa: {
        name: "",
      },
      forms_mahasiswa: [
        {
          type: "text",
          model: "name",
          label: "Nama Mahasiswa",
        },
      ],
      form_pin: [
        {
          type: "pass",
          model: "pin",
          label: "Masukkan Pin",
        },
      ],
      pin: {
        pin: "",
      },
      datas_mahasiswa: [],
      format_mahasiswa: {
        header: ["Nama", "Action"],
        body: ["name"],
        action: [
          {
            action: "delete",
            class: "btn-danger",
            model: "id",
            title: "",
            icon: "fas fa-trash",
          },
        ],
      } as Format,
    };
  },
  mounted() {},
  computed: {},
  watch: {},
  async created() {},
});
</script>

<style>
h2 {
  text-align: center;
  font-size: 24px;
  font-weight: 700;
}
</style>
